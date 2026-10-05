import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import AdminPlanes from '../components/admin/AdminPlanes';
import AdminServicios from '../components/admin/AdminServicios';
import Swal from 'sweetalert2';
import '../styles/Admin.css';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('planes');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        toast: true, position: 'top-end', icon: 'success', title: 'Acceso autorizado',
        showConfirmButton: false, timer: 3000, timerProgressBar: true, background: '#0f172a', color: '#fff'
      });
    } catch {
      Swal.fire({
        icon: 'error', title: 'Acceso Denegado', text: 'Credenciales inválidas. Verifica tu correo y contraseña.',
        background: '#0f172a', color: '#fff', confirmButtonColor: '#3b82f6'
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Cerrar sesión?', icon: 'question', showCancelButton: true,
      confirmButtonText: 'Sí, salir', cancelButtonText: 'Cancelar',
      background: '#0f172a', color: '#fff', confirmButtonColor: '#ef4444', cancelButtonColor: '#334155'
    });
    if (result.isConfirmed) {
      await signOut(auth);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm animate-pulse">Cargando Panel...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-decor-1"></div>
        <div className="admin-login-decor-2"></div>

        <div className="admin-login-card glass">
          <div className="admin-login-header">
            <div className="admin-login-icon">
              <img src="/logo-levels.png" alt="Levels Logo" />
            </div>
            <h1 className="admin-login-title">Levels <span className="text-blue-500">Admin</span></h1>
            <p className="admin-login-subtitle">Área restringida. Ingresa tus credenciales.</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-form-group">
              <label><i className="fas fa-envelope text-blue-500 mr-2"></i>Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-form-input"
                placeholder="admin@levels.com"
                required
              />
            </div>
            <div className="admin-form-group">
              <label><i className="fas fa-lock text-blue-500 mr-2"></i>Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-form-input pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="admin-password-toggle"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>
            <button type="submit" disabled={loginLoading} className="admin-submit-btn">
              {loginLoading ? <i className="fas fa-spinner fa-spin"></i> : <><i className="fas fa-sign-in-alt"></i> Ingresar al Panel</>}
            </button>
            <Link to="/" className="admin-back-link">
              <i className="fas fa-arrow-left"></i> Volver a la web pública
            </Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav glass">
        <div className="admin-nav-logo">
          <div className="flex items-center gap-3 border-r border-white/10 pr-6">
            <div className="admin-nav-logo-icon">
              <img src="/logo-levels.png" alt="Levels Logo" />
            </div>
            <div className="admin-nav-logo-text">
              <h1>Levels <span className="text-blue-500">Admin</span></h1>
              <span>Panel de Control</span>
            </div>
          </div>

          <div className="admin-nav-tabs">
            <button
              className={`admin-tab-btn ${activeTab === 'planes' ? 'active' : ''}`}
              onClick={() => setActiveTab('planes')}
            >
              <i className="fas fa-tags mr-2"></i> Planes
            </button>
            <button
              className={`admin-tab-btn ${activeTab === 'servicios' ? 'active' : ''}`}
              onClick={() => setActiveTab('servicios')}
            >
              <i className="fas fa-dumbbell mr-2"></i> Servicios
            </button>
          </div>
        </div>

        <div className="admin-nav-actions">
          <Link to="/" target="_blank" className="admin-view-web-btn">
            <i className="fas fa-external-link-alt"></i> Ver Web Live
          </Link>
          <div className="admin-nav-divider"></div>
          <div className="flex items-center gap-3">
            <div className="admin-user-info">
              <p className="admin-user-email">{user.email}</p>
              <p className="admin-user-role">Administrador</p>
            </div>
            <button onClick={handleLogout} className="admin-logout-btn" title="Cerrar Sesión">
              <i className="fas fa-power-off"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Tabs para Mobile */}
      <div className="admin-mobile-tabs">
        <button className={`admin-mobile-tab-btn ${activeTab === 'planes' ? 'active' : ''}`} onClick={() => setActiveTab('planes')}>
          <i className="fas fa-tags mr-2"></i> Planes
        </button>
        <button className={`admin-mobile-tab-btn ${activeTab === 'servicios' ? 'active' : ''}`} onClick={() => setActiveTab('servicios')}>
          <i className="fas fa-dumbbell mr-2"></i> Servicios
        </button>
      </div>

      <main className="admin-main">
        {activeTab === 'planes' && <AdminPlanes />}
        {activeTab === 'servicios' && <AdminServicios />}
      </main>
    </div>
  );
}

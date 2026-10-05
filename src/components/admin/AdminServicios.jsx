import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import '../../styles/Servicios.css';
import '../../styles/AdminPlanes.css';
import '../../styles/AdminServicios.css';

// Sub-componente Vista Previa
function ServicioPreview({ s }) {
  return (
    <div className="service-card relative mx-auto" style={{ width: '300px', height: '400px', transform: 'scale(0.95)', transformOrigin: 'center center' }}>
      <img src={s.img} className="service-card-img absolute w-full h-full object-cover" alt={s.alt} draggable="false" style={s.objectPosition ? { objectPosition: s.objectPosition } : undefined} />
      <div className="service-card-overlay absolute inset-0" />
      <div className="service-card-hint absolute flex items-center justify-center">
        <i className="fas fa-plus" />
      </div>
      <div className="service-card-content absolute flex flex-col justify-end p-8 inset-0 z-10">
        <div className={`flex items-center justify-center mb-5 service-card-icon ${s.iconoClass || 'bg-1'}`}>
          <i className={`fas ${s.icono || 'fa-star'}`} />
        </div>
        <h4 className="service-card-title mb-0">
          {s.titulo || 'Título del Servicio'}
        </h4>
        <span className="service-card-line block mb-0" />
        {s.profesional && (
          <p className="service-card-profesional mb-2 text-blue-400 font-bold text-xs">
            <i className="fas fa-user-circle"></i> {s.profesional}
          </p>
        )}
        <p className="service-card-desc">
          {s.descripcion || 'Descripción del servicio...'}
        </p>
      </div>
    </div>
  );
}

export default function AdminServicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'servicios'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => a.order - b.order);
      setServicios(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const alertConfig = {
    background: '#0f172a',
    color: '#f1f5f9',
    confirmButtonColor: '#2563eb',
    cancelButtonColor: '#ef4444',
  };

  const handleSave = async () => {
    if (!editing.titulo || !editing.descripcion || !editing.img) {
      return Swal.fire({ ...alertConfig, icon: 'error', title: 'Error', text: 'Título, Descripción e Imagen son obligatorios.' });
    }

    const result = await Swal.fire({ ...alertConfig, title: '¿Guardar cambios?', icon: 'question', showCancelButton: true, confirmButtonText: 'Sí, guardar', cancelButtonText: 'Cancelar' });
    if (result.isConfirmed) {
      await setDoc(doc(db, 'servicios', editing.id), editing);
      setEditing(null);
      Swal.fire({ ...alertConfig, title: 'Guardado', icon: 'success', timer: 1500, showConfirmButton: false });
    }
  };

  const toggleActivo = async (servicio) => {
    const nuevoEstado = servicio.activo === false ? true : false;
    const result = await Swal.fire({ ...alertConfig, title: `¿${nuevoEstado ? 'Activar' : 'Deshabilitar'} este servicio?`, text: nuevoEstado ? 'Será visible en la web pública.' : 'Se ocultará de la web pública.', icon: 'warning', showCancelButton: true, confirmButtonText: `Sí, ${nuevoEstado ? 'Activar' : 'Deshabilitar'}`, cancelButtonText: 'Cancelar' });
    if (result.isConfirmed) {
      await updateDoc(doc(db, 'servicios', servicio.id), { activo: nuevoEstado });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({ ...alertConfig, title: '¿Eliminar Servicio DEFINITIVAMENTE?', text: "Esta acción no se puede deshacer.", icon: 'error', showCancelButton: true, confirmButtonColor: '#ef4444', confirmButtonText: 'Sí, ELIMINAR', cancelButtonText: 'Cancelar' });
    if (result.isConfirmed) {
      await deleteDoc(doc(db, 'servicios', id));
    }
  };

  const handleCreateNew = () => {
    setEditing({
      id: `servicio_${Date.now()}`, titulo: 'Nuevo Servicio', alt: 'Nuevo',
      descripcion: 'Descripción breve', icono: 'fa-star', iconoClass: 'bg-1',
      img: './carrousel/default.png',
      profesional: '', order: servicios.length + 1, activo: false
    });
  };

  const handleChange = (e, field) => setEditing({ ...editing, [field]: e.target.value });

  if (loading) return <div className="text-center p-10 text-slate-400">Cargando servicios...</div>;

  return (
    <div>
      <div className="admin-header-actions">
        {!editing && (
          <button onClick={handleCreateNew} className="admin-btn-primary">
            <i className="fas fa-plus"></i> Crear Nuevo Servicio
          </button>
        )}
      </div>

      <div className="admin-grid">
        {editing && !servicios.find(s => s.id === editing.id) && (
          <div className="admin-card editing">
            <h3 className="admin-editor-title mb-4">Creando Nuevo Servicio</h3>
          </div>
        )}

        {(editing && !servicios.find(s => s.id === editing.id) ? [editing, ...servicios] : servicios).map(servicio => {
          const isEditing = editing && editing.id === servicio.id;
          const current = isEditing ? editing : servicio;
          const isActivo = servicio.activo !== false;

          return (
            <div key={servicio.id} className={`admin-card glass ${!isActivo && !isEditing ? 'disabled' : ''} ${isEditing ? 'editing' : ''}`}>
              {isEditing ? (
                <div className="admin-editor-layout">
                  <div className="admin-editor-panel glass">
                    <div className="admin-editor-header">
                      <h3 className="admin-editor-title">Editando: {current.titulo}</h3>
                      <div className="admin-editor-actions">
                        <button onClick={() => setEditing(null)} className="admin-btn-cancel">Cancelar</button>
                        <button onClick={handleSave} className="admin-btn-save">Guardar Cambios</button>
                      </div>
                    </div>

                    <div className="admin-editor-form">
                      <div className="admin-form-group">
                        <label>Título</label>
                        <input value={current.titulo} onChange={(e) => handleChange(e, 'titulo')} className="admin-form-input" placeholder="Ej: Entrenamiento Adaptativo" />
                      </div>

                      <div className="admin-form-row">
                        <div className="admin-form-group">
                          <label>Ícono (FontAwesome)</label>
                          <input value={current.icono} onChange={(e) => handleChange(e, 'icono')} className="admin-form-input" placeholder="Ej: fa-dumbbell" />
                        </div>
                        <div className="admin-form-group">
                          <label>Profesional (Opcional)</label>
                          <input value={current.profesional || ''} onChange={(e) => handleChange(e, 'profesional')} className="admin-form-input" placeholder="Ej: Julian Amduni" />
                        </div>
                      </div>

                      <div className="admin-form-group">
                        <label>Descripción</label>
                        <textarea
                          value={current.descripcion}
                          onChange={(e) => handleChange(e, 'descripcion')}
                          rows="3"
                          className="admin-form-input"
                        />
                      </div>

                      <div className="admin-editor-section">
                        <label className="block text-sm font-bold text-slate-300 uppercase mb-3">Fondo / Imagen</label>
                        <div className="admin-form-row">
                          <div className="admin-form-group">
                            <label>Ruta de Imagen</label>
                            <input value={current.img} onChange={(e) => handleChange(e, 'img')} className="admin-form-input" placeholder="./carrousel/foto.png" />
                          </div>
                          <div className="admin-form-group">
                            <label>Alineación (object-position)</label>
                            <input value={current.objectPosition || ''} onChange={(e) => handleChange(e, 'objectPosition')} className="admin-form-input" placeholder="center 20%" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="admin-preview-container">
                    <h3 className="admin-preview-title"><i className="fas fa-eye text-blue-500 mr-2"></i>Vista Previa en Vivo</h3>
                    <div className="bg-transparent p-0 m-0">
                      <ServicioPreview s={editing} />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="admin-card-actions">
                    <button
                      onClick={() => toggleActivo(servicio)}
                      title={isActivo ? "Deshabilitar" : "Activar"}
                      className={`admin-action-btn toggle ${isActivo ? 'off' : ''}`}
                    >
                      <i className={`fas ${isActivo ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                    <button
                      onClick={() => setEditing(servicio)}
                      className="admin-action-btn edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(servicio.id)}
                      className="admin-action-btn delete"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>

                  {!isActivo && (
                    <span className="admin-badge-disabled">
                      Deshabilitado
                    </span>
                  )}

                  <div className="admin-service-list-item">
                    <div className="admin-service-icon-box">
                      <i className={`fas ${servicio.icono}`}></i>
                    </div>
                    <div>
                      <h3 className="admin-service-title">{servicio.titulo}</h3>
                      {servicio.profesional && <span className="admin-service-profesional">{servicio.profesional}</span>}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

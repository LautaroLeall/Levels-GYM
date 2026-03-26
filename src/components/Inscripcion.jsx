import { useState, useEffect } from 'react';
import '../styles/Inscripcion.css';

const beneficios = [
  'Evaluación Biomecánica Inicial',
  'Acceso a Zona de Recovery VIP',
  'Planes 100% Personalizados',
];

export default function Inscripcion() {
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    membresia: 'Plan Mensual',
    metodoPago: 'Efectivo',
    objetivo: '',
  });

  useEffect(() => {
    const stored = sessionStorage.getItem('planSeleccionado');
    if (stored) {
      try {
        const { plan, metodo, precio } = JSON.parse(stored);
        setFormData(prev => ({
          ...prev,
          membresia: `Plan ${plan} (${precio})`,
          metodoPago: metodo,
        }));
        sessionStorage.removeItem('planSeleccionado');
      } catch (_) { /* ignorar */ }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mensaje = `¡Hola! Quiero inscribirme en Levels.%0A%0A*Nombre:* ${formData.nombre}%0A*WhatsApp:* ${formData.whatsapp}%0A*Membresía:* ${formData.membresia}%0A*Método de pago:* ${formData.metodoPago}%0A*Objetivo:* ${formData.objetivo || 'No especificado'}`;
    window.open(`https://wa.me/5493815191501?text=${mensaje}`, '_blank');
  };

  return (
    <section id="inscripcion" className="inscripcion">
      <div className="inscripcion-container">
        {/* Beneficios */}
        <div data-aos="fade-right">
          <h2 className="inscripcion-title">
            ¿LISTO PARA <span className="blue-gradient-text">ELEVAR</span> TU NIVEL?
          </h2>
          <p className="inscripcion-desc">
            Completá el formulario y uno de nuestros coaches se pondrá en contacto para tu evaluación inicial.
          </p>

          <div className="inscripcion-benefits">
            {beneficios.map((b) => (
              <div key={b} className="inscripcion-benefit">
                <div className="inscripcion-benefit-icon">
                  <i className="fas fa-check"></i>
                </div>
                <span className="inscripcion-benefit-text">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario */}
        <div className="inscripcion-form-box glass" data-aos="fade-left">
          <form className="inscripcion-form" onSubmit={handleSubmit}>
            <div className="inscripcion-form-row">
              <div className="inscripcion-field">
                <label>Nombre Completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Juan Pérez"
                  required
                />
              </div>
              <div className="inscripcion-field">
                <label>WhatsApp</label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="+54 381..."
                  required
                />
              </div>
            </div>

            <div className="inscripcion-field">
              <label>Membresía Elegida</label>
              <select
                name="membresia"
                value={formData.membresia}
                onChange={handleChange}
                required
              >
                <option>Plan Mensual ($44.000 efectivo / $46.000 transferencia)</option>
                <option>Plan Trimestral ($119.000 efectivo / $124.000 transferencia)</option>
                <option>Plan 6 Meses ($229.000 efectivo / $240.000 transferencia)</option>
              </select>
            </div>

            <div className="inscripcion-field">
              <label>Método de Pago</label>
              <div className="inscripcion-metodo-toggle">
                <button
                  type="button"
                  className={`inscripcion-metodo-btn${formData.metodoPago === 'Efectivo' ? ' active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, metodoPago: 'Efectivo' }))}
                >
                  <i className="fas fa-money-bill-wave"></i>
                  Efectivo
                </button>
                <button
                  type="button"
                  className={`inscripcion-metodo-btn${formData.metodoPago === 'Transferencia' ? ' active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, metodoPago: 'Transferencia' }))}
                >
                  <i className="fas fa-mobile-alt"></i>
                  Transferencia
                </button>
              </div>
            </div>

            <div className="inscripcion-field">
              <label>Mensaje Adicional (opcional)</label>
              <textarea
                name="objetivo"
                value={formData.objetivo}
                onChange={handleChange}
                rows="3"
                placeholder="Contanos qué querés lograr..."
              ></textarea>
            </div>

            <button type="submit" className="inscripcion-submit">
              Enviar Solicitud
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

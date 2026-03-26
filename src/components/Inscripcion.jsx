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
    <section id="inscripcion" className="inscripcion relative">
      <div className="inscripcion-container grid gap-10 items-center">
        {/* Beneficios */}
        <div data-aos="fade-right">
          <h2 className="inscripcion-title mb-5">
            ¿LISTO PARA <span className="blue-gradient-text">ELEVAR</span> TU NIVEL?
          </h2>
          <p className="inscripcion-desc mb-8">
            Completá el formulario y uno de nuestros coaches se pondrá en contacto para tu evaluación inicial.
          </p>

          <div className="inscripcion-benefits flex flex-col gap-5">
            {beneficios.map((b) => (
              <div key={b} className="inscripcion-benefit flex items-center gap-3">
                <div className="inscripcion-benefit-icon flex items-center justify-center">
                  <i className="fas fa-check"></i>
                </div>
                <span className="inscripcion-benefit-text">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario */}
        <div className="inscripcion-form-box glass p-10" data-aos="fade-left">
          <form className="inscripcion-form flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="inscripcion-form-row grid gap-5">
              <div className="inscripcion-field">
                <label className="mb-3 block">Nombre Completo</label>
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
                <label className="mb-3 block">WhatsApp</label>
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
              <label className="mb-3 block">Membresía Elegida</label>
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
<<<<<<< HEAD
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
=======
              <label className="mb-3 block">Mensaje Adicional (opcional)</label>
>>>>>>> c9adf7a161baf62c42fd1032b5f30f05aa314dac
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

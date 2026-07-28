import { useState, useEffect } from 'react';
import '../styles/Inscripcion.css';

const beneficios = [
  'Acceso a ambas sedes',
  'Planes 100% Personalizados',
];

export default function Inscripcion() {
  const [formData, setFormData] = useState(() => {
    const stored = sessionStorage.getItem('planSeleccionado');
    if (stored) {
      try {
        const { plan, metodo } = JSON.parse(stored);
        sessionStorage.removeItem('planSeleccionado');
        return { nombre: '', whatsapp: '', membresia: `Plan ${plan}`, metodoPago: metodo, objetivo: '' };
      } catch { /* ignorar */ }
    }
    return { nombre: '', whatsapp: '', membresia: 'Plan Mensual', metodoPago: 'Efectivo', objetivo: '' };
  });

  useEffect(() => {
    const onPlan = (e) => {
      const { plan, metodo } = e.detail;
      setFormData(prev => ({ ...prev, membresia: `Plan ${plan}`, metodoPago: metodo }));
    };
    window.addEventListener('planSeleccionado', onPlan);
    return () => window.removeEventListener('planSeleccionado', onPlan);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'membresia') {
      const soloEfectivo = value === 'Plan Trimestral' || value === 'Plan 6 Meses';
      setFormData(prev => ({
        ...prev,
        [name]: value,
        metodoPago: soloEfectivo ? 'Efectivo' : prev.metodoPago
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const esTransferencia = formData.metodoPago === 'Transferencia';
    const base = `¡Hola! Quiero inscribirme en Levels.%0A%0A*Nombre:* ${formData.nombre}%0A*WhatsApp:* ${formData.whatsapp}%0A*Membresía:* ${formData.membresia}%0A*Método de pago:* ${formData.metodoPago}%0A*Objetivo:* ${formData.objetivo || 'No especificado'}`;
    const extra = esTransferencia ? `%0A%0AAdjunto comprobante de transferencia ⬆️` : '';
    window.open(`https://wa.me/5493815191501?text=${base}${extra}`, '_blank');
  };

  const esSoloEfectivo = formData.membresia === 'Plan Trimestral' || formData.membresia === 'Plan 6 Meses';

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
        <div className="inscripcion-form-box glass p-8" data-aos="fade-left">
          <form className="inscripcion-form flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="inscripcion-form-row grid gap-4">
              <div className="inscripcion-field">
                <label htmlFor="form-nombre" className="mb-2 block">Nombre Completo</label>
                <input
                  id="form-nombre"
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Juan Pérez"
                  required
                />
              </div>
              <div className="inscripcion-field">
                <label htmlFor="form-whatsapp" className="mb-2 block">WhatsApp</label>
                <input
                  id="form-whatsapp"
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
              <label htmlFor="form-membresia" className="mb-2 block">Membresía Elegida</label>
              <select
                id="form-membresia"
                name="membresia"
                value={formData.membresia}
                onChange={handleChange}
                required
              >
                <option value="Plan Mensual">
                  Plan Mensual ($52.000 efectivo / $54.000 transferencia)
                </option>
                <option value="Plan Trimestral">
                  Plan Trimestral ($142.000 efectivo)
                </option>
                <option value="Plan 6 Meses">
                  Plan 6 Meses ($276.000 efectivo - 3 cuotas de $92.000)
                </option>
                <option value="Plan Anual">
                  Plan Anual ($480.000 efectivo / $510.000 transferencia)
                </option>
              </select>
            </div>

            <div className="inscripcion-field">
              <label className="mb-2 block">Método de Pago</label>

              {esSoloEfectivo ? (

                <div className="inscripcion-metodo-toggle" style={{ opacity: 0.9, pointerEvents: 'none' }}>
                  <button type="button" className="inscripcion-metodo-btn active w-full" style={{ flex: 1 }}>
                    <i className="fas fa-money-bill-wave"></i> Efectivo
                  </button>
                </div>

              ) : (

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
              )}

              {formData.metodoPago === 'Transferencia' && !esSoloEfectivo && (
                <div className="insc-alias-box">
                  <p className="insc-alias-title">
                    <i className="fas fa-university"></i> Alias para transferir
                  </p>
                  <div className="insc-alias-list">
                    <div className="insc-alias-row">
                      <span className="insc-alias-sede">Sede Yerba Buena</span>
                      <span className="insc-alias-value">Levels.ar</span>
                    </div>
                    <div className="insc-alias-row">
                      <span className="insc-alias-sede">Sede Centro</span>
                      <span className="insc-alias-value">Levelscentro</span>
                    </div>
                  </div>
                  <p className="insc-alias-nota">Al enviar, te abrimos WhatsApp para adjuntar el comprobante.</p>
                </div>
              )}
            </div>

            <div className="inscripcion-field">
              <label htmlFor="form-objetivo" className="mb-2 block">Mensaje Adicional (opcional)</label>
              <textarea
                id="form-objetivo"
                name="objetivo"
                value={formData.objetivo}
                onChange={handleChange}
                rows="2"
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

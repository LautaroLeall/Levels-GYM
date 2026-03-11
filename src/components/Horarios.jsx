import '../styles/Horarios.css';

export default function Horarios() {
  return (
    <section className="horarios">
      <div className="horarios-container">
        {/* Columna izquierda */}
        <div data-aos="fade-right">
          <h3 className="horarios-title">Nuestros Horarios Generales</h3>
          <p className="horarios-desc">
            Disponibilidad amplia para que el tiempo no sea una excusa.
          </p>
          <div>
            <p className="horarios-label">Lunes a Viernes</p>
            <p className="horarios-time">06:30 — 22:00</p>
          </div>
        </div>

        {/* Sábados */}
        <div className="horarios-sabados" data-aos="fade-left">
          <div className="horarios-sabado-card">
            <p className="horarios-sabado-label">Sábados YB</p>
            <p className="horarios-sabado-time">10:00 — 14:00</p>
          </div>
          <div className="horarios-sabado-card">
            <p className="horarios-sabado-label">Sábados Centro</p>
            <p className="horarios-sabado-time">14:00 — 18:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}

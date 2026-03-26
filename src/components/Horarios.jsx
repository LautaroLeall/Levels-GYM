import '../styles/Horarios.css';

export default function Horarios() {
  return (
    <section className="horarios">
      <div className="horarios-container grid items-center gap-5">
        {/* Columna izquierda */}
        <div data-aos="fade-right">
          <h3 className="horarios-title mb-3">Nuestros Horarios Generales</h3>
          <p className="horarios-desc mb-5">
            Disponibilidad amplia para que el tiempo no sea una excusa.
          </p>
          <div>
            <p className="horarios-label mb-1">Lunes a Viernes</p>
            <p className="horarios-time">06:30 — 22:00</p>
          </div>
        </div>

        {/* Sábados */}
        <div className="horarios-sabados grid gap-5" data-aos="fade-left">
          <div className="horarios-sabado-card p-6">
            <p className="horarios-sabado-label mb-4">Sábados Yerba Buena</p>
            <p className="horarios-sabado-time">10:00 — 14:00</p>
          </div>
          <div className="horarios-sabado-card p-6">
            <p className="horarios-sabado-label mb-4">Sábados Centro</p>
            <p className="horarios-sabado-time">14:00 — 18:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}

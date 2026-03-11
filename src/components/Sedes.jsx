import '../styles/Sedes.css';

/**
 * Sedes — Tarjetas de las 2 sedes con horarios específicos.
 */

const sedes = [
  {
    nombre: 'Sede YB',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    alt: 'Yerba Buena',
    direccion: 'Av. Aconquija 225 — Yerba Buena',
    sabados: '10:00 — 14:00',
    mapsUrl: 'https://maps.google.com/?q=Aconquija+225+Yerba+Buena',
    overlayClass: 'yb',
    aosDirection: 'fade-right',
  },
  {
    nombre: 'Sede Centro',
    img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800',
    alt: 'SMT',
    direccion: 'Jujuy 254 — San Miguel de Tucumán',
    sabados: '14:00 — 18:00',
    mapsUrl: 'https://maps.google.com/?q=Jujuy+254+San+Miguel+de+Tucuman',
    overlayClass: 'centro',
    aosDirection: 'fade-left',
  },
];

export default function Sedes() {
  return (
    <section id="sedes" className="sedes">
      <div className="sedes-container">
        <h2 className="sedes-title" data-aos="fade-up">
          Sedes &amp; <span className="blue-gradient-text">Horarios</span>
        </h2>

        <div className="sedes-grid">
          {sedes.map((sede) => (
            <div
              key={sede.nombre}
              className="sede-card glass"
              data-aos={sede.aosDirection}
            >
              <div className="sede-img-wrapper">
                <img src={sede.img} alt={sede.alt} />
                <div className={`sede-img-overlay ${sede.overlayClass}`}></div>
                <div className="sede-img-name">{sede.nombre}</div>
              </div>

              <div className="sede-info">
                <p className="sede-address">
                  <i className="fas fa-map-marker-alt"></i>
                  {sede.direccion}
                </p>

                <div className="sede-horarios">
                  <p className="sede-horarios-label">Horarios Específicos</p>
                  <div className="sede-horario-row normal">
                    <span>Lun a Vie:</span>
                    <span>06:30 — 22:00</span>
                  </div>
                  <div className="sede-horario-row sabado">
                    <span>Sábados:</span>
                    <span>{sede.sabados}</span>
                  </div>
                </div>

                <a
                  href={sede.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sede-gps-btn"
                >
                  Ubicación GPS
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

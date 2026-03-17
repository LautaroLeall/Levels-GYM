import '../styles/Sedes.css';

const sedes = [
  {
    nombre: 'Sede YB',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    alt: 'Yerba Buena',
    direccion: 'Av. Aconquija 225 — YB',
    sabados: '10:00 — 14:00',
    mapsUrl: 'https://maps.google.com/?q=Aconquija+225+Yerba+Buena',
    overlayClass: 'yb',
    aosDirection: 'fade-right',
  },
  {
    nombre: 'Sede Centro',
    img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800',
    alt: 'SMT',
    direccion: 'Jujuy 254 — SMT',
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
        <h2 className="sedes-title text-center mb-10" data-aos="fade-up">
          Sedes &amp; <span className="blue-gradient-text">Horarios</span>
        </h2>

        <div className="sedes-grid grid gap-10">
          {sedes.map((sede) => (
            <div
              key={sede.nombre}
              className="sede-card glass"
              data-aos={sede.aosDirection}
            >
              <div className="sede-img-wrapper relative">
                <img src={sede.img} alt={sede.alt} />
                <div className={`sede-img-overlay absolute ${sede.overlayClass}`}></div>
                <div className="sede-img-name absolute">{sede.nombre}</div>
              </div>

              <div className="sede-info p-9">
                <p className="sede-address flex items-start mb-5">
                  <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                  {sede.direccion}
                </p>

                <div className="sede-horarios mb-7 p-6">
                  <p className="sede-horarios-label mb-3">Horarios Específicos</p>
                  <div className="sede-horario-row flex justify-between mb-2 normal">
                    <span>Lun a Vie:</span>
                    <span>06:30 — 22:00</span>
                  </div>
                  <div className="sede-horario-row flex justify-between sabado">
                    <span>Sábados:</span>
                    <span>{sede.sabados}</span>
                  </div>
                </div>

                <a
                  href={sede.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sede-gps-btn block text-center p-4"
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

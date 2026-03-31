import { useRef, useState } from 'react';
import '../styles/Servicios.css';

const serviciosBase = [
  {
    img: './carrousel/entrenamiento-adaptivo.png',
    alt: 'Entrenamiento',
    icono: 'fa-dumbbell',
    iconoClass: 'bg-1',
    titulo: 'Entrenamiento Adaptativo',
    descripcion: 'No creemos en rutinas genéricas. Ajustamos cada sesión según tu fatiga y progreso real medido por tecnología.',
  },
  {
    img: './carrousel/julian-nutricion.png',
    alt: 'Nutrición',
    icono: 'fa-utensils',
    iconoClass: 'bg-1',
    titulo: 'Nutrición Evolutiva',
    descripcion: 'Planificación enfocada en el rendimiento y la composición corporal sostenible. Hábitos, no dietas.',
    profesional: 'Julian Amduni',
  },
  {
    img: './carrousel/recovery-rehabilitacion.png',
    alt: 'Kinesiología',
    icono: 'fa-user-md',
    iconoClass: 'bg-1',
    titulo: 'Rehabilitación',
    descripcion: 'Kinesiología aplicada al deporte. Reeducamos el movimiento para evitar lesiones y mejorar tu técnica.',
  },
  {
    img: './carrousel/personalizado-50.png',
    alt: 'Adulto Mayor',
    objectPosition: 'center 20%',
    icono: 'fa-heartbeat',
    iconoClass: 'bg-1',
    titulo: 'Personalizado +50',
    descripcion: 'Un profesional 100% dedicado a acompañarte, cuidarte y motivarte. Entrenamiento adaptado para mejorar tu calidad de vida, movilidad y longevidad.',
  },
  {
    img: './carrousel/preparacion-futbol.png',
    alt: 'Fútbol',
    icono: 'fa-futbol',
    iconoClass: 'bg-1',
    titulo: 'Preparación Futbolística',
    descripcion: 'Clases personalizadas exclusivas para jugadores de fútbol. Optimizamos tu fuerza, agilidad, velocidad y resistencia para rendir al máximo en la cancha.',
    profesional: 'Raul Veron',
  },
  {
    img: '/carrousel/influencia-deportiva.png',
    alt: 'Sponsoreos',
    icono: 'fa-handshake',
    iconoClass: 'bg-1',
    titulo: 'Sponsoreos y Clubes',
    descripcion: 'Acompañamos a los mejores atletas, academias e instituciones deportivas hacia su máximo potencial físico y competitivo.',
  },
];

const servicios = [...serviciosBase, ...serviciosBase, ...serviciosBase, ...serviciosBase, ...serviciosBase];

export default function Servicios() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollNext = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <section id="servicios" className="servicios-section relative">
      <div className="servicios-header">
        <div data-aos="fade-right" className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="servicios-title mb-2">
              Nuestros <span className="blue-gradient-text">Ejes</span>
            </h2>
            <p className="servicios-subtitle">
              Desplazamiento automático para explorar nuestra excelencia.
            </p>
          </div>

          <div>
            <button onClick={scrollNext} className="servicios-arrow flex items-center justify-center" aria-label="Ver siguiente">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      <div
        className="carousel-container relative mt-8"
        ref={wrapperRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`flex carousel-track${isPaused ? ' paused' : ''}`} ref={trackRef}>
          {servicios.map((s, idx) => (
            <div key={`${s.titulo}-${idx}`} className="service-card relative">
              <img src={s.img} className="service-card-img absolute" alt={s.alt} draggable="false" style={s.objectPosition ? { objectPosition: s.objectPosition } : undefined} />
              <div className="service-card-overlay absolute" />
              <div className="service-card-hint absolute flex items-center justify-center">
                <i className="fas fa-plus" />
              </div>
              <div className="service-card-content absolute flex flex-col justify-end p-8">
                <div className={`flex items-center justify-center mb-5 service-card-icon ${s.iconoClass}`}>
                  <i className={`fas ${s.icono}`} />
                </div>
                <h4 className="service-card-title mb-0">{s.titulo}</h4>
                <span className="service-card-line block mb-0" />
                {s.profesional && (
                  <p className="service-card-profesional"><i className="fas fa-user-circle"></i> {s.profesional}</p>
                )}
                <p className="service-card-desc">{s.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useRef, useState, useEffect } from 'react';
import '../styles/Servicios.css';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Servicios() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [serviciosBase, setServiciosBase] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'servicios'));
        let data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        data = data.filter(s => s.activo !== false);
        data.sort((a, b) => a.order - b.order);
        setServiciosBase(data);
      } catch (error) {
        console.error("Error al obtener servicios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServicios();
  }, []);

  const scrollNext = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <section id="servicios" className="servicios-section relative min-h-[400px] flex items-center justify-center"><div className="text-white">Cargando servicios...</div></section>;
  }

  if (serviciosBase.length === 0) {
    return <section id="servicios" className="servicios-section relative min-h-[400px] flex items-center justify-center"><div className="text-white">No hay servicios disponibles.</div></section>;
  }

  // Duplicate for infinite carousel effect
  const servicios = [...serviciosBase, ...serviciosBase, ...serviciosBase, ...serviciosBase, ...serviciosBase];

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
            <div key={`${s.id}-${idx}`} className="service-card relative">
              <img src={s.img} className="service-card-img absolute" alt={s.alt} draggable="false" style={s.objectPosition ? { objectPosition: s.objectPosition } : undefined} />
              <div className="service-card-overlay absolute" />
              <div className="service-card-hint absolute flex items-center justify-center">
                <i className="fas fa-plus" />
              </div>
              <div className="service-card-content absolute flex flex-col justify-end p-8">
                <div className={`flex items-center justify-center mb-5 service-card-icon ${s.iconoClass || 'bg-1'}`}>
                  <i className={`fas ${s.icono || 'fa-star'}`} />
                </div>
                <h4 className="service-card-title mb-0">
                  {s.titulo}
                </h4>
                <span className="service-card-line block mb-0" />
                {s.profesional && (
                  <p className="service-card-profesional mb-2">
                    <i className="fas fa-user-circle"></i> {s.profesional}
                  </p>
                )}
                <p className="service-card-desc">
                  {s.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
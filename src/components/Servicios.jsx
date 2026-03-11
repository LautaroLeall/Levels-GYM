import { useEffect, useRef } from 'react';
import '../styles/Servicios.css';

const servicios = [
  {
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    alt: 'Entrenamiento',
    icono: 'fa-dumbbell',
    iconoClass: 'bg-1',
    titulo: 'Entrenamiento Adaptativo',
    descripcion:
      'No creemos en rutinas genéricas. Ajustamos cada sesión según tu fatiga y progreso real medido por tecnología.',
  },
  {
    img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800',
    alt: 'Recovery',
    icono: 'fa-spa',
    iconoClass: 'bg-2',
    titulo: 'Recovery Deportiva',
    descripcion:
      'Saunas, tinas de hielo y aparatología de última generación para volver a la acción en tiempo récord.',
  },
  {
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
    alt: 'Nutrición',
    icono: 'fa-utensils',
    iconoClass: 'bg-3',
    titulo: 'Nutrición Evolutiva',
    descripcion:
      'Planificación enfocada en el rendimiento y la composición corporal sostenible. Hábitos, no dietas.',
  },
  {
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    alt: 'Kinesiología',
    icono: 'fa-user-md',
    iconoClass: 'bg-4',
    titulo: 'Rehabilitación',
    descripcion:
      'Kinesiología aplicada al deporte. Reeducamos el movimiento para evitar lesiones y mejorar tu técnica.',
  },
];

export default function Servicios() {
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);

  // Duplicar tarjetas para scroll infinito fluido
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children);
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });
  }, []);

  // Drag-to-scroll
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const onMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
      track.style.animationPlayState = 'paused';
    };
    const onMouseLeave = () => { isDown = false; track.style.animationPlayState = 'running'; };
    const onMouseUp = () => { isDown = false; track.style.animationPlayState = 'running'; };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      wrapper.scrollLeft = scrollLeft - (x - startX) * 2;
    };

    wrapper.addEventListener('mousedown', onMouseDown);
    wrapper.addEventListener('mouseleave', onMouseLeave);
    wrapper.addEventListener('mouseup', onMouseUp);
    wrapper.addEventListener('mousemove', onMouseMove);

    return () => {
      wrapper.removeEventListener('mousedown', onMouseDown);
      wrapper.removeEventListener('mouseleave', onMouseLeave);
      wrapper.removeEventListener('mouseup', onMouseUp);
      wrapper.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section id="servicios" className="servicios">
      <div className="servicios-header">
        <div data-aos="fade-right">
          <h2 className="servicios-title">
            Nuestros <span className="blue-gradient-text">Ejes</span>
          </h2>
          <p className="servicios-subtitle">
            Desplazamiento automático para explorar nuestra excelencia.
          </p>
        </div>
      </div>

      <div className="carousel-container" ref={wrapperRef}>
        <div className="carousel-track" ref={trackRef}>
          {servicios.map((s) => (
            <div key={s.titulo} className="service-card service-card-inner glass">
              <img src={s.img} className="service-card-img" alt={s.alt} />
              <div className="service-card-content">
                <div className={`service-card-icon ${s.iconoClass}`}>
                  <i className={`fas ${s.icono}`}></i>
                </div>
                <h4 className="service-card-title">{s.titulo}</h4>
                <p className="service-card-desc">{s.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

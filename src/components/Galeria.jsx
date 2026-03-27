import { useEffect, useRef } from 'react';
import '../styles/Galeria.css';

const imagenes = [
  {
    src: '/galeria/galery-1.png',
    alt: 'Gimnasio',
  },
  {
    src: '/galeria/galery-2.png',
    alt: 'Equipamiento',
  },
  {
    src: '/galeria/galery-3.png',
    alt: 'Pesas',
  },
  {
    src: '/galeria/galery-4.png',
    alt: 'Entrenamiento funcional',
  },
];

export default function Galeria() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('galeria-animado');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="galeria" className="galeria" ref={sectionRef}>
      <div className="galeria-container">
        <div className="galeria-header mb-5">
          <h2 className="galeria-header-title">
            Nuestras <span className="blue-gradient-text">Instalaciones</span>
          </h2>
          <p className="galeria-header-desc">
            Equipamiento profesional de vanguardia.</p>
        </div>

        <div className="galeria-grid">
          {imagenes.map((img, i) => (
            <div
              key={img.alt}
              className={`galeria-item galeria-item-${i + 1}`}
            >
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

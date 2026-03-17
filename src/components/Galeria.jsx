import { useEffect, useRef } from 'react';
import '../styles/Galeria.css';

const imagenes = [
  {
    src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800',
    alt: 'Gimnasio',
    sizeClass: 'large',
    delay: '0',
  },
  {
    src: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=600',
    alt: 'Equipamiento',
    sizeClass: 'small',
    delay: '100',
  },
  {
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
    alt: 'Pesas',
    sizeClass: 'small',
    delay: '200',
  },
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
    alt: 'Entrenamiento funcional',
    sizeClass: 'wide',
    delay: '300',
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
        <div className="galeria-header mb-15">
          <h2 className="galeria-header-title">
            Nuestras <span className="blue-gradient-text">Instalaciones</span>
          </h2>
          <p className="galeria-header-desc mt-2">Equipamiento profesional de vanguardia.</p>
        </div>

        <div className="galeria-grid grid gap-8">
          {imagenes.map((img, i) => (
            <div
              key={img.alt}
              className={`galeria-item ${img.sizeClass} galeria-item-${i + 1}`}
            >
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import '../styles/Metodo.css';

/**
 * Metodo — "El Método Levels": 3 tarjetas glass.
 */

const pasos = [
  {
    numero: '01',
    titulo: 'Evaluación',
    descripcion:
      'Analizamos tu biomecánica, objetivos y metabolismo antes de que toques la primera pesa. La ciencia guía tu entrenamiento.',
    borderClass: 'border-blue-600',
    delay: '100',
  },
  {
    numero: '02',
    titulo: 'Ejecución',
    descripcion:
      'Sesiones personalizadas con equipamiento de élite y supervisión constante para asegurar que cada repetición cuente.',
    borderClass: 'border-blue-500',
    delay: '200',
  },
  {
    numero: '03',
    titulo: 'Recuperación',
    descripcion:
      'Aquí es donde creces. Nuestra zona de recovery (Saunas, Frío, Kinesio) optimiza tu descanso para volver más fuerte.',
    borderClass: 'border-blue-400',
    delay: '300',
  },
];

export default function Metodo() {
  return (
    <section id="metodo" className="metodo">
      <div className="metodo-container">
        <div className="metodo-header" data-aos="fade-up">
          <h2 className="metodo-title">
            El Método <span className="blue-gradient-text">Levels</span>
          </h2>
          <p className="metodo-description">
            Un enfoque 360° diseñado para atletas profesionales y personas que buscan su mejor versión.
          </p>
        </div>

        <div className="metodo-grid">
          {pasos.map((paso) => (
            <div
              key={paso.numero}
              className={`metodo-card glass ${paso.borderClass}`}
              data-aos="fade-up"
              data-aos-delay={paso.delay}
            >
              <span className="metodo-number">{paso.numero}</span>
              <h3 className="metodo-card-title">{paso.titulo}</h3>
              <p className="metodo-card-text">{paso.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

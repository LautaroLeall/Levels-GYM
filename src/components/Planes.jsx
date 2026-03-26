import { useState } from 'react';
import '../styles/Planes.css';

const planes = [
  {
    nombre: 'Mensual',
    subtitulo: 'Ideal para empezar tu camino.',
    precios: {
      efectivo: '$44.000',
      transferencia: '$46.000',
    },
    notaExtra: null,
    cuotas: null,
    beneficios: [
      'Acceso libre sedes YB y Centro',
      'Evaluación inicial básica',
      'Zona de musculación y funcional',
    ],
    ctaClass: 'outline',
    popular: false,
    benefitClass: 'muted',
    delay: '0',
  },
  {
    nombre: 'Trimestral',
    subtitulo: 'Compromiso real con tus resultados.',
    precios: {
      efectivo: '$119.000',
      transferencia: '$124.000',
    },
    notaExtra: 'Ahorrá entrenando 3 meses',
    cuotas: null,
    beneficios: [
      'Prioridad en evaluaciones',
      'Seguimiento de progreso mensual',
      'Invitaciones a eventos exclusivos',
      'Acceso a zona Recovery',
    ],
    ctaClass: 'filled',
    popular: true,
    benefitClass: 'light',
    delay: '100',
  },
  {
    nombre: '6 Meses',
    subtitulo: 'Transformación total garantizada.',
    precios: {
      efectivo: '$229.000',
      transferencia: '$240.000',
    },
    notaExtra: null,
    cuotas: '3 Cuotas de $80.000',
    beneficios: [
      'Congelamiento de precio x 6 meses',
      'Plan nutricional premium incluido',
      'Remera oficial Levels de regalo',
      'Acceso ilimitado a Recovery',
    ],
    ctaClass: 'outline',
    popular: false,
    benefitClass: 'muted',
    delay: '200',
  },
];

function PlanCard({ plan }) {
  const [metodo, setMetodo] = useState('efectivo');

  const handleContratar = () => {
    sessionStorage.setItem('planSeleccionado', JSON.stringify({
      plan: plan.nombre,
      metodo: metodo === 'efectivo' ? 'Efectivo' : 'Transferencia',
      precio: plan.precios[metodo],
    }));
    document.getElementById('inscripcion').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`plan-card glass ${plan.popular ? 'popular' : 'normal'}`}
      data-aos="fade-up"
      data-aos-delay={plan.delay}
    >
      {plan.popular && <div className="plan-badge">Más Popular</div>}

      <h4 className="plan-name">{plan.nombre}</h4>
      <p className="plan-desc">{plan.subtitulo}</p>

      {/* Toggle método de pago */}
      <div className="plan-metodo-toggle">
        <button
          className={`metodo-btn${metodo === 'efectivo' ? ' active' : ''}`}
          onClick={() => setMetodo('efectivo')}
          type="button"
        >
          <i className="fas fa-money-bill-wave"></i>
          Efectivo
        </button>
        <button
          className={`metodo-btn${metodo === 'transferencia' ? ' active' : ''}`}
          onClick={() => setMetodo('transferencia')}
          type="button"
        >
          <i className="fas fa-mobile-alt"></i>
          Transferencia
        </button>
      </div>

      {/* Precio */}
      <div className="plan-precio-wrapper">
        <div className="plan-precio-row">
          <span className="plan-price-big size-2xl">{plan.precios[metodo]}</span>
          <span className="plan-price-label">/ mes</span>
        </div>
        {plan.notaExtra && <p className="plan-note">{plan.notaExtra}</p>}
        {plan.cuotas && metodo === 'transferencia' && (
          <div className="plan-cuota-badge">{plan.cuotas}</div>
        )}
      </div>

      <ul className={`plan-benefits ${plan.benefitClass}`}>
        {plan.beneficios.map((b, i) => (
          <li key={i}>
            <i className="fas fa-check"></i>
            {b}
          </li>
        ))}
      </ul>

      <button
        onClick={handleContratar}
        className={`plan-cta ${plan.ctaClass}`}
      >
        Contratar — {metodo === 'efectivo' ? 'Efectivo' : 'Transferencia'}
      </button>
    </div>
  );
}

export default function Planes() {
  return (
    <section id="planes" className="planes">
      <div className="planes-bg-blur"></div>

      <div className="planes-container">
        <div className="planes-header" data-aos="fade-up">
          <h2 className="planes-title">
            Nuestros <span className="blue-gradient-text">Planes</span>
          </h2>
          <p className="planes-subtitle">
            Elegí el plan que mejor se adapte a tu ritmo y objetivos.
          </p>
        </div>

        <div className="planes-grid">
          {planes.map((plan) => (
            <PlanCard key={plan.nombre} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

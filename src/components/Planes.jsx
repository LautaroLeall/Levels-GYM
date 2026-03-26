import { useState } from 'react';
import '../styles/Planes.css';

const planes = [
  {
    nombre: 'Mensual',
    subtitulo: 'Ideal para empezar tu camino.',
    precios: [
      { monto: '$44.000', metodo: 'Efectivo', sizeClass: 'size-2xl' },
      { monto: '$46.000', metodo: 'Transferencia', small: true },
    ],
    notaExtra: null,
    cuotas: null,
    beneficios: [
      'Acceso libre sedes YB y Centro',
      'Evaluación inicial básica',
      'Zona de musculación y funcional',
    ],
    ctaTexto: 'Seleccionar Plan',
    ctaClass: 'outline',
    popular: false,
    benefitClass: 'muted',
  },
  {
    nombre: 'Trimestral',
    subtitulo: 'Compromiso real con tus resultados.',
    precios: [
      { monto: '$119.000', metodo: 'Efectivo', sizeClass: 'size-xl' },
      { monto: '$124.000', metodo: 'Transferencia', small: true },
    ],
    notaExtra: 'Ahorrá entrenando 3 meses',
    cuotas: null,
    beneficios: [
      'Acceso libre sedes YB y Centro',
      'Evaluación inicial básica',
      'Zona de musculación y funcional',
    ],
    ctaTexto: 'Adquirir Ahora',
    ctaClass: 'filled',
    popular: true,
    benefitClass: 'light',
  },
  {
    nombre: '6 Meses',
    subtitulo: 'Transformación total garantizada.',
    precios: [
      { monto: '$229.000', metodo: 'Efectivo', sizeClass: 'size-2xl' },
      { monto: '$240.000', metodo: 'Transferencia', small: true },
    ],
    notaExtra: null,
    cuotas: '3 Cuotas de $80.000',
    beneficios: [
      'Acceso libre sedes YB y Centro',
      'Evaluación inicial básica',
      'Zona de musculación y funcional',
    ],
    ctaTexto: 'Seleccionar Plan',
    ctaClass: 'outline',
    popular: false,
    benefitClass: 'muted',
  },
  {
    nombre: 'Anual',
    subtitulo: 'El compromiso máximo, el mejor precio.',
    precios: [
      { monto: '$399.000', metodo: 'Efectivo', sizeClass: 'size-xl' },
      { monto: '$419.000', metodo: 'Transferencia', small: true },
    ],
    notaExtra: 'Ahorrá más de $129.000 vs mensual',
    cuotas: '6 Cuotas de $70.000',
    beneficios: [
      'Acceso libre sedes YB y Centro',
      'Evaluación inicial básica',
      'Zona de musculación y funcional',
    ],
    ctaTexto: 'Adquirir Ahora',
    ctaClass: 'filled',
    popular: false,
    benefitClass: 'light',
  },
];

function PlanCard({ plan }) {
  const [metodo, setMetodo] = useState(0); // 0 = efectivo, 1 = transferencia
  const precio = plan.precios[metodo];

  const handleSeleccionar = () => {
    sessionStorage.setItem('planSeleccionado', JSON.stringify({
      plan: plan.nombre,
      metodo: precio.metodo,
      precio: precio.monto,
    }));
    window.dispatchEvent(new CustomEvent('planSeleccionado', {
      detail: { plan: plan.nombre, metodo: precio.metodo },
    }));
    document.getElementById('inscripcion').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`plan-card glass ${plan.popular ? 'popular' : 'normal'}`}>
      <h4 className="plan-name">{plan.nombre}</h4>
      <p className="plan-desc">{plan.subtitulo}</p>

      <div className="plan-metodo-toggle">
        <button
          className={`metodo-btn${metodo === 0 ? ' active' : ''}`}
          onClick={() => setMetodo(0)}
          type="button"
        >
          <i className="fas fa-money-bill-wave"></i>
          Efectivo
        </button>
        <button
          className={`metodo-btn${metodo === 1 ? ' active' : ''}`}
          onClick={() => setMetodo(1)}
          type="button"
        >
          <i className="fas fa-mobile-alt"></i>
          Transferencia
        </button>
      </div>

      <div className="plan-precios">
        <div className="plan-precio-row">
          <span className={`plan-price-big ${precio.sizeClass || 'size-2xl'}`}>{precio.monto}</span>
          <span className="plan-price-label">/ mes</span>
        </div>
        {plan.notaExtra && <p className="plan-note">{plan.notaExtra}</p>}
        {plan.cuotas && metodo === 1 && <div className="plan-cuota-badge">{plan.cuotas}</div>}
      </div>

      <ul className={`plan-benefits ${plan.benefitClass}`}>
        {plan.beneficios.map((b, i) => (
          <li key={i}>
            <i className="fas fa-check"></i>
            {b}
          </li>
        ))}
      </ul>

      <button onClick={handleSeleccionar} className={`plan-cta ${plan.ctaClass}`}>
        Contratar — {precio.metodo}
      </button>
    </div>
  );
}

export default function Planes() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState('right');
  const n = planes.length;
  const prevIdx = (current - 1 + n) % n;
  const nextIdx = (current + 1) % n;

  const goTo = (idx, direction) => {
    setDir(direction);
    setCurrent(idx);
  };

  return (
    <section id="planes" className="planes relative">
      <div className="planes-bg-blur absolute"></div>

      <div className="planes-container relative">
        <div className="planes-header text-center mb-10" data-aos="fade-up">
          <h2 className="planes-title">
            Nuestros <span className="blue-gradient-text">Planes</span>
          </h2>
          <p className="planes-subtitle mt-2">
            Elegí el plan que mejor se adapte a tu ritmo y objetivos.
          </p>
        </div>

        <div className="planes-carousel-wrapper">
          <button
            className="carousel-arrow arrow-left"
            onClick={() => goTo(prevIdx, 'right')}
            type="button"
            aria-label="Plan anterior"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="planes-track">
            <div className="peek-slot peek-side" onClick={() => goTo(prevIdx, 'right')}>
              <PlanCard plan={planes[prevIdx]} />
            </div>
            <div className={`peek-slot peek-active dir-${dir}`}>
              <PlanCard key={current} plan={planes[current]} />
            </div>
            <div className="peek-slot peek-side" onClick={() => goTo(nextIdx, 'left')}>
              <PlanCard plan={planes[nextIdx]} />
            </div>
          </div>

          <button
            className="carousel-arrow arrow-right"
            onClick={() => goTo(nextIdx, 'left')}
            type="button"
            aria-label="Plan siguiente"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="carousel-dots">
          {planes.map((p, i) => (
            <button
              key={p.nombre}
              className={`carousel-dot${i === current ? ' active' : ''}`}
              onClick={() => goTo(i, i > current ? 'left' : 'right')}
              type="button"
              aria-label={p.nombre}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import '../styles/Planes.css';

const planes = [
  {
    nombre: 'Mensual',
    subtitulo: 'Ideal para empezar tu camino.',
    precios: [
      { monto: '$46.000', metodo: 'Efectivo', sizeClass: 'size-2xl' },
      { monto: '$48.000', metodo: 'Transferencia', small: true },
    ],
    cuotas: null,
    beneficios: [
      'Acceso libre sedes YB y Centro',
      'Planificación personalizada según tus objetivos',
    ],
    ctaTexto: 'Seleccionar Plan',
    ctaClass: 'filled',
    benefitClass: 'light',
  },
  {
    nombre: 'Trimestral',
    subtitulo: 'Compromiso real con tus resultados.',
    precios: [
      { monto: '$125.000', metodo: 'Efectivo', sizeClass: 'size-2xl' },
    ],
    cuotas: null,
    beneficios: [
      'Acceso libre sedes YB y Centro',
      'Planificación personalizada según tus objetivos',
    ],
    ctaTexto: 'Adquirir Ahora',
    ctaClass: 'filled',
    benefitClass: 'light',
  },
  {
    nombre: 'Semestral',
    subtitulo: 'Transformación total garantizada.',
    precios: [
      { monto: '$252.000', metodo: 'Efectivo', sizeClass: 'size-2xl' },
    ],
    cuotas: '3 Cuotas de $84.000',
    beneficios: [
      'Planificación personalizada según tus objetivos',
      'Evaluación tecnológica de fuerza y potencia',
      'Descuento preferencial en sesiones de sauna y recovery',
    ],
    ctaTexto: 'Seleccionar Plan',
    ctaClass: 'filled',
    benefitClass: 'light compact',
  },
  {
    nombre: 'Anual',
    subtitulo: 'El compromiso máximo, el mejor precio.',
    precios: [
      {
        monto: '$480.000',
        metodo: 'Efectivo',
        sizeClass: 'size-2xl',
        cuotas: '3 Cuotas de $160.000'
      },
      {
        monto: '$510.000',
        metodo: 'Transferencia',
        small: true,
        cuotas: '3 Cuotas de $170.000'
      },
    ],
    cuotas: null,
    beneficios: [
      'Planificación personalizada según tus objetivos',
      'Evaluación tecnológica de fuerza y potencia',
      'Descuento preferencial en sesiones de sauna y recovery',
    ],
    ctaTexto: 'Adquirir Ahora',
    ctaClass: 'filled',
    benefitClass: 'light compact',
  },
];

function PlanCard({ plan }) {
  const [metodo, setMetodo] = useState(0);
  const precio = plan.precios[metodo];
  const cuotasRender = precio.cuotas || plan.cuotas;

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

      {plan.precios.length > 1 ? (
        <div className="plan-metodo-toggle">
          {plan.precios.map((p, idx) => (
            <button
              key={p.metodo}
              className={`metodo-btn${metodo === idx ? ' active' : ''}`}
              onClick={() => setMetodo(idx)}
              type="button"
            >
              <i className={p.metodo === 'Efectivo' ? 'fas fa-money-bill-wave' : 'fas fa-mobile-alt'}></i>
              {p.metodo}
            </button>
          ))}
        </div>
      ) : (
        <div className="plan-metodo-toggle" style={{ opacity: 0.9, pointerEvents: 'none' }}>
          <button className="metodo-btn active" type="button">
            <i className={precio.metodo === 'Efectivo' ? 'fas fa-money-bill-wave' : 'fas fa-mobile-alt'}></i>
            {precio.metodo}
          </button>
        </div>
      )}

      <div className="plan-precios">
        <div className="plan-precio-row">
          <span className={`plan-price-big ${precio.sizeClass || 'size-2xl'}`}>{precio.monto}</span>
          <span className="plan-price-label">/ {plan.nombre === 'Mensual' ? 'mes' : 'total'}</span>
        </div>
        {cuotasRender && (
          <div className="flex flex-wrap gap-1">
            {Array.isArray(cuotasRender) ? (
              cuotasRender.map((cuota, idx) => (
                <div key={idx} className="plan-cuota-badge">
                  {cuota}
                </div>
              ))
            ) : (
              <div className="plan-cuota-badge">{cuotasRender}</div>
            )}
          </div>
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

      <button onClick={handleSeleccionar} className={`plan-cta ${plan.ctaClass}`}>
        Contratar — <i className={precio.metodo === 'Efectivo' ? 'fas fa-money-bill-wave' : 'fas fa-mobile-alt'} style={{ marginLeft: '4px' }}></i>
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
        <div className="planes-header text-center mb-5" data-aos="fade-up">
          <h2 className="planes-title">
            Nuestros <span className="blue-gradient-text">Planes</span>
          </h2>
          <p className="planes-subtitle mt-1">
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
            <div className="peek-slot peek-side">
              <PlanCard plan={planes[prevIdx]} />
            </div>
            <div className={`peek-slot peek-active dir-${dir}`}>
              <PlanCard key={current} plan={planes[current]} />
            </div>
            <div className="peek-slot peek-side">
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

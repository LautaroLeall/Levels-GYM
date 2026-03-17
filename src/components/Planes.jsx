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
    ctaTexto: 'Seleccionar',
    ctaClass: 'outline',
    popular: false,
    benefitClass: 'muted',
    delay: '0',
  },

  {
    nombre: 'Trimestral',
    subtitulo: 'Compromiso real con tus resultados.',
    precios: [
      { monto: '$119.000', metodo: 'Efectivo', sizeClass: 'size-xl' },
    ],
    notaExtra: 'Ahorrá entrenando 3 meses',
    cuotas: null,
    beneficios: [
      'Prioridad en evaluaciones',
      'Seguimiento de progreso mensual',
      'Invitaciones a eventos exclusivos',
      'Acceso a zona Recovery',
    ],
    ctaTexto: 'Adquirir Ahora',
    ctaClass: 'filled',
    popular: true,
    benefitClass: 'light',
    delay: '100',
  },

  {
    nombre: '6 Meses',
    subtitulo: 'Transformación total garantizada.',
    precios: [
      { monto: '$240.000', metodo: 'Total', sizeClass: 'size-2xl' },
    ],
    notaExtra: null,
    cuotas: '3 Cuotas de $80.000',
    beneficios: [
      'Congelamiento de precio x 6 meses',
      'Plan nutricional premium incluido',
      'Remera oficial Levels de regalo',
      'Acceso ilimitado a Recovery',
    ],
    ctaTexto: 'Seleccionar',
    ctaClass: 'outline',
    popular: false,
    benefitClass: 'muted',
    delay: '200',
  },
];

export default function Planes() {
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

        <div className="planes-grid grid gap-10">
          {planes.map((plan) => (
            <div
              key={plan.nombre}
              className={`plan-card flex flex-col p-10 glass ${plan.popular ? 'popular' : 'normal'}`}
              data-aos="fade-up"
              data-aos-delay={plan.delay}
            >
              {plan.popular && <div className="plan-badge absolute">Más Popular</div>}

              <h4 className="plan-name mb-2">{plan.nombre}</h4>
              <p className="plan-desc mb-6">{plan.subtitulo}</p>

              <div style={{ marginBottom: '2rem' }}>
                {plan.precios.map((p, i) =>
                  p.small ? (
                    <div key={i} className="flex items-baseline gap-1" style={{ marginBottom: '0.5rem' }}>
                      <span className="plan-price-small">{p.monto}</span>
                      <span className="plan-price-label">{p.metodo}</span>
                    </div>
                  ) : (
                    <div key={i} className="flex items-baseline gap-1" style={{ marginBottom: '0.5rem' }}>
                      <span className={`plan-price-big ${p.sizeClass}`}>{p.monto}</span>
                      <span className="plan-price-label">{p.metodo}</span>
                    </div>
                  )
                )}
                {plan.notaExtra && <p className="plan-note mt-2">{plan.notaExtra}</p>}
                {plan.cuotas && <div className="plan-cuota-badge inline-block mt-2">{plan.cuotas}</div>}
              </div>

              <ul className={`plan-benefits p-0 ${plan.benefitClass}`}>
                {plan.beneficios.map((b, i) => (
                  <li className="mb-3" key={i}>
                    <i className="fas fa-check mr-2"></i>
                    {b}
                  </li>
                ))}
              </ul>

              <a href="#inscripcion" className={`plan-cta block text-center p-4 ${plan.ctaClass}`}>
                {plan.ctaTexto}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

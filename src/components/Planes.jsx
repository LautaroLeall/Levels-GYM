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
            <div
              key={plan.nombre}
              className={`plan-card glass ${plan.popular ? 'popular' : 'normal'}`}
              data-aos="fade-up"
              data-aos-delay={plan.delay}
            >
              {plan.popular && <div className="plan-badge">Más Popular</div>}

              <h4 className="plan-name">{plan.nombre}</h4>
              <p className="plan-desc">{plan.subtitulo}</p>

              <div style={{ marginBottom: '2rem' }}>
                {plan.precios.map((p, i) =>
                  p.small ? (
                    <div key={i} className="flex items-baseline gap-2" style={{ marginBottom: '0.5rem' }}>
                      <span className="plan-price-small">{p.monto}</span>
                      <span className="plan-price-label">{p.metodo}</span>
                    </div>
                  ) : (
                    <div key={i} className="flex items-baseline gap-2" style={{ marginBottom: '0.5rem' }}>
                      <span className={`plan-price-big ${p.sizeClass}`}>{p.monto}</span>
                      <span className="plan-price-label">{p.metodo}</span>
                    </div>
                  )
                )}
                {plan.notaExtra && <p className="plan-note">{plan.notaExtra}</p>}
                {plan.cuotas && <div className="plan-cuota-badge">{plan.cuotas}</div>}
              </div>

              <ul className={`plan-benefits ${plan.benefitClass}`}>
                {plan.beneficios.map((b, i) => (
                  <li key={i}>
                    <i className="fas fa-check"></i>
                    {b}
                  </li>
                ))}
              </ul>

              <a href="#inscripcion" className={`plan-cta ${plan.ctaClass}`}>
                {plan.ctaTexto}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

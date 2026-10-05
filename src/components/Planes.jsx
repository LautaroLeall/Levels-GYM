import { useState, useEffect } from 'react';
import '../styles/Planes.css';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function PlanCard({ plan }) {
  const [metodo, setMetodo] = useState(0);
  // Safe defaults if precios are missing
  const precio = plan.precios && plan.precios.length > 0 ? plan.precios[metodo] : { monto: '', metodo: '' };
  const cuotasRender = plan.cuotas;

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
    <div className={`plan-card flex flex-col glass ${plan.popular ? 'popular' : 'normal'}`}>
      <h3 className="plan-name">{plan.nombre}</h3>
      <p className="plan-desc">{plan.subtitulo}</p>

      {plan.precios && plan.precios.length > 1 ? (
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

      <div className="plan-precios mb-4">
        <div className="plan-precio-row flex items-baseline gap-1.5 mt-0.5">
          <span className={`plan-price-big ${precio.sizeClass || 'size-2xl'}`}>{precio.monto}</span>
          <span className="plan-price-label">/ {plan.nombre === 'Mensual' ? 'mes' : 'total'}</span>
        </div>
        {cuotasRender && (
          <div className="flex flex-wrap gap-1">
            <div className="plan-cuota-badge">{cuotasRender}</div>
          </div>
        )}
      </div>

      <ul className={`plan-benefits ${plan.benefitClass}`}>
        {plan.beneficios && plan.beneficios.map((b, i) => (
          <li key={i}>
            <i className="fas fa-check"></i>
            {b}
          </li>
        ))}
      </ul>

      <button onClick={handleSeleccionar} className={`plan-cta ${plan.ctaClass || 'filled'}`}>
        Contratar — <i className={precio.metodo === 'Efectivo' ? 'fas fa-money-bill-wave' : 'fas fa-mobile-alt'} style={{ marginLeft: '4px' }}></i>
      </button>
    </div>
  );
}

export default function Planes() {
  const [planes, setPlanes] = useState([]);
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState('right');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'planes'));
        let planesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Filtrar planes inactivos
        planesData = planesData.filter(plan => plan.activo !== false);
        planesData.sort((a, b) => a.order - b.order);
        setPlanes(planesData);
      } catch (error) {
        console.error("Error al obtener planes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanes();
  }, []);

  if (loading) {
    return <section id="planes" className="planes relative flex items-center justify-center min-h-125"><div className="text-white">Cargando planes...</div></section>;
  }

  if (planes.length === 0) {
    return <section id="planes" className="planes relative flex items-center justify-center min-h-125"><div className="text-white">No hay planes disponibles.</div></section>;
  }

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

        <div className="planes-carousel-wrapper relative">
          <button
            className="carousel-arrow arrow-left"
            onClick={() => goTo(prevIdx, 'right')}
            type="button"
            aria-label="Plan anterior"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="planes-track flex items-stretch justify-center gap-5">
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

        <div className="carousel-dots flex justify-center mt-6 gap-2">
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

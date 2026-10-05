import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import '../../styles/Planes.css';
import '../../styles/AdminPlanes.css';

// Sub-componente para la Vista Previa
function PlanPreview({ plan }) {
  const [metodo, setMetodo] = useState(0);
  const precio = plan.precios && plan.precios.length > 0 ? plan.precios[metodo] : { monto: '---', metodo: 'Efectivo' };

  return (
    <div className={`plan-card flex flex-col glass ${plan.popular ? 'popular' : 'normal'} mx-auto`} style={{ maxWidth: '400px', transform: 'scale(0.95)', transformOrigin: 'top center' }}>
      <h3 className="plan-name">{plan.nombre || 'Nombre del Plan'}</h3>
      <p className="plan-desc">{plan.subtitulo || 'Subtítulo del plan...'}</p>

      {plan.precios && plan.precios.length > 1 ? (
        <div className="plan-metodo-toggle">
          {plan.precios.map((p, idx) => (
            <button key={idx} className={`metodo-btn${metodo === idx ? ' active' : ''}`} onClick={() => setMetodo(idx)} type="button">
              <i className={p.metodo === 'Efectivo' ? 'fas fa-money-bill-wave' : 'fas fa-mobile-alt'}></i>
              {p.metodo || 'Método'}
            </button>
          ))}
        </div>
      ) : (
        <div className="plan-metodo-toggle" style={{ opacity: 0.9, pointerEvents: 'none' }}>
          <button className="metodo-btn active" type="button">
            <i className={precio.metodo === 'Efectivo' ? 'fas fa-money-bill-wave' : 'fas fa-mobile-alt'}></i>
            {precio.metodo || 'Efectivo'}
          </button>
        </div>
      )}

      <div className="plan-precios mb-4">
        <div className="plan-precio-row flex items-baseline gap-1.5 mt-0.5">
          <span className={`plan-price-big ${precio.sizeClass || 'size-2xl'}`}>{precio.monto || '$0'}</span>
          <span className="plan-price-label">/ {plan.nombre?.toLowerCase().includes('mensual') ? 'mes' : 'total'}</span>
        </div>
        {plan.cuotas && (
          <div className="flex flex-wrap gap-1">
            <div className="plan-cuota-badge">{plan.cuotas}</div>
          </div>
        )}
      </div>

      <ul className={`plan-benefits ${plan.benefitClass || 'light'}`}>
        {plan.beneficios && plan.beneficios.map((b, i) => (
          <li key={i}><i className="fas fa-check"></i>{b}</li>
        ))}
      </ul>

      <button className={`plan-cta ${plan.ctaClass || 'filled'}`} style={{ pointerEvents: 'none' }}>
        Contratar — <i className={precio.metodo === 'Efectivo' ? 'fas fa-money-bill-wave' : 'fas fa-mobile-alt'} style={{ marginLeft: '4px' }}></i>
      </button>
    </div>
  );
}

export default function AdminPlanes() {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'planes'), (snapshot) => {
      const planesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      planesData.sort((a, b) => a.order - b.order);
      setPlanes(planesData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const alertConfig = {
    background: '#0f172a',
    color: '#f1f5f9',
    confirmButtonColor: '#2563eb',
    cancelButtonColor: '#ef4444',
  };

  const handleSave = async () => {
    // Validaciones básicas
    if (!editing.nombre || !editing.precios[0].monto) {
      return Swal.fire({ ...alertConfig, icon: 'error', title: 'Error', text: 'El nombre y al menos un precio son obligatorios.' });
    }

    const result = await Swal.fire({ ...alertConfig, title: '¿Guardar cambios?', icon: 'question', showCancelButton: true, confirmButtonText: 'Sí, guardar', cancelButtonText: 'Cancelar' });
    if (result.isConfirmed) {
      await setDoc(doc(db, 'planes', editing.id), editing);
      setEditing(null);
      Swal.fire({ ...alertConfig, title: 'Guardado', icon: 'success', timer: 1500, showConfirmButton: false });
    }
  };

  const toggleActivo = async (plan) => {
    const nuevoEstado = plan.activo === false ? true : false;
    const result = await Swal.fire({ ...alertConfig, title: `¿${nuevoEstado ? 'Activar' : 'Deshabilitar'} este plan?`, text: nuevoEstado ? 'Será visible en la web pública.' : 'Se ocultará de la web pública.', icon: 'warning', showCancelButton: true, confirmButtonText: `Sí, ${nuevoEstado ? 'Activar' : 'Deshabilitar'}`, cancelButtonText: 'Cancelar' });
    if (result.isConfirmed) {
      await updateDoc(doc(db, 'planes', plan.id), { activo: nuevoEstado });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({ ...alertConfig, title: '¿Eliminar Plan DEFINITIVAMENTE?', text: "Esta acción no se puede deshacer.", icon: 'error', showCancelButton: true, confirmButtonColor: '#ef4444', confirmButtonText: 'Sí, ELIMINAR', cancelButtonText: 'Cancelar' });
    if (result.isConfirmed) {
      await deleteDoc(doc(db, 'planes', id));
    }
  };

  const handleCreateNew = () => {
    const newId = `plan_${Date.now()}`;
    setEditing({
      id: newId,
      nombre: 'Nuevo Plan',
      subtitulo: 'Descripción breve',
      precios: [{ monto: '$0', metodo: 'Efectivo', sizeClass: 'size-2xl' }],
      cuotas: '',
      beneficios: ['Beneficio 1'],
      ctaTexto: 'Seleccionar Plan',
      ctaClass: 'filled',
      benefitClass: 'light',
      order: planes.length + 1,
      activo: false // Oculto por defecto
    });
  };

  const handleChange = (e, field) => setEditing({ ...editing, [field]: e.target.value });

  const handlePrecioChange = (index, field, value) => {
    const newPrecios = [...editing.precios];
    newPrecios[index][field] = value;
    setEditing({ ...editing, precios: newPrecios });
  };

  const addPrecio = () => {
    setEditing({
      ...editing,
      precios: [...editing.precios, { monto: '$0', metodo: 'Transferencia' }]
    });
  };

  const removePrecio = (index) => {
    const newPrecios = [...editing.precios];
    newPrecios.splice(index, 1);
    setEditing({ ...editing, precios: newPrecios });
  };

  if (loading) return <div className="text-center p-10 text-slate-400">Cargando planes...</div>;

  return (
    <div>
      <div className="admin-header-actions">
        {!editing && (
          <button onClick={handleCreateNew} className="admin-btn-primary">
            <i className="fas fa-plus"></i> Crear Nuevo Plan
          </button>
        )}
      </div>

      <div className="admin-grid">
        {editing && !planes.find(p => p.id === editing.id) && (
          <div className="admin-card editing">
            <h3 className="admin-editor-title mb-4">Creando Nuevo Plan</h3>
            {/* El mismo form se renderizará abajo usando `current` */}
          </div>
        )}

        {/* Fusionamos planes existentes + el nuevo (si se está creando) */}
        {(editing && !planes.find(p => p.id === editing.id) ? [editing, ...planes] : planes).map(plan => {
          const isEditing = editing && editing.id === plan.id;
          const current = isEditing ? editing : plan;
          const isActivo = plan.activo !== false; // true por defecto

          return (
            <div key={plan.id} className={`admin-card glass ${!isActivo && !isEditing ? 'disabled' : ''} ${isEditing ? 'editing' : ''}`}>
              {isEditing ? (
                <div className="admin-editor-layout">
                  <div className="admin-editor-panel glass">
                    <div className="admin-editor-header">
                      <h3 className="admin-editor-title">Editando: {current.nombre}</h3>
                      <div className="admin-editor-actions">
                        <button onClick={() => setEditing(null)} className="admin-btn-cancel">Cancelar</button>
                        <button onClick={handleSave} className="admin-btn-save">Guardar Cambios</button>
                      </div>
                    </div>

                    <div className="admin-editor-form">
                      <div className="admin-form-row">
                        <div className="admin-form-group">
                          <label>Nombre del Plan</label>
                          <input value={current.nombre} onChange={(e) => handleChange(e, 'nombre')} className="admin-form-input" placeholder="Ej: Mensual" />
                        </div>
                        <div className="admin-form-group">
                          <label>Subtítulo</label>
                          <input value={current.subtitulo} onChange={(e) => handleChange(e, 'subtitulo')} className="admin-form-input" placeholder="Frase motivacional" />
                        </div>
                      </div>

                      <div className="admin-editor-section">
                        <div className="flex justify-between items-center mb-3">
                          <label className="mb-0 text-sm">Precios y Métodos</label>
                          <button onClick={addPrecio} className="text-xs bg-green-600/30 text-green-400 hover:bg-green-600 hover:text-white px-2 py-1 rounded transition"><i className="fas fa-plus"></i> Añadir Variante</button>
                        </div>

                        <div className="flex flex-col gap-3">
                          {current.precios.map((precio, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                              <input
                                value={precio.metodo}
                                onChange={(e) => handlePrecioChange(idx, 'metodo', e.target.value)}
                                className="admin-form-input w-1/3"
                                placeholder="Ej: Efectivo"
                              />
                              <input
                                value={precio.monto}
                                onChange={(e) => handlePrecioChange(idx, 'monto', e.target.value)}
                                className="admin-form-input w-1/3 font-bold text-green-400"
                                placeholder="Ej: $50.000"
                              />
                              {idx > 0 && (
                                <button onClick={() => removePrecio(idx)} className="text-red-400 hover:text-red-300 p-2"><i className="fas fa-trash"></i></button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="admin-form-group">
                        <label>Cuotas (Opcional - Info Extra)</label>
                        <input value={current.cuotas || ''} onChange={(e) => { setEditing({ ...editing, cuotas: e.target.value }) }} className="admin-form-input" placeholder="Ej: 3 Cuotas sin interés" />
                      </div>

                      <div className="admin-form-group">
                        <label>Beneficios (Separados por una coma ",")</label>
                        <textarea
                          value={current.beneficios.join(', ')}
                          onChange={(e) => {
                            const arr = e.target.value.split(',').map(s => s.trimStart());
                            setEditing({ ...editing, beneficios: arr });
                          }}
                          rows="3"
                          className="admin-form-input"
                          placeholder="Acceso libre, Planificación, etc..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="admin-preview-container">
                    <h3 className="admin-preview-title"><i className="fas fa-eye text-blue-500 mr-2"></i>Vista Previa en Vivo</h3>
                    <div className="planes bg-transparent p-0 m-0">
                      <PlanPreview plan={editing} />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="admin-card-actions">
                    <button
                      onClick={() => toggleActivo(plan)}
                      title={isActivo ? "Ocultar plan" : "Mostrar plan"}
                      className={`admin-action-btn toggle ${isActivo ? 'off' : ''}`}
                    >
                      <i className={`fas ${isActivo ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                    <button
                      onClick={() => setEditing(plan)}
                      className="admin-action-btn edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="admin-action-btn delete"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>

                  {!isActivo && (
                    <span className="admin-badge-disabled">
                      Deshabilitado
                    </span>
                  )}

                  <h3 className="text-2xl font-black italic uppercase text-blue-500 mb-1">{plan.nombre}</h3>
                  <p className="text-slate-400 text-sm italic mb-4">{plan.subtitulo}</p>

                  {plan.precios.map((p, idx) => (
                    <div key={idx} className="mb-2">
                      <span className="text-2xl font-black text-white">{p.monto}</span>
                      <span className="text-slate-500 text-xs font-bold uppercase italic ml-2">{p.metodo}</span>
                    </div>
                  ))}

                  {plan.cuotas && (
                    <div className="inline-block bg-white/10 text-blue-400 text-xs font-bold uppercase px-2 py-1 rounded my-3">
                      {plan.cuotas}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

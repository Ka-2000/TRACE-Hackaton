import { useState, useEffect } from 'react';
import { api } from '../api.js';
import { wearColor } from '../data.js';

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

export default function Garage({ go, buy, mountOnBike }) {
  const [items, setItems] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => { api.garage().then(setItems).catch(() => setItems([])); }, []);

  const doDelete = async (bikeId) => {
    await api.deleteBike(bikeId).catch(() => {});
    setItems((prev) => prev.filter((b) => b.bike_id !== bikeId));
    setConfirmDelete(null);
  };

  if (!items) return <div className="loading">Chargement de ton garage…</div>;

  return (
    <div className="pad">
      <div className="eyebrow">Mon garage</div>
      <h1 className="title">Tes gommes, suivies.</h1>
      <p className="sub">On estime l'usure à partir de tes km. Tu es prévenu avant la panne.</p>
      <div style={{ height: 18 }} />

      {items.map((g) => {
        const id = g.bike_id;
        const hasTyre = !!g.tyre_id;
        const alert = hasTyre && g.wear_pct >= 80;
        const deleting = confirmDelete === id;

        return (
          <div className="card" style={{ marginBottom: 14 }} key={id}>
            <div className="tyre-row">
              <div className="tyre-thumb" />
              <div className="tyre-meta">
                <div className="nm">{hasTyre ? g.tyre : 'Aucun pneu monté'}</div>
                <div className="bk">{g.bike}{hasTyre ? ` · ${g.km_ridden.toLocaleString('fr')} km` : ''}</div>
                {hasTyre && (
                  <div className="gauge">
                    <div className="bar"><i style={{ width: `${g.wear_pct}%`, background: wearColor(g.wear_pct) }} /></div>
                    <span className="wear-val" style={{ color: wearColor(g.wear_pct) }}>{g.wear_pct}%</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setConfirmDelete(deleting ? null : id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', color: deleting ? 'var(--red)' : '#C0C3CC', flexShrink: 0, alignSelf: 'flex-start', marginTop: 4 }}
                aria-label="Supprimer ce vélo"
              >
                <TrashIcon />
              </button>
            </div>

            {deleting ? (
              <div style={{ padding: '0 16px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: '#3A3D45', flex: 1 }}>Supprimer ce vélo ?</span>
                <button
                  className="btn btn-sm"
                  style={{ background: 'var(--red)', color: '#fff', border: 'none', padding: '8px 14px' }}
                  onClick={() => doDelete(id)}
                >
                  Supprimer
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDelete(null)}>
                  Annuler
                </button>
              </div>
            ) : (
              <div style={{ padding: '0 16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {hasTyre ? (
                  <>
                    <span className={`pill ${alert ? 'alert' : 'ok'}`}><span className="dot" />{alert ? 'À remplacer' : 'En bon état'}</span>
                    {alert
                      ? <button className="btn btn-yellow btn-sm" onClick={() => buy({ tyre_id: g.tyre_id, name: g.tyre, line: '', price: g.price, bikeTyreId: g.id })}>Recommander</button>
                      : <button className="btn btn-ghost btn-sm" onClick={() => go('match')}>Comparer</button>}
                  </>
                ) : (
                  <>
                    <span className="pill ok"><span className="dot" />Pas de pneu</span>
                    <button className="btn btn-yellow btn-sm" onClick={() => mountOnBike(id)}>
                      Trouver mon pneu
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}

      <button className="btn btn-ghost" onClick={() => go('addbike')} style={{ marginTop: 4 }}>+ Ajouter un vélo</button>
    </div>
  );
}

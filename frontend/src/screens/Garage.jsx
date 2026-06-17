import { useState, useEffect } from 'react';
import { api } from '../api.js';
import { wearColor } from '../data.js';

export default function Garage({ go, buy }) {
  const [items, setItems] = useState(null);

  useEffect(() => { api.garage().then(setItems).catch(() => setItems([])); }, []);

  if (!items) return <div className="loading">Chargement de ton garage…</div>;

  return (
    <div className="pad">
      <div className="eyebrow">Mon garage</div>
      <h1 className="title">Tes gommes, suivies.</h1>
      <p className="sub">On estime l'usure à partir de tes km. Tu es prévenu avant la panne.</p>
      <div style={{ height: 18 }} />

      {items.map((g) => {
        const hasTyre = !!g.tyre_id;
        const alert = hasTyre && g.wear_pct >= 80;
        return (
          <div className="card" style={{ marginBottom: 14 }} key={g.bike_id || g.id}>
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
            </div>
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
                  <button className="btn btn-yellow btn-sm" onClick={() => go('match')}>Trouver mon pneu</button>
                </>
              )}
            </div>
          </div>
        );
      })}
      <button className="btn btn-ghost" onClick={() => go('addbike')} style={{ marginTop: 4 }}>+ Ajouter un vélo</button>
    </div>
  );
}

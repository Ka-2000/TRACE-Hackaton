import { useState, useEffect } from 'react';
import { api } from '../api.js';
import { euro } from '../data.js';

export default function Shop({ buy }) {
  const [tyres, setTyres] = useState(null);

  useEffect(() => { api.tyres().then(setTyres).catch(() => setTyres([])); }, []);

  if (!tyres) return <div className="loading">Chargement du catalogue…</div>;

  return (
    <div className="pad">
      <div className="eyebrow">Boutique</div>
      <h1 className="title">La gamme vélo Michelin.</h1>
      <p className="sub">Disponibilité en temps réel chez nos e-revendeurs partenaires.</p>
      <div style={{ height: 16 }} />
      {tyres.map((t) => (
        <div className="card" style={{ marginBottom: 12 }} key={t.id}>
          <div className="tyre-row" style={{ padding: '14px 16px' }}>
            <div className="tyre-thumb" />
            <div className="tyre-meta">
              <div className="nm">{t.name}</div>
              <div className="bk">{t.line}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="display" style={{ fontWeight: 700, fontSize: 16 }}>{euro(t.price)}</div>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 6 }} onClick={() => buy({ tyre_id: t.id, name: t.name, line: t.line, price: t.price })}>Acheter</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

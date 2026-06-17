import { useState, useEffect } from 'react';
import { api } from '../api.js';
import { euro } from '../data.js';
import FeedCard from '../components/FeedCard.jsx';

export default function Home({ go, buy, joinChallenge }) {
  const [alert, setAlert] = useState(null);
  const [km, setKm] = useState(null);

  useEffect(() => {
    api.alerts().then((a) => setAlert(a[0] || null)).catch(() => {});
    api.garage().then((g) => setKm(g.reduce((s, x) => s + x.km_ridden, 0))).catch(() => {});
  }, []);

  return (
    <div className="pad">
      <div className="hero">
        <div className="eyebrow">Roule sur la bonne gomme</div>
        <h2>Le bon pneu Michelin, au bon moment.</h2>
        <p>Trouve la gomme parfaite pour ton style, suis son usure, recommande en 2 clics.</p>
        <div className="cta-row">
          <button className="btn btn-yellow btn-sm" onClick={() => go('match')}>Trouver mon pneu</button>
          <button className="btn btn-ghost btn-sm" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)' }} onClick={() => go('garage')}>Mon garage</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat"><div className="n">{km != null ? km.toLocaleString('fr') : '—'}</div><div className="l">km suivis</div></div>
        <div className="stat"><div className="n y">2</div><div className="l">pneus actifs</div></div>
        <div className="stat"><div className="n">340</div><div className="l">points Trace</div></div>
      </div>

      {alert && (
        <div className="nudge" onClick={() => buy({ tyre_id: alert.tyre_id, name: alert.tyre, line: '', price: alert.price, bikeTyreId: alert.id })}>
          <div className="k">⚠ Réassort recommandé</div>
          <h4>Ton {alert.tyre} arrive en fin de vie</h4>
          <p>{alert.wear_pct}% d'usure sur ton {alert.bike}. Recommande maintenant pour être prêt ce week-end.</p>
          <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>Recommander — {euro(alert.price)}</button>
        </div>
      )}

      <div className="section-h"><h3>Découvre</h3><a onClick={() => go('community')}>Tout voir</a></div>
      <FeedCard tag="Défi" title="Challenge Printemps" desc="Roule 300 km ce mois-ci et débloque -15% sur ta prochaine gomme route." reward="+50 pts" onAction={() => joinChallenge({ id: 'spring300', tag: 'Défi', title: 'Challenge Printemps', desc: 'Roule 300 km ce mois-ci et débloque -15% sur ta prochaine gomme route.', reward: '+50 pts', points: 50 })} />
    </div>
  );
}

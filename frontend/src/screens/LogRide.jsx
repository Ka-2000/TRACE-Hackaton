import { useState, useEffect } from 'react';
import { api } from '../api.js';
import { wearColor } from '../data.js';

export default function LogRide({ go }) {
  const [bikes, setBikes] = useState(null);
  const [bikeId, setBikeId] = useState(null);
  const [km, setKm] = useState('');
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.garage().then((items) => {
      const withTyre = items.filter((b) => b.tyre_id);
      setBikes(withTyre);
      if (withTyre.length > 0) setBikeId(withTyre[0].bike_id || withTyre[0].id);
    }).catch(() => setBikes([]));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const parsed = parseInt(km, 10);
    if (!bikeId || !parsed || parsed <= 0) return;
    setSaving(true);
    try {
      const updated = await api.logRide(bikeId, parsed);
      setResult(updated);
    } catch {
      setSaving(false);
    }
  };

  if (result) {
    const alert = result.wear_pct >= 80;
    return (
      <div className="pad" style={{ textAlign: 'center', paddingTop: 48 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🚴</div>
        <h2 className="title">Sortie enregistrée !</h2>
        <p className="sub">+5 points Trace crédités.</p>
        <div style={{ height: 20 }} />
        <div className="card" style={{ padding: '16px 20px', textAlign: 'left', marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: '#7E828B', marginBottom: 4 }}>Usure actuelle</div>
          <div className="gauge" style={{ marginBottom: 0 }}>
            <div className="bar"><i style={{ width: `${result.wear_pct}%`, background: wearColor(result.wear_pct) }} /></div>
            <span className="wear-val" style={{ color: wearColor(result.wear_pct) }}>{result.wear_pct}%</span>
          </div>
          {alert && (
            <div style={{ marginTop: 12, fontSize: 13, color: 'var(--red)', fontWeight: 600 }}>
              ⚠ Ton pneu approche de la fin de vie — pense à le remplacer.
            </div>
          )}
        </div>
        {alert
          ? <button className="btn btn-yellow" onClick={() => go('garage')}>Voir l'alerte dans mon garage</button>
          : <button className="btn btn-yellow" onClick={() => go('garage')}>Voir mon garage</button>}
        <button className="btn btn-ghost" style={{ marginTop: 10 }} onClick={() => go('home')}>Accueil</button>
      </div>
    );
  }

  if (!bikes) return <div className="loading">Chargement de tes vélos…</div>;

  if (bikes.length === 0) {
    return (
      <div className="pad" style={{ textAlign: 'center', paddingTop: 48 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🚲</div>
        <h2 className="title">Aucun vélo équipé</h2>
        <p className="sub">Ajoute un vélo et monte-lui des pneus depuis ton garage pour loguer tes sorties.</p>
        <button className="btn btn-yellow" style={{ marginTop: 24 }} onClick={() => go('garage')}>Aller au garage</button>
      </div>
    );
  }

  return (
    <div className="pad">
      <div className="eyebrow">Wear Tracker</div>
      <h1 className="title">Loguer une sortie</h1>
      <p className="sub">Indique tes km — l'usure de ton pneu se met à jour en temps réel.</p>
      <div style={{ height: 18 }} />
      <form onSubmit={submit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#3A3D45' }}>
            Vélo
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {bikes.map((b) => {
              const id = b.bike_id || b.id;
              return (
                <button
                  type="button"
                  key={id}
                  className={`opt ${bikeId === id ? 'sel' : ''}`}
                  onClick={() => setBikeId(id)}
                >
                  <span className="tx">
                    <b>{b.bike}</b>
                    <span>{b.tyre} · {b.wear_pct}% usure</span>
                  </span>
                  <span className="chk" />
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#3A3D45' }}>
            Distance (km)
          </label>
          <input
            type="number"
            min="1"
            value={km}
            onChange={(e) => setKm(e.target.value)}
            placeholder="ex : 45"
            required
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 10,
              border: '1.5px solid #E4E5E9',
              fontSize: 15,
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button className="btn btn-yellow" type="submit" disabled={saving || !km || parseInt(km, 10) <= 0}>
          {saving ? 'Enregistrement…' : 'Valider la sortie'}
        </button>
        <button className="btn btn-ghost" type="button" style={{ marginTop: 10 }} onClick={() => go('home')}>
          Annuler
        </button>
      </form>
    </div>
  );
}

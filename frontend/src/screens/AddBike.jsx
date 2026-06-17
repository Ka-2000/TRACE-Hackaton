import { useState } from 'react';
import { api } from '../api.js';

const DISCIPLINES = [
  { v: 'route',  b: 'Route',  sub: 'Bitume, vitesse, longues sorties' },
  { v: 'gravel', b: 'Gravel', sub: 'Chemins, polyvalence, aventure' },
  { v: 'vtt',    b: 'VTT',    sub: 'Sentiers, descente, technique' },
  { v: 'ville',  b: 'Urbain', sub: 'Trajets quotidiens, fiabilité' },
];

export default function AddBike({ go }) {
  const [name, setName] = useState('');
  const [discipline, setDiscipline] = useState('route');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setError(null);
    try {
      await api.addBike(name.trim(), discipline);
      go('garage');
    } catch {
      setError("Erreur lors de l'ajout du vélo.");
      setSaving(false);
    }
  };

  return (
    <div className="pad">
      <div className="eyebrow">Mon garage</div>
      <h1 className="title">Ajouter un vélo</h1>
      <p className="sub">Renseigne les infos de ton vélo pour suivre l'usure de tes pneus.</p>
      <div style={{ height: 18 }} />
      <form onSubmit={submit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#3A3D45' }}>
            Nom du vélo
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ex : Trek Domane SL6"
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
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#3A3D45' }}>
            Discipline
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {DISCIPLINES.map((d) => (
              <button
                type="button"
                key={d.v}
                className={`opt ${discipline === d.v ? 'sel' : ''}`}
                onClick={() => setDiscipline(d.v)}
              >
                <span className="tx"><b>{d.b}</b><span>{d.sub}</span></span>
                <span className="chk" />
              </button>
            ))}
          </div>
        </div>
        {error && <p style={{ color: 'var(--red)', fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button className="btn btn-yellow" type="submit" disabled={saving || !name.trim()}>
          {saving ? 'Enregistrement…' : 'Ajouter ce vélo'}
        </button>
        <button
          className="btn btn-ghost"
          type="button"
          style={{ marginTop: 10 }}
          onClick={() => go('garage')}
        >
          Annuler
        </button>
      </form>
    </div>
  );
}

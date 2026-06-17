import { useState } from 'react';
import { api } from '../api.js';

export default function Challenge({ challenge, go, alreadyJoined, onJoined }) {
  const [loading, setLoading] = useState(false);

  if (!challenge) {
    go('community');
    return null;
  }

  const join = async () => {
    setLoading(true);
    try {
      await api.joinChallenge(challenge.id, challenge.points);
    } catch {}
    onJoined(challenge.id);
    setLoading(false);
  };

  if (alreadyJoined) {
    return (
      <div className="pad" style={{ textAlign: 'center', paddingTop: 48 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏆</div>
        <h2 className="title">Tu es inscrit !</h2>
        <p className="sub">+{challenge.points} points Trace crédités. Bonne route !</p>
        <div style={{ height: 24 }} />
        <button className="btn btn-yellow" onClick={() => go('community')}>Retour aux défis</button>
        <button className="btn btn-ghost" style={{ marginTop: 10 }} onClick={() => go('home')}>Accueil</button>
      </div>
    );
  }

  return (
    <div className="pad">
      <div className="eyebrow">Communauté Trace</div>
      <div style={{ height: 8 }} />
      <span className="pill ok" style={{ marginBottom: 12, display: 'inline-flex' }}>
        <span className="dot" />{challenge.tag}
      </span>
      <h1 className="title" style={{ marginTop: 8 }}>{challenge.title}</h1>
      <p className="sub">{challenge.desc}</p>
      <div style={{ height: 20 }} />
      <div className="card" style={{ padding: '16px 20px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: '#7E828B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>
          Récompense
        </div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>★ {challenge.reward}</div>
      </div>
      <button className="btn btn-yellow" onClick={join} disabled={loading}>
        {loading ? 'Inscription…' : 'Je participe'}
      </button>
      <button className="btn btn-ghost" style={{ marginTop: 10 }} onClick={() => go('community')}>
        Retour
      </button>
    </div>
  );
}

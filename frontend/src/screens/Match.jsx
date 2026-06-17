import { useState } from 'react';
import { api } from '../api.js';
import { QUESTIONS, SPECS, euro } from '../data.js';

export default function Match({ buy, go, matchBikeId, onMounted }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mounting, setMounting] = useState(false);

  const pick = (key, val) => {
    const next = { ...answers, [key]: val };
    setAnswers(next);
    setTimeout(() => {
      if (step + 1 >= QUESTIONS.length) {
        setLoading(true);
        api.match(next).then((r) => { setResult(r); setLoading(false); })
          .catch(() => setLoading(false));
        setStep(step + 1);
      } else {
        setStep(step + 1);
      }
    }, 180);
  };

  const restart = () => { setStep(0); setAnswers({}); setResult(null); };

  const mountTyre = async (tyreId) => {
    setMounting(true);
    try {
      await api.mountTyre(matchBikeId, tyreId);
      onMounted();
      go('garage');
    } catch {
      setMounting(false);
    }
  };

  if (loading) return <div className="loading">On cherche ta gomme idéale…</div>;

  if (result) {
    const t = result.tyre;
    const specs = SPECS[t.name] || {};
    return (
      <div className="pad">
        <div className="eyebrow">Ton Tyre Match</div>
        <div style={{ height: 12 }} />
        <div className="result-card">
          <div className="result-hd">
            <div className="mono" style={{ fontSize: 10, letterSpacing: '.12em', color: '#7E828B', textTransform: 'uppercase' }}>Recommandation Michelin</div>
            <div className="matchscore"><div className="n">{result.score}%</div><div className="l">de compatibilité</div></div>
          </div>
          <div className="result-tyre">{t.name}</div>
          <div className="result-line">{t.line}</div>
          <div className="spec-grid">
            {Object.entries(specs).map(([l, v]) => (
              <div className="spec" key={l}><div className="l">{l}</div><div className="v">{v}</div></div>
            ))}
          </div>
          <div className="why">
            <div className="k">Pourquoi cette gomme pour toi</div>
            <ul>{result.reasons.map((w, i) => <li key={i}>{w}</li>)}</ul>
          </div>
          <div className="buy-bar">
            <div className="price"><div className="p">{euro(t.price)}</div><div className="u">à partir de · 4 e-revendeurs</div></div>
            <button className="btn btn-yellow" style={{ width: 'auto', padding: '14px 22px' }} onClick={() => buy({ tyre_id: t.id, name: t.name, line: t.line, price: t.price })}>Acheter</button>
          </div>
        </div>

        {matchBikeId && (
          <button
            className="btn btn-yellow"
            style={{ marginTop: 12 }}
            disabled={mounting}
            onClick={() => mountTyre(t.id)}
          >
            {mounting ? 'Montage…' : 'Monter ce pneu sur mon vélo'}
          </button>
        )}

        <button className="btn btn-ghost" style={{ marginTop: 12 }} onClick={restart}>Recommencer le test</button>
      </div>
    );
  }

  const q = QUESTIONS[step];
  return (
    <div style={{ paddingTop: 18 }}>
      <div className="progress">{QUESTIONS.map((_, i) => <i key={i} className={i <= step ? 'on' : ''} />)}</div>
      <div className="pad">
        <div className="eyebrow">Tyre Match · {step + 1}/{QUESTIONS.length}</div>
        <div className="q-title">{q.title}</div>
        <div className="q-sub">{q.sub}</div>
        {q.opts.map((o) => (
          <button key={o.v} className={`opt ${answers[q.key] === o.v ? 'sel' : ''}`} onClick={() => pick(q.key, o.v)}>
            <span className="ic">{o.ic}</span>
            <span className="tx"><b>{o.b}</b><span>{o.sub}</span></span>
            <span className="chk" />
          </button>
        ))}
      </div>
    </div>
  );
}

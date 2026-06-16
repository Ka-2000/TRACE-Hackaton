import { euro } from '../data.js';

export default function Success({ cart, go }) {
  const name = cart?.name || 'ton pneu';
  return (
    <div className="success-wrap">
      <div className="success-ring">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" width="40" height="40"><path d="M5 13l4 4L19 7" /></svg>
      </div>
      <h1 className="title" style={{ fontSize: 24 }}>Commande confirmée</h1>
      <p className="sub" style={{ maxWidth: 280, marginTop: 6 }}>Ton {name} arrive. On a mis à jour ton garage et remis le compteur d'usure à zéro.</p>

      <div className="card" style={{ marginTop: 22, padding: 16, width: '100%', textAlign: 'left' }}>
        <Row label="Produit" value={name} />
        <Row label="e-revendeur" value="Alltricks" />
        <Row label="Livraison" value="24-48h" />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, borderTop: '1px solid var(--line)', paddingTop: 10, marginTop: 4 }}>
          <span>Total</span><b className="display">{cart ? euro(cart.price) : '—'}</b>
        </div>
      </div>

      <div className="reward" style={{ marginTop: 16 }}>★ +120 points Trace gagnés</div>
      <button className="btn btn-primary" style={{ marginTop: 22 }} onClick={() => go('garage')}>Voir mon garage</button>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
      <span style={{ color: 'var(--grey)' }}>{label}</span><b>{value}</b>
    </div>
  );
}

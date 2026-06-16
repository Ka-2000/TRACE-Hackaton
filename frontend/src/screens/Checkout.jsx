import { useState, useEffect } from 'react';
import { api } from '../api.js';
import { euro } from '../data.js';

export default function Checkout({ cart, go }) {
  const [retailers, setRetailers] = useState(null);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (cart?.tyre_id) api.retailers(cart.tyre_id).then(setRetailers).catch(() => setRetailers([]));
  }, [cart]);

  if (!cart) return <div className="loading">Panier vide.</div>;

  const placeOrder = (retailer, amount) => {
    setPlacing(true);
    api.order({ tyreId: cart.tyre_id, retailer, amount, bikeTyreId: cart.bikeTyreId })
      .then(() => go('success'))
      .catch(() => go('success')); // démo : on confirme même hors-ligne
  };

  return (
    <div className="pad">
      <button className="btn btn-ghost btn-sm" style={{ marginBottom: 14 }} onClick={() => go('shop')}>← Retour</button>
      <div className="journey">
        <div className="step done"><div className="c">✓</div><div className="l">Intérêt</div></div>
        <div className="ln" />
        <div className="step now"><div className="c">2</div><div className="l">Clic</div></div>
        <div className="ln" />
        <div className="step"><div className="c">3</div><div className="l">Achat</div></div>
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
        <div className="tyre-thumb" />
        <div style={{ flex: 1 }}>
          <div className="display" style={{ fontWeight: 700, fontSize: 17 }}>{cart.name}</div>
          <div style={{ fontSize: 12.5, color: 'var(--grey)' }}>{cart.line || 'Gamme vélo Michelin'}</div>
        </div>
      </div>

      <div className="eyebrow" style={{ marginBottom: 10 }}>Choisis ton e-revendeur</div>
      <div className="card">
        {(retailers || []).map((r) => (
          <div className="retailer" key={r.name}>
            <div className="r-logo">{r.name[0]}</div>
            <div className="r-meta">
              <div className="nm">{r.name}</div>
              <div className="st"><span className="dot" style={{ background: 'var(--green)' }} />{r.stock ? 'En stock' : 'Rupture'} · {r.delivery}</div>
            </div>
            <div className="r-price"><div className="p">{euro(r.price)}</div></div>
          </div>
        ))}
        {!retailers && <div className="loading">Recherche des stocks…</div>}
      </div>

      <button className="btn btn-yellow" style={{ marginTop: 18 }} disabled={placing || !retailers?.length}
        onClick={() => placeOrder(retailers[0].name, retailers[0].price)}>
        {placing ? 'Validation…' : `Acheter chez ${retailers?.[0]?.name || 'Alltricks'} — ${euro(cart.price)}`}
      </button>
      <p style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--grey)', marginTop: 10 }}>Paiement sécurisé · redirection e-revendeur partenaire</p>
    </div>
  );
}

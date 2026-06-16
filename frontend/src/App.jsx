import { useState, useCallback } from 'react';
import Home from './screens/Home.jsx';
import Garage from './screens/Garage.jsx';
import Match from './screens/Match.jsx';
import Shop from './screens/Shop.jsx';
import Checkout from './screens/Checkout.jsx';
import Success from './screens/Success.jsx';
import Community from './screens/Community.jsx';

const ICONS = {
  home: <path d="M3 11l9-8 9 8M5 10v10h14V10" />,
  garage: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.2" /></>,
  shop: <><path d="M6 7h12l-1 13H7L6 7z" /><path d="M9 7a3 3 0 0 1 6 0" /></>,
  ride: <><circle cx="6" cy="17" r="3.4" /><circle cx="18" cy="17" r="3.4" /><path d="M6 17l4-8h5l3 8M10 9l2-4h3" /></>,
};

export default function App() {
  const [view, setView] = useState('home');
  const [cart, setCart] = useState(null);

  const go = useCallback((v) => setView(v), []);
  // cart attendu : { tyre_id, name, line, price, bikeTyreId? }
  const buy = useCallback((item) => { setCart(item); setView('checkout'); }, []);

  const screens = {
    home: <Home go={go} buy={buy} />,
    garage: <Garage go={go} buy={buy} />,
    match: <Match go={go} buy={buy} />,
    shop: <Shop buy={buy} />,
    checkout: <Checkout cart={cart} go={go} />,
    success: <Success cart={cart} go={go} />,
    community: <Community go={go} />,
  };

  const NavBtn = ({ id, label }) => (
    <button className={view === id ? 'on' : ''} onClick={() => go(id)}>
      <svg viewBox="0 0 24 24">{ICONS[id]}</svg>{label}
    </button>
  );

  return (
    <div className="phone">
      <div className="topbar">
        <div className="brand">
          <div className="logo">T</div>
          <b>TRACE<span>.</span></b>
        </div>
        <div className="tag">Bonjour, Théo</div>
      </div>

      <div className="screen fade" key={view}>{screens[view]}</div>

      <nav className="nav">
        <NavBtn id="home" label="Accueil" />
        <NavBtn id="garage" label="Garage" />
        <button className="fab" onClick={() => go('match')} aria-label="Trouver mon pneu">
          <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
        </button>
        <NavBtn id="shop" label="Boutique" />
        <button className={view === 'community' ? 'on' : ''} onClick={() => go('community')}>
          <svg viewBox="0 0 24 24">{ICONS.ride}</svg>Communauté
        </button>
      </nav>
    </div>
  );
}

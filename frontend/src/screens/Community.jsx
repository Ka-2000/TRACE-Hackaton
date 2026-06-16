import FeedCard from '../components/FeedCard.jsx';

export default function Community({ go }) {
  return (
    <div className="pad">
      <div className="eyebrow">Communauté Trace</div>
      <h1 className="title">Roule. Gagne. Recommande.</h1>
      <p className="sub">Défis, segments et contenus qui transforment tes km en avantages Michelin.</p>
      <div style={{ height: 18 }} />
      <FeedCard tag="Défi du mois" title="300 km de printemps" desc="Boucle 300 km et débloque -15% sur ta prochaine gomme route + un dossard offert." reward="+50 pts · -15%" onAction={() => go('match')} />
      <FeedCard theme="gravel" tag="Segment" title="Les Crêtes — Gravel" desc="Le segment sponsorisé Michelin Power Gravel. Top 100 ce mois = échantillon offert." reward="+80 pts" onAction={() => go('match')} />
      <FeedCard theme="mtb" tag="Pro Story" title="Réglages d'enduro" desc="Comment les athlètes Michelin choisissent leur pression selon le terrain." reward="Lecture · +10 pts" onAction={() => go('match')} />
    </div>
  );
}

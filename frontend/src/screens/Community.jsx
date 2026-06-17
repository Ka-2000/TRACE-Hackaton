import FeedCard from '../components/FeedCard.jsx';

const CHALLENGES = [
  { id: 'spring300', tag: 'Défi du mois', title: '300 km de printemps', desc: 'Boucle 300 km et débloque -15% sur ta prochaine gomme route + un dossard offert.', reward: '+50 pts · -15%', points: 50, theme: 'road' },
  { id: 'cretes-gravel', tag: 'Segment', title: 'Les Crêtes — Gravel', desc: 'Le segment sponsorisé Michelin Power Gravel. Top 100 ce mois = échantillon offert.', reward: '+80 pts', points: 80, theme: 'gravel' },
  { id: 'enduro-story', tag: 'Pro Story', title: "Réglages d'enduro", desc: 'Comment les athlètes Michelin choisissent leur pression selon le terrain.', reward: 'Lecture · +10 pts', points: 10, theme: 'mtb' },
];

export default function Community({ go, joinChallenge }) {
  return (
    <div className="pad">
      <div className="eyebrow">Communauté Trace</div>
      <h1 className="title">Roule. Gagne. Recommande.</h1>
      <p className="sub">Défis, segments et contenus qui transforment tes km en avantages Michelin.</p>
      <div style={{ height: 18 }} />
      {CHALLENGES.map((c) => (
        <FeedCard
          key={c.id}
          theme={c.theme}
          tag={c.tag}
          title={c.title}
          desc={c.desc}
          reward={c.reward}
          onAction={() => joinChallenge(c)}
        />
      ))}
    </div>
  );
}

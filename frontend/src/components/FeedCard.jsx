export default function FeedCard({ theme = 'road', tag, title, desc, reward, onAction }) {
  return (
    <div className="card feed-card">
      <div className={`feed-img ${theme === 'road' ? '' : theme}`}>
        <span className="feed-tag">{tag}</span>
      </div>
      <div className="feed-body">
        <h4>{title}</h4>
        <p>{desc}</p>
        <div className="feed-foot">
          <span className="reward">★ {reward}</span>
          <button className="btn btn-primary btn-sm" onClick={onAction}>Participer</button>
        </div>
      </div>
    </div>
  );
}

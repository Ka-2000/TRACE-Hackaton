import { useState } from 'react';

export default function FeedCard({ theme = 'road', tag, title, desc, reward, onAction, alreadyJoined }) {
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    if (alreadyJoined) {
      setShowAlert(true);
      return;
    }
    onAction();
  };

  return (
    <div className="card feed-card">
      <div className={`feed-img ${theme === 'road' ? '' : theme}`}>
        <span className="feed-tag">{tag}</span>
      </div>
      <div className="feed-body">
        <h4>{title}</h4>
        <p>{desc}</p>
        {showAlert && (
          <div style={{
            background: '#FFF3CD',
            border: '1.5px solid #F5C842',
            borderRadius: 8,
            padding: '8px 12px',
            marginBottom: 8,
            fontSize: 13,
            color: '#7A5800',
            fontWeight: 500,
          }}>
            ⚠ Tu es déjà inscrit à ce défi !
          </div>
        )}
        <div className="feed-foot">
          <span className="reward">★ {reward}</span>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleClick}
            style={alreadyJoined ? { opacity: 0.45, cursor: 'not-allowed' } : {}}
          >
            {alreadyJoined ? 'Déjà inscrit' : 'Participer'}
          </button>
        </div>
      </div>
    </div>
  );
}

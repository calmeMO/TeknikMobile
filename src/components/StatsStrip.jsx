import React from 'react';

export default function StatsStrip() {
  return (
    <footer className="stats">
      {/* 1. Cellphone outline */}
      <div className="stat appear appear--stat" style={{ '--d': '1.12s' }}>
        <span className="stat-icon" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5" y="2" width="14" height="20" rx="3" />
            <line x1="10" y1="5" x2="14" y2="5" />
            <circle cx="12" cy="18" r="1" />
          </svg>
        </span>
        <span>Celulares para tu día a día</span>
      </div>

      {/* 2. Camera outline */}
      <div className="stat appear appear--stat" style={{ '--d': '1.28s' }}>
        <span className="stat-icon" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </span>
        <span>Tecnología para cada momento</span>
      </div>

      {/* 3. Location pin outline */}
      <div className="stat appear appear--stat" style={{ '--d': '1.44s' }}>
        <span className="stat-icon" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </span>
        <span>República Dominicana</span>
      </div>
    </footer>
  );
}

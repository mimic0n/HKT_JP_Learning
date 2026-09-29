import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import './StatsOverview.css';

export default function StatsOverview() {
  const [stats, setStats] = useState({
    totalWords: 0,
    dueToday: 0,
    mastered: 0,
    learning: 0,
    streakDays: 12
  });

  useEffect(() => {
    async function loadStats() {
      const res = await api.getStats();
      if (res.ok) {
        setStats(res.data.stats || res.data);
      }
    }
    loadStats();
  }, []);

  return (
    <section className="stats-section">
      <div className="stats-panel glass-panel washi-texture">
        <div className="stats-header">
          <div className="stats-header__info">
            <h2 className="headline-md">Learning Progress</h2>
          </div>
          <div className="stats-badge badge badge--n5">SM-2 Spaced Repetition</div>
        </div>

        <div className="stats-grid">
          <div className="stat-item stat-item--pink neo-lift">
            <div className="stat-item__value text-pink">{stats.dueToday}</div>
            <div className="stat-item__label">Today's Review</div>
          </div>

          <div className="stat-item stat-item--blue neo-lift">
            <div className="stat-item__value text-blue">{stats.totalWords}</div>
            <div className="stat-item__label">Total Vocabulary</div>
          </div>

          <div className="stat-item stat-item--green neo-lift">
            <div className="stat-item__value text-green">{stats.mastered}</div>
            <div className="stat-item__label">Mastered (Interval {'>'} 21d)</div>
          </div>

          <div className="stat-item stat-item--purple neo-lift">
            <div className="stat-item__value text-purple">{stats.streakDays}</div>
            <div className="stat-item__label">Daily Streak (Days)</div>
          </div>
        </div>
      </div>
    </section>
  );
}

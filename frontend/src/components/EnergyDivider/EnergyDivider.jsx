import React from 'react';
import './EnergyDivider.css';

export default function EnergyDivider() {
  return (
    <div className="energy-divider">
      <div className="energy-divider__line">
        <div className="energy-divider__glow animate-energy-sweep"></div>
      </div>
    </div>
  );
}

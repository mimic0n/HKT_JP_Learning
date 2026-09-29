import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import StatsOverview from '../components/StatsOverview/StatsOverview';
import FeaturesBento from '../components/FeaturesBento/FeaturesBento';
import QuickLinks from '../components/QuickLinks/QuickLinks';
import EnergyDivider from '../components/EnergyDivider/EnergyDivider';

export default function HomePage() {
  return (
    <main className="page-container flex-col gap-xxl">
      <HeroSection />
      <EnergyDivider />
      <StatsOverview />
      <EnergyDivider />
      <FeaturesBento />
      <EnergyDivider />
      <QuickLinks />
    </main>
  );
}


import React from 'react';
import Header from '../header/Header';
import Baseboard from '../baseboard/Baseboard';
import HeroSection from '../sessions/HeroSection';
import AboutSection from '../sessions/AboutSection';
import ServicesSection from '../sessions/ServicesSection';
import PortfolioSection from '../sessions/PortfolioSection';
import ContactSection from '../sessions/ContactSection';

const Home: React.FC = () => {
  return (
    <>
      <a href="#main" className="skip-to-main">
        Pular para o conteúdo principal
      </a>
      <Header />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Baseboard />
    </>
  );
};

export default Home;

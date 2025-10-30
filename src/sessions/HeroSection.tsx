import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import './HeroSection.css';

/**
 * HeroSection - Seção hero premium com design sofisticado
 * Animações elegantes, tipografia impactante e interações refinadas
 */
const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Parallax suave com mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      {/* Background decorativo com parallax */}
      <div
        className="hero-background"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) translateY(${scrollY * 0.3}px)`,
        }}
      />

      <div className="hero-container">
        {/* Nome com animação elegante */}
        <FadeIn delay={0.1} duration={1} distance={40}>
          <motion.h1
            className="hero-title"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          >
            <span className="hero-title-name">Rafael Munaro</span>
          </motion.h1>
        </FadeIn>

        {/* Subtítulo com linhas decorativas */}
        <FadeIn delay={0.3} duration={1}>
          <div className="hero-subtitle-wrapper">
            <div className="hero-subtitle-line" />
            <p className="hero-subtitle">Arquitetura & Design de Interiores</p>
            <div className="hero-subtitle-line" />
          </div>
        </FadeIn>

        {/* Descrição */}
        <FadeIn delay={0.5} duration={1}>
          <p className="hero-description">
            Transformando espaços em experiências únicas através de projetos personalizados
            que refletem sua personalidade e estilo de vida.
          </p>
        </FadeIn>

        {/* Scroll indicator elegante */}
        <motion.button
          className="scroll-indicator"
          onClick={scrollToNext}
          aria-label="Rolar para baixo"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{ scale: 1.1 }}
        >
          <ArrowDown size={24} className="scroll-icon" />
          <span className="scroll-text">Descubra mais</span>
        </motion.button>
      </div>

      {/* Decorative elements */}
      <div className="hero-decorative hero-decorative-left" />
      <div className="hero-decorative hero-decorative-right" />
    </section>
  );
};

export default HeroSection;

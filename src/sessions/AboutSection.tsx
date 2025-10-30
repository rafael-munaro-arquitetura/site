import React from 'react';
import { Award, Users, Lightbulb } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import './AboutSection.css';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section section">
      <div className="container">
        <FadeIn>
          <h2 className="section-title">Sobre Mim</h2>
        </FadeIn>

        <div className="about-content">
          <FadeIn delay={0.2}>
            <div className="about-text">
              <p>
                Sou <strong>Rafael Soares Munaro</strong>, arquiteto e designer de interiores 
                com paixão por criar espaços que inspiram e transformam a vida das pessoas.
              </p>
              <p>
                Com registro no CAU A231798-2, atuo nas regiões de Capivari, Americana, 
                Santa Bárbara D'Oeste e Piracicaba, levando projetos personalizados que 
                aliam funcionalidade, estética e sustentabilidade.
              </p>
              <p>
                Cada projeto é único e desenvolvido com atenção aos detalhes, respeitando 
                as necessidades e desejos de cada cliente para criar ambientes que 
                verdadeiramente fazem a diferença.
              </p>
            </div>
          </FadeIn>

          <div className="about-features">
            <FadeIn delay={0.3}>
              <div className="feature-card">
                <div className="feature-icon">
                  <Award size={32} />
                </div>
                <h3>Excelência</h3>
                <p>Compromisso com qualidade e atenção aos detalhes em cada projeto.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="feature-card">
                <div className="feature-icon">
                  <Users size={32} />
                </div>
                <h3>Personalização</h3>
                <p>Projetos únicos que refletem a personalidade de cada cliente.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="feature-card">
                <div className="feature-icon">
                  <Lightbulb size={32} />
                </div>
                <h3>Inovação</h3>
                <p>Soluções criativas e contemporâneas para espaços modernos.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

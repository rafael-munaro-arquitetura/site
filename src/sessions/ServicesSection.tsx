import React from 'react';
import { Home, Ruler, PenTool, Palette } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import './ServicesSection.css';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <Home size={40} />,
      title: 'Projetos Residenciais',
      description: 'Casas e apartamentos que refletem seu estilo de vida e personalidade.',
    },
    {
      icon: <Ruler size={40} />,
      title: 'Projetos Comerciais',
      description: 'Espaços comerciais funcionais e atrativos para seu negócio.',
    },
    {
      icon: <PenTool size={40} />,
      title: 'Reforma e Adequação',
      description: 'Transformação de espaços existentes com soluções criativas.',
    },
    {
      icon: <Palette size={40} />,
      title: 'Design de Interiores',
      description: 'Ambientes harmonizados com decoração e mobiliário exclusivo.',
    },
  ];

  return (
    <section id="services" className="services-section section">
      <div className="container">
        <FadeIn>
          <h2 className="section-title">Serviços</h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="services-intro">
            Oferecemos soluções completas em arquitetura e design de interiores, 
            atendendo desde o conceito inicial até a execução do projeto.
          </p>
        </FadeIn>

        <div className="services-grid">
          {services.map((service, index) => (
            <FadeIn key={index} delay={0.2 + index * 0.1}>
              <div className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

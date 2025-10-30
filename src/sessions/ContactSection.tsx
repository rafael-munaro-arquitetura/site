import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import './ContactSection.css';

/**
 * ContactSection - Seção de contato premium e minimalista
 * Design elegante com informações essenciais
 */
const ContactSection: React.FC = () => {
  const contactInfo = [
    {
      icon: <Phone size={28} />,
      label: 'Telefone',
      value: '(19) 99690-8104',
      link: 'tel:+5519996908104',
    },
    {
      icon: <Mail size={28} />,
      label: 'E-mail',
      value: 'contato@rafaelmunaroarquitetura.com',
      link: 'mailto:contato@rafaelmunaroarquitetura.com',
    },
    {
      icon: <MapPin size={28} />,
      label: 'Endereço',
      value: 'Rua Padre Fabiano, 1072, Centro - Capivari/SP',
      link: '',
    },
  ];

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <FadeIn>
          <h2 className="section-title">Entre em Contato</h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="contact-intro">
            Vamos transformar seu projeto em realidade
          </p>
        </FadeIn>

        <div className="contact-content-minimal">
          <FadeIn delay={0.3}>
            <div className="contact-info-minimal">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-item-icon">{info.icon}</div>
                  <div className="contact-item-content">
                    <span className="contact-item-label">{info.label}</span>
                    {info.link ? (
                      <a href={info.link} className="contact-item-value">
                        {info.value}
                      </a>
                    ) : (
                      <span className="contact-item-value">{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

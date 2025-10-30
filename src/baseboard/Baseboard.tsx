import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import './Baseboard.css';

const Baseboard: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="baseboard">
      <div className="baseboard-container">
        <div className="baseboard-content">
          <div className="baseboard-section">
            <h3>Rafael Munaro</h3>
            <p className="subtitle">Arquitetura e Design de Interiores</p>
            <p className="cau">CAU: A231798-2</p>
          </div>

          <div className="baseboard-section">
            <h4>Contato</h4>
            <div className="contact-info">
              <a href="tel:+5519996908104" className="contact-link">
                <Phone size={18} />
                <span>(19) 99690-8104</span>
              </a>
              <a href="mailto:contato@rafaelmunaroarquitetura.com" className="contact-link">
                <Mail size={18} />
                <span>contato@rafaelmunaroarquitetura.com</span>
              </a>
              <div className="contact-link">
                <MapPin size={18} />
                <span>Atendimento em Capivari-SP e região</span>
              </div>
            </div>
          </div>

          <div className="baseboard-section">
            <h4>Redes Sociais</h4>
            <div className="social-links">
              <a 
                href="https://www.instagram.com/rafaelmunaro.arq/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://www.facebook.com/rafael.munaro.2025" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://br.linkedin.com/in/rafael-soares-munaro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="baseboard-bottom">
          <p>&copy; {currentYear} Rafael Munaro Arquitetura. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Baseboard;

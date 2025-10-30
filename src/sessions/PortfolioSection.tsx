import React, { useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import Card from '../blocks/Card';
import './PortfolioSection.css';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

const PortfolioSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dados de exemplo - substituir com imagens reais
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: 'Residência Moderna',
      category: 'residencial',
      description: 'Projeto residencial com conceito minimalista e integração com a natureza.',
      image: '/placeholder-1.jpg',
    },
    {
      id: 2,
      title: 'Espaço Comercial',
      category: 'comercial',
      description: 'Design de interiores para loja conceito com foco na experiência do cliente.',
      image: '/placeholder-2.jpg',
    },
    {
      id: 3,
      title: 'Reforma Apartamento',
      category: 'reforma',
      description: 'Transformação completa de apartamento com otimização de espaços.',
      image: '/placeholder-3.jpg',
    },
    {
      id: 4,
      title: 'Casa de Campo',
      category: 'residencial',
      description: 'Projeto que valoriza materiais naturais e sustentabilidade.',
      image: '/placeholder-4.jpg',
    },
    {
      id: 5,
      title: 'Escritório Corporativo',
      category: 'comercial',
      description: 'Ambiente de trabalho moderno com espaços colaborativos.',
      image: '/placeholder-5.jpg',
    },
    {
      id: 6,
      title: 'Retrofit Residencial',
      category: 'reforma',
      description: 'Modernização de casa preservando elementos históricos.',
      image: '/placeholder-6.jpg',
    },
  ];

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'residencial', label: 'Residencial' },
    { id: 'comercial', label: 'Comercial' },
    { id: 'reforma', label: 'Reforma' },
  ];

  const filteredItems =
    filter === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === filter);

  const itemsPerPage = 3;
  const maxIndex = Math.max(0, filteredItems.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const openLightbox = (item: PortfolioItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="portfolio" className="portfolio-section section">
      <div className="container">
        <FadeIn>
          <h2 className="section-title">Portfólio</h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="portfolio-intro">
            Conheça alguns dos projetos que transformaram espaços em ambientes únicos e funcionais.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="portfolio-filters">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-button ${filter === category.id ? 'active' : ''}`}
                onClick={() => setFilter(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="portfolio-carousel-wrapper">
          <button 
            className="carousel-nav carousel-nav-prev" 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            aria-label="Anterior"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="portfolio-carousel">
            <div 
              className="portfolio-carousel-track"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {filteredItems.map((item, index) => (
                <div key={item.id} className="portfolio-carousel-item">
                  <Card variant="glass" className="portfolio-item" tiltEffect={false}>
                    <div className="portfolio-image-wrapper" onClick={() => openLightbox(item)}>
                      <div className="portfolio-image-placeholder">
                        <span className="portfolio-placeholder-text">{item.title}</span>
                      </div>
                      <div className="portfolio-overlay">
                        <ZoomIn size={32} />
                        <span>Ver Projeto</span>
                      </div>
                    </div>
                    <div className="portfolio-content">
                      <h3>{item.title}</h3>
                      <p className="portfolio-category">{item.category}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="carousel-nav carousel-nav-next" 
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            aria-label="Próximo"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        <div className="portfolio-indicators">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Fechar">
              <X size={32} />
            </button>
            <div className="lightbox-image-wrapper">
              <div className="lightbox-image-placeholder">
                <span className="portfolio-placeholder-text">{selectedItem.title}</span>
              </div>
            </div>
            <div className="lightbox-info">
              <h2>{selectedItem.title}</h2>
              <p className="lightbox-category">{selectedItem.category}</p>
              <p className="lightbox-description">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;

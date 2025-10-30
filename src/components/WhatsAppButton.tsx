import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

/**
 * WhatsAppButton - Botão flutuante premium do WhatsApp
 * Com animações sofisticadas e micro-interações elegantes
 */
const WhatsAppButton: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open(
      'https://api.whatsapp.com/send/?phone=5519996908104&text=Olá! Gostaria de solicitar um orçamento.',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <motion.button
      className="whatsapp-float-button"
      onClick={handleWhatsAppClick}
      aria-label="Abrir WhatsApp"
      title="Fale conosco no WhatsApp"
      whileHover={{
        scale: 1.1,
        y: -4,
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="whatsapp-icon-wrapper"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <MessageCircle size={28} className="whatsapp-icon" />
      </motion.div>

      <motion.span
        className="whatsapp-tooltip"
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        Me mande uma mensagem!
      </motion.span>

      {/* Ripple effect */}
      <motion.div
        className="whatsapp-ripple"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{
          scale: [0, 2],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    </motion.button>
  );
};

export default WhatsAppButton;

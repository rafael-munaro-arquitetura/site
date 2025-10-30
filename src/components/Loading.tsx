import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loading.css';

interface LoadingProps {
  onLoadingComplete?: () => void;
}

/**
 * Loading - Tela de carregamento premium e sofisticada
 * Design elegante com animações suaves
 */
const Loading: React.FC<LoadingProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simular carregamento com progressão natural
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExiting(true);
          setTimeout(() => {
            onLoadingComplete?.();
          }, 1000);
          return 100;
        }
        // Progressão mais rápida no início, mais lenta no final
        const increment = prev < 60 ? Math.random() * 20 : Math.random() * 5;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: 'blur(20px)',
          }}
          transition={{
            exit: {
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
        >
          {/* Background decorativo */}
          <div className="loading-background" />

          <div className="loading-content">
            {/* Logo com animação elegante */}
            <motion.div
              className="loading-logo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h1>Rafael Munaro</h1>
              <span>Arquitetura</span>
            </motion.div>

            {/* Barra de progresso sofisticada */}
            <motion.div
              className="loading-bar-wrapper"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="loading-bar-container">
                <motion.div
                  className="loading-bar"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                />
                <div className="loading-bar-glow" />
              </div>

              <motion.p
                className="loading-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {Math.floor(Math.min(progress, 100))}%
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;

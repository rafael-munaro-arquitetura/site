import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  distance?: number;
  scale?: boolean;
  blur?: boolean;
}

/**
 * FadeIn - Componente de animação sofisticado e profissional
 * Usa Framer Motion para animações suaves e performáticas
 */
const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  direction = 'up',
  className = '',
  distance = 30,
  scale = true,
  blur = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  // Se o usuário prefere movimento reduzido, usar animação simples
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scale: scale ? 0.95 : 1,
        filter: blur ? 'blur(8px)' : 'blur(0px)',
        ...directionOffset[direction]
      }}
      animate={isVisible ? {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
      } : {}}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Premium easing
        opacity: { duration: duration * 0.8 },
        filter: { duration: duration * 0.9 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;

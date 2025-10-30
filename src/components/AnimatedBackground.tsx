import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

/**
 * AnimatedBackground - Background sofisticado com gradientes suaves
 * Substitui as partículas infantis por um mesh gradient elegante e profissional
 */
const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar tamanho do canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Gradientes animados suaves - Mesh Gradient Effect
    const gradientOrbs: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      opacity: number;
    }> = [
      {
        x: canvas.width * 0.2,
        y: canvas.height * 0.3,
        radius: Math.min(canvas.width, canvas.height) * 0.4,
        vx: 0.15,
        vy: 0.1,
        color: '84, 89, 67', // Primary
        opacity: 0.15,
      },
      {
        x: canvas.width * 0.7,
        y: canvas.height * 0.6,
        radius: Math.min(canvas.width, canvas.height) * 0.35,
        vx: -0.12,
        vy: 0.08,
        color: '182, 108, 72', // Accent
        opacity: 0.12,
      },
      {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5,
        radius: Math.min(canvas.width, canvas.height) * 0.45,
        vx: 0.08,
        vy: -0.12,
        color: '155, 161, 135', // Primary Light
        opacity: 0.10,
      },
    ];

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Desenhar gradientes suaves e orgânicos
      gradientOrbs.forEach((orb, index) => {
        // Movimento suave e orgânico
        orb.x += orb.vx + Math.sin(time + index) * 0.3;
        orb.y += orb.vy + Math.cos(time + index * 0.7) * 0.3;

        // Manter orbs dentro da tela com margem
        const margin = orb.radius * 0.5;
        if (orb.x < -margin || orb.x > canvas.width + margin) orb.vx *= -1;
        if (orb.y < -margin || orb.y > canvas.height + margin) orb.vy *= -1;

        // Criar gradiente radial suave
        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );

        gradient.addColorStop(0, `rgba(${orb.color}, ${orb.opacity})`);
        gradient.addColorStop(0.5, `rgba(${orb.color}, ${orb.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="animated-background" />;
};

export default AnimatedBackground;

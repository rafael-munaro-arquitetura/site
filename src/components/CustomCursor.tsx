import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      cursorDot.style.transform = `translate(${x}px, ${y}px)`;
      cursorOutline.style.transform = `translate(${x}px, ${y}px)`;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    // Adicionar event listeners para elementos interativos
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"], .cursor-pointer'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  // Detectar se é dispositivo touch
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={cursorDotRef}
        className={`custom-cursor-dot ${isClicking ? 'clicking' : ''}`}
      />
      <div
        ref={cursorOutlineRef}
        className={`custom-cursor-outline ${isHovering ? 'hovering' : ''} ${
          isClicking ? 'clicking' : ''
        }`}
      />
    </>
  );
};

export default CustomCursor;

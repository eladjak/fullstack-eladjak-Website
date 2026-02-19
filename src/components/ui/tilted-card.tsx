'use client';

import { useRef, useState, useCallback } from 'react';

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  tiltStrength?: number;
  glare?: boolean;
}

interface TiltState {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
  isHovered: boolean;
}

export default function TiltedCard({
  children,
  className = '',
  tiltStrength = 10,
  glare = true,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      const halfW = rect.width / 2;
      const halfH = rect.height / 2;

      // Normalize to [-1, 1] then multiply by tiltStrength
      const rotateY = (offsetX / halfW) * tiltStrength;
      const rotateX = -(offsetY / halfH) * tiltStrength;

      // Glare position as percentage within the card
      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;

      setTilt({ rotateX, rotateY, glareX, glareY, isHovered: true });
    },
    [tiltStrength]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    });
  }, []);

  const transformStyle: React.CSSProperties = {
    transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
    transition: tilt.isHovered
      ? 'transform 0.15s ease-out'
      : 'transform 0.4s ease-out',
    willChange: 'transform',
    position: 'relative',
    transformStyle: 'preserve-3d',
  };

  const glareStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    opacity: tilt.isHovered ? 1 : 0,
    transition: tilt.isHovered ? 'opacity 0.15s ease-out' : 'opacity 0.4s ease-out',
    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)`,
    zIndex: 1,
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={transformStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glare && <div style={glareStyle} aria-hidden="true" />}
    </div>
  );
}

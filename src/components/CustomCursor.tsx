import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reducedMotion) return;
    setEnabled(true);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      requestAnimationFrame(animate);
    };

    const onHover = () => {
      ringRef.current?.classList.add('cursor-hover');
    };
    const onLeave = () => {
      ringRef.current?.classList.remove('cursor-hover');
    };

    const interactive = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMove);
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-primary-400 -translate-x-1/2 -translate-y-1/2"
        style={{ transition: 'opacity 0.2s' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full border border-primary-400/40 -translate-x-1/2 -translate-y-1/2 cursor-ring"
      />
      <style>{`
        .cursor-ring {
          transition: width 0.2s, height 0.2s, border-color 0.2s, background 0.2s;
        }
        .cursor-hover {
          width: 44px;
          height: 44px;
          border-color: rgba(139, 92, 246, 0.5);
          background: rgba(79, 140, 255, 0.08);
          margin-left: -8px;
          margin-top: -8px;
        }
        @media (pointer: coarse) {
          .cursor-ring, .cursor-dot { display: none; }
        }
      `}</style>
    </>
  );
}

import { useEffect, type RefObject } from 'react';

/**
 * Updates the scale of the given element (0 -> 1) as the page scrolls.
 * It writes to the DOM directly so scrolling never triggers a React re-render.
 */
export function useScrollProgress(barRef: RefObject<HTMLElement>): void {
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = barRef.current;
      if (!el) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(window.scrollY / totalHeight, 1) : 0;
      el.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [barRef]);
}

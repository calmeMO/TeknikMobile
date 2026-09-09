import { useEffect } from 'react';

/**
 * Custom hook to manage entrance animations and safety fallbacks.
 * 
 * 1. Listens for native `animationend` on `.appear` elements and adds `.is-in`.
 *    Filters out bubbled events from descendants so each element is marked on its own completion.
 * 2. Fallback after two requestAnimationFrames: checks each `.appear` element individually.
 *    If `getAnimations` is unavailable, throws, or element has no active animations,
 *    marks that element with `.is-in` immediately so nothing is ever left blank.
 * 3. Handles React Strict Mode and cleans up listeners and frames properly.
 */
export function useEntranceMotion(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Handle animationend on each individual element
    const handleAnimationEnd = (event) => {
      const target = event.target;
      if (target && target.classList && target.classList.contains('appear')) {
        target.classList.add('is-in');
      }
    };

    container.addEventListener('animationend', handleAnimationEnd);

    // Two requestAnimationFrames fallback check
    let frameId1 = null;
    let frameId2 = null;

    frameId1 = requestAnimationFrame(() => {
      frameId2 = requestAnimationFrame(() => {
        const appearElements = container.querySelectorAll('.appear');
        appearElements.forEach((el) => {
          if (el.classList.contains('is-in')) return;

          let hasActiveAnimation = false;
          try {
            if (typeof el.getAnimations === 'function') {
              const animations = el.getAnimations();
              // Check if any animation is active or pending
              hasActiveAnimation = animations.some(
                (anim) => anim.playState === 'running' || anim.playState === 'pending'
              );
            }
          } catch {
            hasActiveAnimation = false;
          }

          // If no active animation was found (e.g. reduced motion, missing keyframe, or unsupported)
          if (!hasActiveAnimation) {
            el.classList.add('is-in');
          }
        });
      });
    });

    return () => {
      container.removeEventListener('animationend', handleAnimationEnd);
      if (frameId1) cancelAnimationFrame(frameId1);
      if (frameId2) cancelAnimationFrame(frameId2);
    };
  }, [containerRef]);
}

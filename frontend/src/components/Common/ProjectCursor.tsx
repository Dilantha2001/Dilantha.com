import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './ProjectCursor.css';

export default function ProjectCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isDarkBadge, setIsDarkBadge] = useState(false);

  useEffect(() => {
    // Only run on devices with fine pointer (mouse/trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial GSAP properties (perfectly stable, no rotation)
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 0,
      pointerEvents: 'none',
      force3D: true,
    });

    // High performance smooth follower using GSAP quickTo
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.22, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.22, ease: 'power3' });

    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Update position smoothly
      xTo(clientX);
      yTo(clientY);

      // Check if mouse is over a project card / media element
      const target = e.target as HTMLElement | null;
      const projectCard = target?.closest('.recent-work-card, .works-project-card, .card-media-wrapper, [data-project-card]');

      if (projectCard) {
        // If in the horizontal Works section (white background), switch to black circle with white text
        const isHorizontalWorks = !!projectCard.closest('.works-section');
        setIsDarkBadge(isHorizontalWorks);

        if (!isVisible) {
          isVisible = true;
          gsap.to(cursor, {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: 'back.out(1.7)',
            overwrite: 'auto',
          });
        }
      } else {
        if (isVisible) {
          isVisible = false;
          gsap.to(cursor, {
            scale: 0,
            opacity: 0,
            duration: 0.22,
            ease: 'power3.in',
            overwrite: 'auto',
          });
        }
      }
    };

    const handleMouseDown = () => {
      if (isVisible) {
        gsap.to(cursor, {
          scale: 0.88,
          duration: 0.15,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseUp = () => {
      if (isVisible) {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.25,
          ease: 'back.out(2)',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div ref={cursorRef} className="project-custom-cursor" aria-hidden="true">
      <div className={`cursor-circle ${isDarkBadge ? 'theme-black-bg' : 'theme-white-bg'}`}>
        <div className="cursor-content">
          <span className="cursor-word">EXPLORE</span>
          <div className="cursor-sub-row">
            <span className="cursor-word">MORE</span>
            <span className="cursor-arrow">↗</span>
          </div>
        </div>
      </div>
    </div>
  );
}

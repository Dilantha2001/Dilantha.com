import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import * as SiIcons from 'react-icons/si';
import { TECH_STACK } from '../../data/portfolioData';
import './Technologies.css';

gsap.registerPlugin(ScrollTrigger);

// Ensure proper icon matching for items with authentic brand colors
const getTechIcon = (iconName?: string, color?: string) => {
  if (iconName && (SiIcons as any)[iconName]) {
    const IconComp = (SiIcons as any)[iconName];
    return <IconComp size={24} style={{ color: color || 'inherit' }} />;
  }
  return null;
};

export default function Technologies() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Left Column entrance
    if (leftColRef.current) {
      gsap.fromTo(
        leftColRef.current.children,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Right Column Tech Items Stagger Entrance
    const items = gsap.utils.toArray('.tech-item-row') as HTMLElement[];
    if (items.length) {
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 35,
          scale: 0.96,
          force3D: true,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section id="technologies" ref={sectionRef} className="technologies-section">
      <div className="technologies-container">
        
        {/* Left Column: Heading & Summary */}
        <div ref={leftColRef} className="technologies-left">
          <div className="tech-tag-row">
            <span className="tech-tag-text">STACK & TOOLING</span>
          </div>
          <h2 className="tech-heading">
            Technologies <br />
            <span className="tech-heading-accent">I work with</span>
          </h2>
          <p className="tech-desc">
            A modern and scalable technology stack spanning performant UI engineering, robust APIs, distributed caching, and machine learning pipelines.
          </p>
        </div>

        {/* Right Column: 2-Column Tech Grid */}
        <div ref={rightColRef} className="technologies-right">
          {TECH_STACK.map((t, i) => {
            const icon = getTechIcon(t.iconName, t.color);
            return (
              <div 
                key={i} 
                className="tech-item-row group"
                style={{ '--brand-color': t.color } as React.CSSProperties}
              >
                {icon && (
                  <span 
                    className="tech-icon-box"
                    style={{ color: t.color }}
                  >
                    {icon}
                  </span>
                )}
                <span className={`tech-name ${t.font}`}>{t.name}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

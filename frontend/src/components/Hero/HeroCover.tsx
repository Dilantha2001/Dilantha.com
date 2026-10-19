import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import heroaImg from '../../assets/heroa.jpg';
// @ts-ignore
import TechText from '../Common/TechText';
import './HeroCover.css';

gsap.registerPlugin(ScrollTrigger);

interface HeroCoverProps {
  isEntered?: boolean;
}

export default function HeroCover({ isEntered = true }: HeroCoverProps) {
  const containerRef = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const topChunkRef = useRef<HTMLDivElement>(null);
  const leftChunkRef = useRef<HTMLDivElement>(null);
  const rightChunkRef = useRef<HTMLDivElement>(null);

  const [techFontSize, setTechFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 380) return 38;
      if (window.innerWidth < 480) return 46;
      if (window.innerWidth < 768) return 72;
      if (window.innerWidth < 1024) return 105;
      return 150;
    }
    return 150;
  });

  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth < 380) setTechFontSize(38);
      else if (window.innerWidth < 480) setTechFontSize(46);
      else if (window.innerWidth < 768) setTechFontSize(72);
      else if (window.innerWidth < 1024) setTechFontSize(105);
      else setTechFontSize(150);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1. PINNED SCROLL TRIGGER (Created on mount so DOM layout & pin spacer are rock solid from start)
  useGSAP(() => {
    if (!containerRef.current) return;

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        id: 'hero-cover-scroll',
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        anticipatePin: 1,
        refreshPriority: 10,
        invalidateOnRefresh: true,
      }
    });

    scrollTl
      // Background subtle parallax scale
      .to(
        bgImgRef.current,
        {
          scale: 1.08,
          ease: 'power1.out',
          duration: 1.0,
        },
        0
      )
      // Top text ("NEXT-GEN") glides upward gracefully
      .to(
        topChunkRef.current,
        {
          yPercent: -130,
          y: -40,
          opacity: 0,
          filter: 'blur(14px)',
          scale: 0.94,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        0.15
      )
      // Left text ("DIGITAL") glides outward to the left smoothly
      .to(
        leftChunkRef.current,
        {
          xPercent: -130,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 0.8,
          ease: 'power2.inOut',
        },
        0.15
      )
      // Right text ("SOLUTION") glides outward to the right smoothly
      .to(
        rightChunkRef.current,
        {
          xPercent: 130,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 0.8,
          ease: 'power2.inOut',
        },
        0.15
      )
      // Atmospheric bottom shadow deepens gently
      .to(
        '.hero-cover-bottom-fade',
        {
          opacity: 0.95,
          duration: 0.7,
          ease: 'power1.out',
        },
        0.15
      )
      // Buffer space: After text has completely drifted out, 2nd page rolls in cleanly
      .to({}, { duration: 0.35 });

  }, { scope: containerRef });

  // 2. HERO COVER ENTRANCE (Plays smoothly when preloader completes)
  useGSAP(() => {
    if (!containerRef.current) return;

    if (!isEntered) {
      gsap.set(['.hero-cover-top-shadow', '.hero-cover-bottom-fade'], {
        opacity: 0,
      });
      gsap.set('.hero-cover-center-stage', {
        opacity: 0,
        y: 45,
        filter: 'blur(12px)',
      });
      if (bgImgRef.current) {
        gsap.set(bgImgRef.current, { scale: 1 });
      }
      return;
    }

    const buildTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Optical atmospheric overlays bloom in seamlessly
    buildTl.to(
      ['.hero-cover-top-shadow', '.hero-cover-bottom-fade'],
      { opacity: 1, duration: 0.9, ease: 'power2.out' },
      0
    );

    // Center Stage ("NEXT-GEN DIGITAL SOLUTIONS") glides up with silky cinematic easing
    buildTl.to(
      '.hero-cover-center-stage',
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
      },
      0.12
    );

    // Refresh ScrollTriggers once entrance completes
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => clearTimeout(refreshTimer);

  }, { scope: containerRef, dependencies: [isEntered] });

  return (
    <section 
      ref={containerRef} 
      id="hero-cover" 
      className="hero-cover-container" 
      aria-label="Portfolio Hero Cover"
    >
      {/* Fullscreen Cinematic Background with heroa.jpg */}
      <div className="hero-cover-bg-wrap">
        <img
          ref={bgImgRef}
          src={heroaImg}
          alt="Dilantha"
          className="hero-cover-bg-img"
          loading="eager"
        />
        {/* Subtle optical gradient overlays */}
        <div className="hero-cover-top-shadow" />
        <div className="hero-cover-bottom-fade" />
      </div>

      {/* Center Giant Typographic Showcase Positioned at the Bottom */}
      <div className="hero-cover-center-stage">
        <div className="hero-cover-title-container">
          {/* Top line: "NEXT-GEN" */}
          <div ref={topChunkRef} className="hero-cover-title-row-top" style={{ height: 'clamp(40px, 11vw, 180px)' }}>
            <TechText
              text="NEXT-GEN"
              fontWeight={900}
              fontSize={techFontSize}
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={6}
              fontFamily="Inter, sans-serif"
              color="#0052ff"
              accentColor="#0052ff"
              letterSpacing={-0.055}
              reach={180}
              softness={0.7}
              strokeWidth={1.5}
              speed={0.8}
              lineStyle="dashed"
              selection
              labels={false}
              draggable={false}
              sweep={isMobile}
            />
          </div>

          {/* Bottom line: "DIGITAL SOLUTION" */}
          <div className="hero-cover-title-row-bottom">
            {/* Left letters: "DIGITAL" */}
            <div ref={leftChunkRef} className="hero-cover-title-chunk left">
              <span className="hero-cover-white-text">DIGITAL</span>
            </div>

            {/* Right letters: "SOLUTION" */}
            <div ref={rightChunkRef} className="hero-cover-title-chunk right">
              <span className="hero-cover-white-text">SOLUTIONS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

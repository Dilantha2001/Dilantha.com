import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Hero2.css';
import heroVideo from '../../assets/hero.mp4';
// @ts-ignore
import TechText from '../Common/TechText';
import SlotText from '../Common/SlotText';

gsap.registerPlugin(ScrollTrigger);

const Hero2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const leftChunkRef = useRef<HTMLDivElement>(null);
  const rightChunkRef = useRef<HTMLDivElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const squareBoxRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const topChunkRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger: Split at the two S's (IMPOS <-> SIBLE) & zoom video into fullscreen
  useGSAP(() => {
    if (!containerRef.current || !heroRef.current || !videoFrameRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: heroRef.current,
        pinSpacing: false,
        scrub: 1.2,
        anticipatePin: 1,
      }
    });

    // 1. Text splits & vanishes: "NEXT-GEN" moves upwards out of screen, "DIGITAL" goes left, "SOLUTION" goes right + UI fades
    tl.to(
      topChunkRef.current,
      {
        yPercent: -160,
        y: -100,
        opacity: 0,
        filter: 'blur(16px)',
        scale: 0.92,
        duration: 0.4,
        ease: 'power2.inOut',
      },
      0
    )
    .to(
      leftChunkRef.current,
      {
        xPercent: -150,
        opacity: 0,
        filter: 'blur(12px)',
        duration: 0.35,
        ease: 'power2.inOut',
      },
      0
    )
    .to(
      rightChunkRef.current,
      {
        xPercent: 150,
        opacity: 0,
        filter: 'blur(12px)',
        duration: 0.35,
        ease: 'power2.inOut',
      },
      0
    )
    .to(
      [bottomLeftRef.current, bottomBarRef.current],
      {
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: 'power2.in',
      },
      0
    )
    .to(
      shadowRef.current,
      {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out',
      },
      0
    )

    // 2. Background smoothly morphs to dark and wave image floats out
    .to(
      [heroRef.current, containerRef.current],
      {
        backgroundColor: '#08080a',
        duration: 0.5,
        ease: 'power2.inOut',
      },
      0.05
    )
    .to(
      ['.hero2-grid-bg', '.hero2-wave-wrap'],
      {
        opacity: 0,
        y: -60,
        duration: 0.4,
        ease: 'power2.out',
      },
      0.05
    )

    // 3. Center Video expands & zooms in center
    .to(
      videoFrameRef.current,
      {
        width: '82vw',
        height: '78vh',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        borderRadius: '24px',
        duration: 0.45,
        ease: 'power2.inOut',
      },
      0
    )
    .to(
      squareBoxRef.current,
      {
        borderRadius: '24px',
        borderWidth: 0,
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
        duration: 0.45,
        ease: 'power2.inOut',
      },
      0
    )
    .to(
      videoRef.current,
      {
        scale: 1.15,
        duration: 0.5,
        ease: 'power1.out',
      },
      0
    )

    // 4. Smooth Exit: Instead of abruptly vanishing, the video smoothly shrinks down, floats up and fades away!
    .to(
      videoFrameRef.current,
      {
        scale: 0.6,
        yPercent: -75,
        opacity: 0,
        filter: 'blur(20px)',
        borderRadius: '36px',
        duration: 0.45,
        ease: 'power2.inOut',
      },
      0.65
    )
    .to(
      squareBoxRef.current,
      {
        opacity: 0,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0)',
        duration: 0.4,
        ease: 'power2.in',
      },
      0.68
    );

    // Clean 2D Card Hover Interaction (No 3D distortion, zero RAM lag)
    const cardEl = videoFrameRef.current;
    const handleCardMouseEnter = () => {
      if (!squareBoxRef.current) return;
      const progress = tl.progress();
      if (progress > 0.08) return;

      gsap.to(squareBoxRef.current, {
        scale: 1.04,
        boxShadow: '0 20px 45px -10px rgba(0, 82, 255, 0.25), 0 10px 25px rgba(0, 0, 0, 0.35)',
        borderColor: 'rgba(0, 82, 255, 0.6)',
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      if (shadowRef.current) {
        gsap.to(shadowRef.current, {
          scale: 1.08,
          opacity: 0.8,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    const handleCardMouseLeave = () => {
      if (squareBoxRef.current) {
        gsap.to(squareBoxRef.current, {
          scale: 1,
          boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.35)',
          borderColor: 'rgba(255, 255, 255, 0.22)',
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
      if (shadowRef.current) {
        gsap.to(shadowRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    if (cardEl) {
      cardEl.addEventListener('mouseenter', handleCardMouseEnter);
      cardEl.addEventListener('mouseleave', handleCardMouseLeave);
    }

    // Smoothly fade out the pinned hero section as AboutMe slides over
    gsap.to(heroRef.current, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    return () => {
      if (cardEl) {
        cardEl.removeEventListener('mouseenter', handleCardMouseEnter);
        cardEl.removeEventListener('mouseleave', handleCardMouseLeave);
      }
    };

  }, { scope: containerRef });


  const scrollToNext = () => {
    const nextEl = containerRef.current?.nextElementSibling as HTMLElement;
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 1.5, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="hero2-scroll-container">
      <section ref={heroRef} className="hero2-wrapper">
        {/* Flowing 2D Strand Image */}
        <div className="hero2-wave-wrap" id="wave">
          <img 
            src="https://cdn.shopify.com/s/files/1/0185/5999/1872/files/blue_strand_transparent.png?v=1778949964" 
            alt="Flowing blue strand" 
            onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
          />
        </div>

        {/* Decorative Top Bar to fix empty space */}
        <div className="hero2-decorative-top">
          <SlotText text="DILANTHA" className="hero2-brand-name" />
          <span className="hero2-tagline">DIGITAL PORTFOLIO © {new Date().getFullYear()}</span>
        </div>

        {/* Center Giant Typographic Showcase with Video positioned between DEVEL and OPER */}
        <div className="hero2-center-stage">
          <div className="hero2-title-container">
            {/* Top line: "NEXT-GEN" */}
            <div ref={topChunkRef} className="hero2-title-row-top" style={{ height: 'clamp(80px, 15vw, 200px)' }}>
              <TechText
                text="NEXT-GEN"
                fontWeight={900}
                fontSize={150}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                fontFamily="Inter, sans-serif"
                color="#0052ff"
                accentColor="#0052ff"
                letterSpacing={-0.055}
                reach={200}
                softness={0.7}
                strokeWidth={1.5}
                speed={1}
                lineStyle="dashed"
                selection
                labels
                draggable
                sweep
              />
            </div>

            {/* Bottom line: "DIGITAL EXPERIENCE" */}
            <div className="hero2-title-row-bottom">
              {/* Left letters: "DIGITAL" */}
              <div ref={leftChunkRef} className="hero2-title-chunk left">
                <span className="hero2-black-text">DIGITAL</span>
              </div>

              {/* Right letters: "EXPERIENCE" */}
              <div ref={rightChunkRef} className="hero2-title-chunk right">
                <span className="hero2-black-text">SOLUTION</span>
              </div>
            </div>
          </div>

          {/* Clean Center Square Video Box - Positioned right in the middle between the two S's */}
          <div 
            ref={videoFrameRef}
            className="hero2-video-frame-container"
          >
            {/* Soft Floor Shadow */}
            <div ref={shadowRef} className="hero2-video-shadow" />

            {/* Clean Square Box Frame */}
            <div ref={squareBoxRef} className="hero2-square-box">
              <video
                ref={videoRef}
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="hero2-center-video"
              />
            </div>
          </div>
        </div>

        {/* Bottom Left Quotation / Philosophy */}
        <div ref={bottomLeftRef} className="hero2-bottom-left">
          <p className="hero2-quote-primary">architecting scalable systems and seamless user experiences.</p>
          <p className="hero2-quote-secondary">turning complex problems into elegant solutions.</p>
        </div>

        {/* Bottom Bar Info / Ticker */}
        <div ref={bottomBarRef} className="hero2-bottom-bar">
          <div className="hero2-tagline">
            <span>FULL-STACK ENGINEERING, CLOUD ARCHITECTURE & MODERN WEB EXPERIENCES</span>
          </div>

          <button onClick={scrollToNext} className="hero2-scroll-indicator" aria-label="Scroll down">
            <span className="hero2-index">000</span>
            <span className="hero2-scroll-text">SCROLL TO INSPECT</span>
            <span className="hero2-arrow">↓</span>
          </button>
        </div>

       

        
      </section>
    </div>
  );
};

export default Hero2;

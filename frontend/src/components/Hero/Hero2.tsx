import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Hero2.css';
import heroVideo from '../../assets/hero.mp4';
import { MdWavingHand } from 'react-icons/md';

gsap.registerPlugin(ScrollTrigger);

const Hero2 = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const leftChunkRef = useRef<HTMLDivElement>(null);
  const rightChunkRef = useRef<HTMLDivElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const squareBoxRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger: Split at the two S's (IMPOS <-> SIBLE) & zoom video into fullscreen
  useGSAP(() => {
    if (!containerRef.current || !heroRef.current || !videoFrameRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        pin: heroRef.current,
        scrub: 1.2,
        anticipatePin: 1,
      }
    });

    // 1. Text splits directly between the two S's ("IMPOS" goes left, "SIBLE" goes right) + UI fades
    tl.to(
      leftChunkRef.current,
      {
        xPercent: -150,
        opacity: 0,
        filter: 'blur(12px)',
        duration: 0.45,
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
        duration: 0.45,
        ease: 'power2.inOut',
      },
      0
    )
    .to(
      [headerRef.current, bottomLeftRef.current, bottomBarRef.current],
      {
        opacity: 0,
        y: (i) => (i === 0 ? -40 : 40),
        duration: 0.35,
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

    // 2. Video frame expands and zooms + background smoothly morphs to About section dark color (#08080a)
    .to(
      [heroRef.current, containerRef.current],
      {
        backgroundColor: '#08080a',
        duration: 0.7,
        ease: 'power2.inOut',
      },
      0.05
    )
    .to(
      '.hero2-grid-bg',
      {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      },
      0.05
    )
    .to(
      videoFrameRef.current,
      {
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        margin: 0,
        borderRadius: 0,
        duration: 0.65,
        ease: 'power2.inOut',
      },
      0.12
    )
    .to(
      squareBoxRef.current,
      {
        borderRadius: 0,
        borderWidth: 0,
        boxShadow: 'none',
        duration: 0.65,
        ease: 'power2.inOut',
      },
      0.12
    )
    .to(
      videoRef.current,
      {
        scale: 1.15,
        duration: 0.7,
        ease: 'power1.out',
      },
      0.15
    );

  }, { scope: containerRef });

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

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
        {/* Background Subtle Architectural Grid */}
        <div className="hero2-grid-bg" />

        {/* Top Navigation */}
        <header ref={headerRef} className="hero2-header">
          <div className="hero2-brand">
            <span className="hero2-brand-name">DILANTHA RANAWEERA</span>
            
          </div>

          <nav className="hero2-nav">
            <a href="#about" className="hero2-nav-link">ABOUT</a>
            <a href="#works" className="hero2-nav-link">PROJECTS</a>
            <a href="#services" className="hero2-nav-link">SERVICES</a>
            <a href="#contact" className="hero2-nav-btn">
              <MdWavingHand className="hero2-hand-icon" />
              <span>LET&apos;S TALK</span>
            </a>
          </nav>
        </header>

        {/* Center Giant Typographic Showcase with Video positioned between the two 'S' letters */}
        <div className="hero2-center-stage">
          <div className="hero2-title-container">
            {/* Left 5 letters: "IMPOS" (ends with the first 'S') */}
            <div ref={leftChunkRef} className="hero2-title-chunk left">
              <span className="hero2-im-text">IM</span>
              <span className="hero2-black-text">POS</span>
            </div>

            {/* Right 5 letters: "SIBLE" (starts with the second 'S') */}
            <div ref={rightChunkRef} className="hero2-title-chunk right">
              <span className="hero2-black-text">SIBLE</span>
            </div>
          </div>

          {/* Clean Center Square Video Box - Positioned right in the middle between the two S's */}
          <div 
            ref={videoFrameRef}
            className="hero2-video-frame-container"
            onClick={toggleVideo}
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
          <p className="hero2-quote-primary">there are probably things we simply cannot do.</p>
          <p className="hero2-quote-secondary">we are not sure of that.</p>
        </div>

        {/* Bottom Bar Info / Ticker */}
        <div ref={bottomBarRef} className="hero2-bottom-bar">
          <div className="hero2-tagline">
            <span>VISUAL COMMUNICATIONS, SOFTWARE ENGINEERING & DIGITAL EXPERIENCES</span>
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

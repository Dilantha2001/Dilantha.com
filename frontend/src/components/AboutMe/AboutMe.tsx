import { useRef } from 'react';
import './AboutMe.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import profileImg from '../../assets/profile.jpg';
import profile2Img from '../../assets/profile2.png';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  { 
    id: 'projects', 
    target: 800, 
    prefix: '', 
    suffix: '+', 
    isDecimal: false, 
    line1: 'PROJECTS', 
    line2: 'DELIVERED' 
  },
  { 
    id: 'satisfaction', 
    target: 99, 
    prefix: '', 
    suffix: '%', 
    isDecimal: false, 
    line1: 'CLIENT', 
    line2: 'SATISFACTION RATE' 
  },
  { 
    id: 'rating', 
    target: 4.8, 
    prefix: '', 
    suffix: '*', 
    isDecimal: true, 
    line1: 'STAR AVERAGE', 
    line2: 'RATING' 
  },
  { 
    id: 'experience', 
    target: 5, 
    prefix: '0', 
    suffix: '+', 
    isDecimal: false, 
    line1: 'YEARS OF', 
    line2: 'EXPERIENCE' 
  },
];

export default function AboutMe() {
  const containerRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bigTitleRef = useRef<HTMLHeadingElement>(null);
  const statsDeckRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo(
      portraitRef.current,
      { opacity: 0, x: -40, filter: 'blur(8px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }
    )
    .fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(
      bigTitleRef.current,
      { opacity: 0, x: 40, letterSpacing: '0.15em' },
      { opacity: 1, x: 0, letterSpacing: '0.04em', duration: 1.0, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo(
      '.meet-about-section .editorial-stat-item',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out' },
      '-=0.6'
    );

    // Modern GSAP Number Counter Animations with ScrollTrigger
    statsData.forEach((stat, index) => {
      const el = statRefs.current[index];
      if (!el) return;
      const obj = { count: 0 };
      
      gsap.to(obj, {
        count: stat.target,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (stat.isDecimal) {
            el.textContent = `${obj.count.toFixed(1)}${stat.suffix}`;
          } else {
            const val = Math.floor(obj.count);
            const displayVal = stat.prefix && val < 10 ? `${stat.prefix}${val}` : `${val}`;
            el.textContent = `${displayVal}${stat.suffix}`;
          }
        },
      });
    });

  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="meet-about-section">
      {/* Top Header Bar */}
      <div className="meet-about-header">
        <div className="meet-about-brand-tag">
          <div className="brand-tag-row">
            <span>Dilantha</span>
            <span className="brand-tag-divider">Portfolio</span>
          </div>
          <div className="brand-tag-row">
            <span>Ranaweera</span>
            <span className="brand-tag-divider">2026</span>
          </div>
        </div>

        <div className="meet-about-nav-crumb">
          <span className="crumb-dim">HOME</span>
          <span className="crumb-slash">/</span>
          <span className="crumb-active">ABOUT</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="meet-about-body">
        {/* Left Column: Clear High-Resolution Portrait */}
        <div ref={portraitRef} className="meet-about-portrait-wrapper">
          <div className="meet-about-portrait-card">
            <img 
              src={profileImg || profile2Img} 
              alt="Dilantha Ranaweera"
              className="meet-about-portrait-img"
            />
          </div>
        </div>

        {/* Center Column: Bio and Experience */}
        <div ref={contentRef} className="meet-about-content">
          {/* Block 1: Role & Story */}
          <div className="meet-about-block">
            <span className="meet-about-subtag">A 24 y.o</span>
            <h2 className="meet-about-hero-title">
              CREATIVE FULL-STACK<br />
              DEVELOPER
            </h2>
            <p className="meet-about-mono-desc">
              with a passion for developing functional and beautiful web
              experiences. At 16 in 2018, his interest in software development was
              piqued by a fascination with why websites had to be more than a
              platform to display information. Curiosity quickly turned into a
              career of developing web applications that are not just beautiful but
              also scalable, interactive and engaging.
            </p>
          </div>

          {/* Block 2: Experience & Tech Acquired */}
          <div className="meet-about-block secondary">
            <span className="meet-about-subtag">Having more than</span>
            <h3 className="meet-about-hero-title">
              4+ YEARS OF<br />
              HANDS-ON EXPERIENCE
            </h3>
            <p className="meet-about-mono-subtext">
              he has acquired a variety of technologies that includes modern frontend, robust backend architectures, distributed cloud systems, and AI integration.
            </p>
          </div>
        </div>

        {/* Right Column: Title & Modern Editorial Counters Grid */}
        <div className="meet-about-right-col">
          <div className="meet-about-big-title-col">
            <h1 ref={bigTitleRef} className="meet-about-big-title">
              MEET DILANTHA
            </h1>
          </div>

          <div ref={statsDeckRef} className="meet-about-stats-deck">
            <div className="stats-deck-header">
              <span className="stats-deck-dot"></span>
              <span className="stats-deck-title">// TRACK RECORD & METRICS</span>
            </div>

            {/* Clean Modern Editorial 2x2 Stats Grid */}
            <div className="editorial-stats-grid">
              {statsData.map((stat, idx) => (
                <div key={stat.id} className="editorial-stat-item">
                  <div className="stat-num-wrap">
                    <span
                      ref={(el) => {
                        statRefs.current[idx] = el;
                      }}
                      className="editorial-stat-number"
                    >
                      {stat.isDecimal ? `0.0${stat.suffix}` : `${stat.prefix}0${stat.suffix}`}
                    </span>
                  </div>
                  <div className="stat-label-wrap">
                    <span className="editorial-stat-label-line">{stat.line1}</span>
                    <span className="editorial-stat-label-line">{stat.line2}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

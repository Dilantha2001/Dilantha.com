import { useRef } from 'react';
import './AboutMe.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import profileImg from '../../assets/profile.jpg';
import profile2Img from '../../assets/profile2.png';
import LogoMarquee from '../LogoMarquee/LogoMarquee';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  { 
    id: 'projects', 
    target: 10, 
    prefix: '', 
    suffix: '+', 
    isDecimal: false, 
    line1: 'PROJECTS', 
    line2: 'DELIVERED' 
  },
  { 
    id: 'satisfaction', 
    target: 100, 
    prefix: '', 
    suffix: '%', 
    isDecimal: false, 
    line1: 'CLIENT', 
    line2: 'SATISFACTION' 
  },
  { 
    id: 'rating', 
    target: 5.0, 
    prefix: '', 
    suffix: '★', 
    isDecimal: true, 
    line1: 'STAR AVERAGE', 
    line2: 'RATING' 
  },
  { 
    id: 'experience', 
    target: 4, 
    prefix: '0', 
    suffix: '+', 
    isDecimal: false, 
    line1: 'YEARS OF', 
    line2: 'EXPERIENCE' 
  },
];


export default function AboutMe() {
  const containerRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
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
      statementRef.current,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
    )
    .fromTo(
      portraitRef.current,
      { opacity: 0, x: -40, filter: 'blur(8px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
      '-=0.7'
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

    // Modern GSAP Number Counter Animations with ScrollTrigger on statsDeckRef
    statsData.forEach((stat, index) => {
      const el = statRefs.current[index];
      if (!el) return;
      const obj = { count: 0 };
      
      gsap.to(obj, {
        count: stat.target,
        duration: 2.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsDeckRef.current || containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
        onUpdate: () => {
          if (stat.isDecimal) {
            el.textContent = obj.count.toFixed(1);
          } else {
            const val = Math.floor(obj.count);
            const displayVal = stat.prefix && val < 10 ? `${stat.prefix}${val}` : `${val}`;
            el.textContent = `${displayVal}`;
          }
        },
        onComplete: () => {
          if (stat.isDecimal) {
            el.textContent = stat.target.toFixed(1);
          } else {
            el.textContent = stat.prefix && stat.target < 10 ? `${stat.prefix}${stat.target}` : `${stat.target}`;
          }
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="meet-about-section">
      
      {/* Main Grid: Left Portrait + Right Content Deck (Aligned at Top Level of Image) */}
      <div className="meet-about-container">
        
        {/* Left Column: High-Resolution Portrait Card */}
        <div ref={portraitRef} className="meet-about-portrait-wrapper">
          <div className="meet-about-portrait-card">
            <img 
              src={profileImg || profile2Img} 
              alt="Dilantha Ranaweera"
              className="meet-about-portrait-img"
            />
          </div>
        </div>

        {/* Right Main Column: Starts at exact top level with Image */}
        <div className="meet-about-right-main">
          
          {/* 1. Full-Width Statement Headline Across Right Column */}
          <div ref={statementRef} className="meet-about-statement-banner">
            <h2 className="meet-about-statement-title">
              <span className="statement-highlight-blue">Product design</span> for complex systems that feel obvious
            </h2>
          </div>

          {/* 2. Full-Width Bio Story Block */}
          <div ref={contentRef} className="meet-about-bio-banner">
            <span className="meet-about-subtag">A 24 y.o Engineer</span>
            <p className="meet-about-mono-desc">
              with a passion for developing functional and beautiful web
              experiences. At 16 in 2018, his interest in software development was
              piqued by a fascination with why websites had to be more than a
              platform to display information. Curiosity quickly turned into a
              career of developing web applications that are not just beautiful but
              also scalable, interactive and engaging.
            </p>
          </div>

          {/* 3. Bottom Deck: MEET DILANTHA + Experience & Stats Grid */}
          <div className="meet-about-right-col">
            
            {/* Header Row: MEET DILANTHA on left, 4+ Years Experience on right */}
            <div className="meet-about-right-header-row">
              <div className="meet-about-big-title-col">
                <h1 ref={bigTitleRef} className="meet-about-big-title">
                  MEET DILANTHA
                </h1>
              </div>

              {/* Experience & Background directly to the right of MEET DILANTHA */}
              <div className="meet-about-block secondary exp-header-block">
                <span className="meet-about-subtag">Having more than</span>
                <h3 className="meet-about-secondary-title">
                  <span style={{ color: '#0052ff' }}>4+ YEARS OF</span> HANDS-ON EXP
                </h3>
                <p className="meet-about-mono-subtext">
                  he has acquired a variety of technologies that includes modern frontend, robust backend architectures, distributed cloud systems, and AI integration.
                </p>
              </div>
            </div>

            <div ref={statsDeckRef} className="meet-about-stats-deck">
              {/* Clean Modern Glassmorphism 2x2 Stats Grid */}
              <div className="editorial-stats-grid">
                {statsData.map((stat, idx) => (
                  <div key={stat.id} className="editorial-stat-item">
                    <div className="stat-card-glow"></div>
                    <div className="stat-num-wrap">
                      <span
                        ref={(el) => {
                          statRefs.current[idx] = el;
                        }}
                        className="editorial-stat-number"
                      >
                        {stat.isDecimal ? `0.0` : `${stat.prefix}0`}
                      </span>
                      <span className="stat-blue-suffix">{stat.suffix}</span>
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

      </div>

      {/* Bottom Full-Width Logo Marquee attached to About Section */}
      <div className="meet-about-marquee-wrapper">
        <LogoMarquee />
      </div>
    </section>
  );
}

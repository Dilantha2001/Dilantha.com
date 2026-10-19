import { useRef } from 'react';
import './AboutMe.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import heroVideo from '../../assets/hero.mp4';
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


const renderStatementWords = (text: string, isBlue: boolean) => {
  return text.split(' ').map((word, wIdx) => (
    <span
      key={`${isBlue ? 'b' : 'd'}-w-${wIdx}`}
      className={`statement-word ${isBlue ? 'statement-word-blue' : 'statement-word-dark'}`}
    >
      {word}&nbsp;
    </span>
  ));
};

export default function AboutMe() {
  const containerRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bigTitleRef = useRef<HTMLHeadingElement>(null);
  const statsDeckRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Set hardware accelerated properties
    gsap.set([statementRef.current, contentRef.current, bigTitleRef.current, '.meet-about-section .editorial-stat-item'], {
      force3D: true,
    });

    // 1. Smooth Editorial Scroll-scrubbed reveal for the statement headline
    const words = statementRef.current?.querySelectorAll('.statement-word');
    if (words && words.length > 0) {
      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 6,
          filter: 'blur(3px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.04,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: statementRef.current,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: 1.2,
            invalidateOnRefresh: true,
          }
        }
      );
    }

    // 2. Entrance timeline for other AboutMe elements
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
        invalidateOnRefresh: true,
      }
    });

    tl.fromTo(
      portraitRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo(
      contentRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(
      bigTitleRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(
      '.meet-about-section .editorial-stat-item',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' },
      '-=0.4'
    );

    // Modern GSAP Number Counter Animations with ScrollTrigger on statsDeckRef
    statsData.forEach((stat, index) => {
      const el = statRefs.current[index];
      if (!el) return;
      const obj = { count: 0 };
      
      gsap.fromTo(
        obj,
        { count: 0 },
        {
          count: stat.target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsDeckRef.current || containerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
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
        }
      );
    });

    // 3. FULL-SCREEN VIDEO SCROLL EXPANSION (GSAP Scrub)
    if (portraitRef.current && videoCardRef.current) {
      const zoomTl = gsap.timeline({
        scrollTrigger: {
          id: 'about-video-zoom',
          trigger: portraitRef.current,
          start: 'center 50%',
          end: () => '+=' + Math.round(window.innerHeight * 1.5),
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
          refreshPriority: 8,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            if (portraitRef.current) {
              portraitRef.current.style.zIndex = self.isActive ? '900' : '40';
            }
          },
        }
      });

      const getTargetX = () => {
        if (!portraitRef.current) return 0;
        const rect = portraitRef.current.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        return (window.innerWidth / 2) - cardCenterX;
      };

      const getTargetY = () => {
        if (!portraitRef.current) return 0;
        const rect = portraitRef.current.getBoundingClientRect();
        const cardCenterY = rect.top + rect.height / 2;
        return (window.innerHeight / 2) - cardCenterY;
      };

      const getTargetScale = () => {
        if (!videoCardRef.current) return 1;
        const unscaledW = videoCardRef.current.offsetWidth || 380;
        const unscaledH = videoCardRef.current.offsetHeight || 214;
        const isMobile = window.innerWidth <= 768;
        // Widescreen coverage: expand wider horizontally to the sides
        const maxW = window.innerWidth * (isMobile ? 0.96 : 0.95);
        const maxH = window.innerHeight * (isMobile ? 0.92 : 0.92);
        const scaleX = maxW / unscaledW;
        const scaleY = maxH / unscaledH;
        return Math.min(scaleX, scaleY);
      };

      zoomTl
        // Surrounding text & stats & bottom logo marquee & top header fade out completely
        .to(
          [
            '.meet-about-header',
            bigTitleRef.current,
            '.exp-header-block',
            statementRef.current,
            contentRef.current,
            statsDeckRef.current,
            marqueeRef.current,
          ],
          {
            autoAlpha: 0,
            y: -25,
            duration: 0.25,
            ease: 'power1.out',
          },
          0
        )
        // Background remains pure clean white (#ffffff)
        .to(
          containerRef.current,
          {
            backgroundColor: '#ffffff',
            boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
            duration: 0.3,
            ease: 'power1.out',
          },
          0
        )
        // Video card scales up from small card to ~90% of screen and glides to center with ZERO borders
        .to(
          videoCardRef.current,
          {
            x: getTargetX,
            y: getTargetY,
            scale: getTargetScale,
            borderRadius: 0,
            boxShadow: '0 30px 100px rgba(0, 0, 0, 0.18)',
            border: 'none',
            borderWidth: 0,
            borderColor: 'transparent',
            outline: 'none',
            autoAlpha: 1,
            zIndex: 900,
            duration: 0.45,
            ease: 'power1.inOut',
            force3D: true,
          },
          0
        )
        // Hold full-screen video PINNED at full opacity for comfortable viewing
        .to({}, { duration: 0.55 })
        // On next scroll: video's size visibly decreases (scale drops) and opacity fades out!
        .to(
          videoCardRef.current,
          {
            scale: () => getTargetScale() * 0.45, // Noticeable size decrease!
            borderRadius: 24, // corners gently round as it recedes into distance
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
            autoAlpha: 0,
            duration: 0.4,
            ease: 'power2.inOut',
            force3D: true,
          }
        );
    }

  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="meet-about-section">
      
      {/* Main Grid: Left Column (Headers + Bottom Video) + Right Column (Statement + Bio + Stats) */}
      <div className="meet-about-container">
        
        {/* Left Column: Titles on Top, Small 16:9 Video on Bottom */}
        <div className="meet-about-left-col">
          <div className="meet-about-left-top">
            <h1 ref={bigTitleRef} className="meet-about-big-title">
              MEET DILANTHA
            </h1>

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

          {/* Small Horizontal Rectangle Video at Bottom Left */}
          <div ref={portraitRef} className="meet-about-video-wrapper">
            <div ref={videoCardRef} className="meet-about-video-card">
              <video
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="meet-about-video-player"
              />
            </div>
          </div>
        </div>

        {/* Right Main Column: Statement + Bio + Stats */}
        <div className="meet-about-right-main">
          
          {/* 1. Full-Width Statement Headline Across Right Column */}
          <div ref={statementRef} className="meet-about-statement-banner">
            <p className="meet-about-statement-para">
              {renderStatementWords("A thousand lines of complex logic,", true)}
              {renderStatementWords("crafted to disappear behind a single, obvious click. Great software isn't just about what is built—it is about how effortlessly it breathes in the user's hands.", false)}
            </p>
            <p className="meet-about-statement-para">
              {renderStatementWords("Bridging resilient engineering with fluid visual storytelling,", true)}
              {renderStatementWords("turning complex architectures into intuitive digital realities that feel fast, deliberate, and undeniably human.", false)}
            </p>
          </div>

          {/* 2. Full-Width Bio Story Block */}
          <div ref={contentRef} className="meet-about-bio-banner">
            <span className="meet-about-subtag">A 24 y.o Developer</span>
            <p className="meet-about-mono-desc">
              with a passion for developing functional and beautiful web
              experiences. At 16 in 2022, his interest in software development was
              piqued by a fascination with why websites had to be more than a
              platform to display information. Curiosity quickly turned into a
              career of developing web applications that are not just beautiful but
              also scalable, interactive and engaging.
            </p>
          </div>

          {/* 3. Modern Stats Grid */}
          <div ref={statsDeckRef} className="meet-about-stats-deck">
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

      {/* Bottom Full-Width Logo Marquee attached to About Section */}
      <div ref={marqueeRef} className="meet-about-marquee-wrapper">
        <LogoMarquee />
      </div>
    </section>
  );
}

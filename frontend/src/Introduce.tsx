import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Introduce.css';

gsap.registerPlugin(ScrollTrigger);

function Introduce() {
  const containerRef = useRef<HTMLElement>(null);
  const qRef = useRef<gsap.utils.SelectorFunc | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Create a selector scoped to the container
    const q = gsap.utils.selector(containerRef);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        end: 'bottom 25%',
        toggleActions: 'play none none reverse',
      }
    });

    // 1. Animate the main quote text with a GLITCH effect
    tl.fromTo(q('.quote-text span'), 
      { opacity: 0, scale: 1.1, skewX: 20, filter: 'blur(5px)' },
      { 
        opacity: 1, 
        scale: 1, 
        skewX: 0, 
        filter: 'blur(0px)',
        duration: 0.1, 
        stagger: 0.1,
      }
    )
    .to(q('.quote-text span'), {
      x: () => Math.random() * 10 - 5,
      y: () => Math.random() * 10 - 5,
      skewX: () => Math.random() * 10 - 5,
      duration: 0.05,
      yoyo: true,
      repeat: 3,
      stagger: 0.1,
    })
    .to(q('.quote-text span'), {
      x: 0,
      y: 0,
      skewX: 0,
      duration: 0.1,
    })
    // 2. Animate the brush stroke (width expansion)
    .from(q('.brush-stroke-intro'), {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.4')
    // 3. Animate subtext
    .from(q('.intro-subtext'), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6')
    // 4. Animate stats staggered
    .from(q('.stat-item'), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.2)',
    }, '-=0.6')
    // 5. Animate right sidebar elements
    .from(q('.intro-right > *'), {
      x: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=1.2');

    // 6. Number counter animation
    const counters = q('.count');
    counters.forEach((counter) => {
      const targetStr = counter.getAttribute('data-target');
      if (targetStr) {
        const target = parseInt(targetStr, 10);
        let dummy = { val: 0 };
        tl.to(dummy, {
          val: target,
          duration: 2,
          ease: 'power3.out',
          onUpdate: () => {
            counter.innerHTML = Math.ceil(dummy.val).toString();
          }
        }, '-=1.5');
      }
    });

  }, { scope: containerRef });

  const renderRulerMarks = (isVertical: boolean) => {
    const marks = [];
    for (let i = 100; i <= 2500; i += 100) {
      marks.push(
        <div key={i} className={`ruler-mark ${isVertical ? 'vertical' : 'horizontal'}`} style={isVertical ? { top: `${i}px` } : { left: `${i}px` }}>
          <span className="ruler-num">{i}</span>
        </div>
      );
    }
    return marks;
  };

  return (
    <section className="introduce" ref={containerRef}>
     
      <div className="intro-content">
        <div className="intro-left">
          <div className="quote-container" style={{ paddingTop: '40px' }}>
            <h1 className="quote-text">
              <span className="cream-text glitch" data-text="MAKE IT WORK," style={{ display: 'inline-block' }}>MAKE IT WORK,</span><br/>
              <span className="red-text glitch" data-text="THEN MAKE IT WEIRD..." style={{ display: 'inline-block' }}>THEN MAKE IT WEIRD...</span>
            </h1>
            <div className="brush-stroke-intro"></div>
          </div>
          
          <div className="intro-subtext">
            THEMES ON WORDPRESS.ORG SINCE 2015 — THE SOURCE IS PUBLIC.
          </div>

          <div className="stats-container">
            <div className="stat-item arrow-stat">↗</div>
            <div className="stat-item">
              <span className="stat-num"><span className="count" data-target="14">0</span>+</span>
              <span className="stat-label">YEARS<br/>WEB</span>
            </div>
            <div className="stat-item">
              <span className="stat-num"><span className="count" data-target="500">0</span>+</span>
              <span className="stat-label">TEMPLATES<br/>ELEMENTOR</span>
            </div>
            <div className="stat-item">
              <span className="stat-num"><span className="count" data-target="200">0</span>+</span>
              <span className="stat-label">THEMES<br/>WORDPRESS</span>
            </div>
          </div>
        </div>

        <div className="intro-right">
          <div className="right-header">
            <h2 className="right-name"><span className="name-cream">Dilantha</span> <span className="name-red">Dev</span></h2>
            <div className="right-subtitle">CODE / MOTION / WEBGL</div>
          </div>

          <div className="social-icons">
            <span className="icon-box">in</span>
            <span className="icon-box">W</span>
            <span className="icon-box">Be</span>
            <span className="icon-box">🏀</span>
            <span className="icon-box">P</span>
          </div>

          <p className="bio-text">
            Frontend Developer | WordPress Developer<br/>
            JavaScript, PHP, WebGL, GSAP, Three.js
          </p>

          <div className="location-info">
            <span>📍 BASED IN HUNGARY</span>
            <span>🌐 WORKING WORLDWIDE</span>
          </div>

          <nav className="right-nav-menu">
            <ul>
              <li><span className="nav-num">01</span> INTRODUCE</li>
              <li><span className="nav-num">02</span> SKILLS</li>
              <li><span className="nav-num">03</span> WORKS</li>
              <li><span className="nav-num">04</span> AWARDS</li>
              <li><span className="nav-num">05</span> CONTACT</li>
            </ul>
          </nav>

          <div className="portrait-box">
            <div className="portrait-label">PORTRAIT / 01</div>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" 
              alt="Daniel Kiss Portrait" 
            />
          </div>

          <div className="email-box">
            <span>info@danielkiss.hu</span>
            <span className="email-icon">✉</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Introduce;

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import profileImage from './assets/profile.jpg';
import colorImage from './assets/color.jpg';
import './Introduce.css'; // For the glitch text styles

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const containerRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const baseImageRef = useRef<HTMLImageElement>(null);
  const colorImageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageContainerRef.current || !imageRef.current) return;
    const words = gsap.utils.toArray('.about-word');
    const q = gsap.utils.selector(containerRef);
    
    // Create a master timeline that pins the entire section
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2500', // How long the pin lasts
        pin: true,
        scrub: 1,
      }
    });

    // 1. Image Reveal (first thing that happens)
    masterTl.fromTo(imageContainerRef.current, 
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power3.inOut' }
    )
    .fromTo(imageRef.current,
      { scale: 1.2, y: 100 },
      { scale: 1, y: 0, duration: 0.5, ease: 'power3.inOut' },
      "<" // Synchronize with clipPath
    );

    // 2. About Me Text Typing (happens along with the image)
    // We add the textStart label at time 0 so it plays in parallel
    masterTl.add('textStart', 0.1); // Small 0.1s offset so the image just starts moving first
    
    masterTl.fromTo(q('.about-heading'),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
      'textStart'
    );

    words.forEach((word: any, i) => {
      masterTl.fromTo(word, 
        { opacity: 0, color: '#df1b3f' }, 
        { opacity: 1, color: '#111111', duration: 0.1, ease: 'none' },
        `textStart+=${i * 0.05 + 0.3}` // Stagger the typing slightly after the heading
      );
    });

    // 3. Glitch text and stats animation (happens after text typing)
    masterTl.add('quoteStart', '+=0.5');

    masterTl.fromTo(q('.quote-text span'), 
      { opacity: 0, scale: 1.1, skewX: 20, filter: 'blur(5px)' },
      { opacity: 1, scale: 1, skewX: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.2 },
      'quoteStart'
    )
    .from(q('.intro-subtext'), { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, 'quoteStart+=0.3')
    .from(q('.stat-item'), { y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.2)' }, 'quoteStart+=0.5');

    // 4. Number counters
    const counters = q('.count');
    counters.forEach((counter) => {
      const targetStr = counter.getAttribute('data-target');
      if (targetStr) {
        const target = parseInt(targetStr, 10);
        let dummy = { val: 0 };
        masterTl.to(dummy, {
          val: target,
          duration: 1.5,
          ease: 'power1.out',
          onUpdate: () => {
            counter.innerHTML = Math.ceil(dummy.val).toString();
          }
        }, 'quoteStart+=0.5');
      }
    });

  }, { scope: containerRef });

  const text = "I am a passionate Full-Stack Web Developer, specializing in crafting unforgettable digital experiences that bring your vision to life through modern web technologies and clean design.";
  
  return (
    <section ref={containerRef} className="w-full bg-white flex flex-col md:flex-row relative overflow-hidden" style={{ minHeight: '100vh' }}>
      
      {/* Left Side: Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 z-10 py-32">
        <div className="max-w-xl">
          <h4 className="about-heading text-[#df1b3f] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-10 flex items-center gap-4 opacity-0">
            <span className="w-12 h-[1px] bg-[#df1b3f] inline-block"></span>
            About Me
          </h4>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light leading-[1.5] tracking-tight mb-14">
            {text.split(' ').map((word, i) => (
              <span key={i} className="about-word inline-block mr-[0.25em] transition-colors duration-200 opacity-0">
                {word}
              </span>
            ))}
          </h2>
          
          <div className="intro-left pt-10 border-t border-gray-100">
            <div className="quote-container">
              <h1 className="quote-text text-3xl md:text-4xl lg:text-5xl font-bold leading-tight uppercase tracking-tighter" style={{ fontFamily: 'Impact, sans-serif' }}>
                <span className="cream-text glitch" data-text="MAKE IT WORK," style={{ display: 'inline-block', color: '#111' }}>MAKE IT WORK,</span><br/>
                <span className="red-text glitch" data-text="THEN MAKE IT WEIRD..." style={{ display: 'inline-block', color: '#df1b3f' }}>THEN MAKE IT WEIRD...</span>
              </h1>
            </div>
            
            <div className="intro-subtext  text-xs md:text-sm text-gray-500 font-bold tracking-widest uppercase">
              THEMES ON WORDPRESS.ORG SINCE 2015 — THE SOURCE IS PUBLIC.
            </div>

            <div className="stats-container  grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="stat-item text-left">
                <span className="stat-num text-3xl lg:text-4xl font-bold text-[#111] block mb-2"><span className="count" data-target="14">0</span>+</span>
                <span className="stat-label text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">YEARS<br/>WEB</span>
              </div>
              <div className="stat-item text-left">
                <span className="stat-num text-3xl lg:text-4xl font-bold text-[#111] block mb-2"><span className="count" data-target="500">0</span>+</span>
                <span className="stat-label text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">TEMPLATES<br/>ELEMENTOR</span>
              </div>
              <div className="stat-item text-left hidden md:block">
                <span className="stat-num text-3xl lg:text-4xl font-bold text-[#111] block mb-2"><span className="count" data-target="200">0</span>+</span>
                <span className="stat-label text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">THEMES<br/>WORDPRESS</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Right Side: Full Height Image */}
      <div 
        className="w-full md:w-1/2 h-[60vh] md:h-auto relative overflow-hidden cursor-crosshair group" 
        ref={imageContainerRef}
        onMouseEnter={() => {
          // Mask Reveal from Left to Right
          gsap.to(colorImageRef.current, {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1.05,
            duration: 2.0,
            ease: 'power2.inOut'
          });
          // Also slightly scale the base image
          gsap.to(baseImageRef.current, {
            scale: 1.05,
            duration: 2.0,
            ease: 'power2.inOut'
          });
        }}
        onMouseLeave={() => {
          gsap.to(colorImageRef.current, {
            clipPath: 'inset(0% 100% 0% 0%)',
            scale: 1,
            duration: 2.0,
            ease: 'power2.inOut'
          });
          gsap.to(baseImageRef.current, {
            scale: 1,
            duration: 2.0,
            ease: 'power2.inOut'
          });
        }}
      >
        <div className="absolute inset-0 bg-black/10 z-20 pointer-events-none transition-colors duration-500 group-hover:bg-transparent"></div>
        <div ref={imageRef} className="absolute inset-0 w-full h-full origin-bottom pointer-events-none">
          {/* Base Image (B&W or original) */}
          <img 
            ref={baseImageRef}
            src={profileImage} 
            alt="Dilantha Profile" 
            className="absolute inset-0 w-full h-full object-cover object-[center_10%]"
          />
          {/* Hover Image (Color) revealed via Mask Reveal Left-to-Right */}
          <img 
            ref={colorImageRef}
            src={colorImage} 
            alt="Dilantha Profile Color" 
            className="absolute top-0 left-0 w-full h-full object-cover object-[center_10%]"
            style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
          />
        </div>
      </div>

    </section>
  );
}

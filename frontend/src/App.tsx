import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import Hero from './Hero';
import Introduce from './Introduce';
import FooterIntroduce from './FooterIntroduce';
import Works from './Works';
import Feedback from './Feedback';
import Footer from './Footer';
import './App.css';

gsap.registerPlugin(Observer, ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Smokio Rapper Web",
    subtitle: "PORTFOLIO • JAN 2024 • WEB DEV & DESIGN",
    color: "#df1b3f", 
    bgColor: "#111111", 
    url: "https://wondrous-zuccutto-2cd2ce.netlify.app/"
  },
  {
    id: 2,
    title: "Photography Website",
    subtitle: "GALLERY • AUG 2023 • UI/UX DESIGN",
    color: "#0077b6", 
    bgColor: "#e2ece9", 
    url: "https://comfy-medovik-ee1f2a.netlify.app/"
  },
  {
    id: 3,
    title: "Interactive Preview 1",
    subtitle: "INTERACTIVE • MAR 2023 • FRONTEND",
    color: "#2a9d8f", 
    bgColor: "#dcedc1", 
    url: "https://ornate-monstera-997a7d.netlify.app/"
  },
  {
    id: 4,
    title: "Interactive Preview 2",
    subtitle: "PREVIEW • DEC 2022 • EXPERIMENTAL",
    color: "#e07a5f", 
    bgColor: "#ffe5d9", 
    url: "https://melodic-smakager-33f3b9.netlify.app/"
  }
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8, // Heavy, buttery smooth scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const slides = gsap.utils.toArray('.slide') as HTMLElement[];
    let localIndex = 0;
    let isAnimating = false;

    gsap.set(slides, { opacity: 0, pointerEvents: 'none' });
    gsap.set(slides[0], { opacity: 1, pointerEvents: 'auto' });
    
    slides.forEach((slide, i) => {
      if (i !== 0) {
        gsap.set(slide.querySelector('.title-wrapper'), { y: 100, opacity: 0 });
        gsap.set(slide.querySelector('.image-wrapper'), { y: -200, opacity: 0 });
      } else {
        gsap.set(slide.querySelector('.title-wrapper'), { y: 0, opacity: 1 });
        gsap.set(slide.querySelector('.image-wrapper'), { y: 0, opacity: 1 });
      }
    });

    const gotoSlide = (newIndex: number, direction: number) => {
      if (isAnimating) return;
      isAnimating = true;

      const currentSlide = slides[localIndex];
      const nextSlide = slides[newIndex];

      const currentTitle = currentSlide.querySelector('.title-wrapper');
      const currentImage = currentSlide.querySelector('.image-wrapper');
      
      const nextTitle = nextSlide.querySelector('.title-wrapper');
      const nextImage = nextSlide.querySelector('.image-wrapper');

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(currentSlide, { opacity: 0, pointerEvents: 'none' });
          localIndex = newIndex;
          setCurrentIndex(newIndex);
          isAnimating = false;
        }
      });

      gsap.set(nextSlide, { opacity: 1, pointerEvents: 'auto' });

      if (direction === 1) {
        tl.to(currentTitle, { y: -100, opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0)
          .to(currentImage, { y: 200, opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0)
          .fromTo(nextTitle, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 0.3)
          .fromTo(nextImage, { y: -200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "bounce.out" }, 0.2);
      } else {
        tl.to(currentTitle, { y: 100, opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0)
          .to(currentImage, { y: -200, opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0)
          .fromTo(nextTitle, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 0.3)
          .fromTo(nextImage, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2);
      }
    };

    const intentObserver = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => {
        if (!isAnimating) {
          if (localIndex > 0) {
            gotoSlide(localIndex - 1, -1);
          } else {
            // Reached top, scroll back to Hero naturally
            intentObserver.disable();
            window.scrollBy({ top: -100, behavior: 'smooth' }); 
            setTimeout(() => intentObserver.enable(), 1000); 
          }
        }
      },
      onUp: () => {
        if (!isAnimating) {
          if (localIndex < slides.length - 1) {
            gotoSlide(localIndex + 1, 1);
          } else {
            // Reached bottom of slides, let native scroll take over to go to next section
            intentObserver.disable();
            window.scrollBy({ top: 100, behavior: 'smooth' }); 
            setTimeout(() => intentObserver.enable(), 1000); 
          }
        }
      },
      tolerance: 20
    });
    
    intentObserver.disable(); // Disabled initially

    ScrollTrigger.create({
      trigger: sliderContainerRef.current,
      start: "top top",
      end: "+=100%", // arbitrary end
      pin: true,
      refreshPriority: 3,
      onEnter: () => intentObserver.enable(),
      onLeave: () => intentObserver.disable(),
      onEnterBack: () => intentObserver.enable(),
      onLeaveBack: () => intentObserver.disable(),
    });

    return () => {
      intentObserver.kill();
    };

  }, { scope: sliderContainerRef });

  const currentProject = projects[currentIndex] || projects[0];
  const currentColor = currentProject.color;
  const currentBgColor = currentProject.bgColor;

  return (
    <div className="main-wrapper">
      <Hero />
      <Introduce />
      
      <div className="layout" style={{ color: currentColor, backgroundColor: currentBgColor }} ref={sliderContainerRef}>
        <header className="header">
          <div className="logo-box">
            <div className="logo-text">JOHN GEARHART</div>
            <div className="logo-sub">ジョン・ギアハート</div>
          </div>
          <div className="catalog-link">CATALOG VIEW</div>
        </header>

        <div className="fixed-ui">
          <div className="side-nav left-nav">
            <div className="lines">
              {projects.map((p, i) => (
                <span 
                  key={p.id} 
                  className={`line ${i === currentIndex ? 'active' : ''}`}
                  style={{ backgroundColor: i === currentIndex ? currentColor : 'currentColor' }}
                ></span>
              ))}
            </div>
            <div className="bottom-links">
              <a href="#about" className="nav-link active">ABOUT</a>
              <a href="#connect" className="nav-link">LET'S CONNECT</a>
            </div>
          </div>

          <div className="side-nav right-nav">
             <div className="nominee-badge">
               <div className="w-icon">W.</div>
               <div className="nominee-text">Nominee</div>
             </div>
             <div className="scroll-icon">
               <div className="mouse"></div>
             </div>
          </div>
        </div>

        <div className="slider-container">
          {projects.map((project) => (
            <div className="slide" key={project.id}>
              
              <div className="title-section title-wrapper">
                <h1 className="main-title">{project.title}</h1>
                <div className="subtitles">
                  <span>{project.subtitle.split(' • ')[0]}</span>
                  <span className="dot">•</span>
                  <span>{project.subtitle.split(' • ')[1]}</span>
                  <span className="dot">•</span>
                  <span>{project.subtitle.split(' • ')[2]}</span>
                </div>
              </div>

              <div className="project-showcase">
                <div className="image-container image-wrapper" style={{ backgroundColor: project.color }}>
                  <div className="iframe-scroller-container">
                    <iframe 
                      src=""
                      className="scrolling-iframe" 
                      title={project.title}
                    />
                  </div>
                  <div className="explore-btn">EXPLORE</div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
      <Works />
      <FooterIntroduce />
      <Feedback />
      <Footer />
    </div>
  )
}

export default App;

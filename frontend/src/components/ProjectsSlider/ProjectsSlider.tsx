import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PORTFOLIO_INFO } from '../../data/portfolioData';
import './ProjectsSlider.css';

gsap.registerPlugin(ScrollTrigger);

const colorPalette = [
  { color: "#df1b3f", bgColor: "#08080a" },
  { color: "#0077b6", bgColor: "#e2ece9" },
  { color: "#2a9d8f", bgColor: "#dcedc1" },
  { color: "#e07a5f", bgColor: "#ffe5d9" },
  { color: "#9b5de5", bgColor: "#f1e3ff" },
  { color: "#f15bb5", bgColor: "#ffe1f1" },
  { color: "#00bbf9", bgColor: "#e1f8ff" },
  { color: "#00f5d4", bgColor: "#d7fff9" },
];

const projects = PORTFOLIO_INFO.projects.slice(0, 5).map((p: any, index: number) => {
  const palette = colorPalette[index % colorPalette.length];
  const dateStr = p.date || "RECENT";
  return {
    id: p.id || index,
    title: p.title,
    subtitle: `${p.tags?.[0]?.toUpperCase() || 'PROJECT'} • ${dateStr.toUpperCase()} • ${p.tags?.[1]?.toUpperCase() || 'DEV'}`,
    color: palette.color,
    bgColor: palette.bgColor,
    url: p.href,
    image: p.image
  };
});

export default function ProjectsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sliderContainerRef.current) return;
    const slides = gsap.utils.toArray('.projects-slider-layout .slide') as HTMLElement[];
    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    let activeIndex = 0;

    // Set initial slide states
    slides.forEach((slide, i) => {
      if (i === 0) {
        gsap.set(slide, { opacity: 1, pointerEvents: 'auto', zIndex: 10 });
        gsap.set(slide.querySelector('.title-wrapper'), { y: 0, opacity: 1 });
        gsap.set(slide.querySelector('.image-wrapper'), { y: 0, opacity: 1, scale: 1 });
      } else {
        gsap.set(slide, { opacity: 0, pointerEvents: 'none', zIndex: 1 });
        gsap.set(slide.querySelector('.title-wrapper'), { y: 80, opacity: 0 });
        gsap.set(slide.querySelector('.image-wrapper'), { y: -220, opacity: 0, scale: 0.95 });
      }
    });

    const gotoSlide = (newIndex: number, direction: number) => {
      if (newIndex === activeIndex) return;
      const currentSlide = slides[activeIndex];
      const nextSlide = slides[newIndex];
      activeIndex = newIndex;
      setCurrentIndex(newIndex);

      const currentTitle = currentSlide.querySelector('.title-wrapper');
      const currentImage = currentSlide.querySelector('.image-wrapper');
      const nextTitle = nextSlide.querySelector('.title-wrapper');
      const nextImage = nextSlide.querySelector('.image-wrapper');

      gsap.killTweensOf([currentTitle, currentImage, nextTitle, nextImage]);

      gsap.set(slides, { zIndex: 1 });
      gsap.set(currentSlide, { zIndex: 5 });
      gsap.set(nextSlide, { zIndex: 10, opacity: 1, pointerEvents: 'auto' });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(currentSlide, { opacity: 0, pointerEvents: 'none' });
        }
      });

      if (direction >= 0) {
        tl.to(currentTitle, { y: -80, opacity: 0, duration: 0.45, ease: "power2.inOut" }, 0)
          .to(currentImage, { y: 160, opacity: 0, duration: 0.45, ease: "power2.inOut" }, 0)
          .fromTo(nextTitle, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, 0.2)
          .fromTo(nextImage, { y: -220, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: "bounce.out" }, 0.15);
      } else {
        tl.to(currentTitle, { y: 80, opacity: 0, duration: 0.45, ease: "power2.inOut" }, 0)
          .to(currentImage, { y: -160, opacity: 0, duration: 0.45, ease: "power2.inOut" }, 0)
          .fromTo(nextTitle, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, 0.2)
          .fromTo(nextImage, { y: 220, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: "power2.out" }, 0.15);
      }
    };

    const scrollDistance = (totalSlides - 1) * 650;

    ScrollTrigger.create({
      trigger: sliderContainerRef.current,
      start: 'top top',
      end: () => `+=${scrollDistance}`,
      pin: true,
      onUpdate: (self) => {
        const rawIdx = self.progress * (totalSlides - 1);
        const targetIdx = Math.min(totalSlides - 1, Math.max(0, Math.round(rawIdx)));
        if (targetIdx !== activeIndex) {
          const dir = targetIdx > activeIndex ? 1 : -1;
          gotoSlide(targetIdx, dir);
        }
      }
    });

  }, { scope: sliderContainerRef });

  const handleDotClick = (index: number) => {
    if (!sliderContainerRef.current) return;
    const totalSlides = projects.length;
    const st = ScrollTrigger.getAll().find(s => s.trigger === sliderContainerRef.current);
    if (st) {
      const targetPos = st.start + (index / (totalSlides - 1)) * (st.end - st.start);
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(targetPos, { duration: 1 });
      } else {
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }
  };

  const currentProject = projects[currentIndex] || projects[0];
  const currentColor = currentProject.color;
  const currentBgColor = currentProject.bgColor;

  return (
    <section 
      id="works"
      className="projects-slider-layout relative z-10" 
      style={{ color: currentColor, backgroundColor: currentBgColor }} 
      ref={sliderContainerRef}
    >
      <header className="slider-header">
        <div className="logo-box">
          <div className="logo-text">DILANTHA RANAWEERA</div>
        </div>
      </header>

      <div className="fixed-ui">
        <div className="side-nav left-nav">
          <div className="lines">
            {projects.map((p: any, i: number) => (
              <span 
                key={p.id} 
                onClick={() => handleDotClick(i)}
                className={`line cursor-pointer ${i === currentIndex ? 'active' : ''}`}
                style={{ backgroundColor: i === currentIndex ? currentColor : 'currentColor' }}
              ></span>
            ))}
          </div>
        </div>

        <div className="side-nav right-nav">
          <div className="scroll-icon">
            <div className="mouse"></div>
          </div>
        </div>
      </div>

      <div className="slider-container">
        {projects.map((project: any) => (
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
                <div className="iframe-scroller-container flex items-center justify-center h-full w-full relative">
                  {project.url !== "#" && project.url !== "" ? (
                    <iframe 
                      src={currentIndex === projects.indexOf(project) ? project.url : undefined}
                      className="scrolling-iframe absolute inset-0 w-full h-full" 
                      title={project.title}
                      loading="lazy"
                    />
                  ) : project.image ? (
                    project.image.endsWith('.mp4') ? (
                      <video 
                        src={project.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <div className="text-white text-2xl font-bold opacity-50 p-8 text-center" style={{fontFamily: 'Instrument Serif'}}>
                      {project.title}
                      <div className="text-sm font-normal mt-2 tracking-widest uppercase font-sans">No live preview available</div>
                    </div>
                  )}
                </div>
                {project.url !== "#" && project.url !== "" && (
                  <a href={project.url} target="_blank" rel="noreferrer" className="explore-btn z-10" style={{textDecoration: 'none'}}>EXPLORE</a>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PORTFOLIO_INFO } from '../../data/portfolioData';
import RealisticSphere from './RealisticSphere';
import './Works.css';

gsap.registerPlugin(ScrollTrigger);

const defaultImages = [
  'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80'
];

const projects = PORTFOLIO_INFO.projects.map((p, index) => ({
  id: String(index + 1).padStart(2, '0'),
  title: p.title,
  subtitle: p.tags?.slice(0, 3).join(' · ') || 'FEATURED PROJECT',
  image: defaultImages[index % defaultImages.length],
}));

export default function Works() {
  const container = useRef<HTMLDivElement>(null);
  const scrollWrapper = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  useGSAP(() => {
    if (!container.current || !scrollWrapper.current) return;

    const getScrollAmount = () => -(scrollWrapper.current!.scrollWidth - container.current!.clientWidth);
    const scrollEnd = scrollWrapper.current.scrollWidth;
    
    gsap.to(scrollWrapper.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        pin: true,
        scrub: 1,
        end: `+=${scrollEnd}`,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const currentIndex = Math.floor(self.progress * (projects.length + 1));
          const displayIndex = currentIndex === 0 ? 1 : currentIndex;
          if (displayIndex >= 1 && displayIndex <= projects.length) {
            setActiveIndex(displayIndex);
          }
        }
      }
    });

    // 1. Initial hit timeline
    const hitTl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top center",
        toggleActions: "play none none reset"
      }
    });

    // Text slides in and bounces
    hitTl.from('.works-section .pushed-text', {
      x: 400,
      duration: 1.2,
      ease: "bounce.out"
    }, 0);

    // Ball recoils/shakes right when the text slams into it
    hitTl.to('.works-section .floating-object', {
      x: -25,
      rotation: -15,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut"
    }, 0.45);

    // 2. Scrub animation (Rolling faster leftwards)
    gsap.to('.works-section .floating-object', {
      rotation: -1800,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        scrub: 1,
        end: `+=${scrollEnd}`
      }
    });

  }, { scope: container, dependencies: [] });

  const totalProjectsStr = String(projects.length).padStart(2, '0');
  const activeIndexStr = String(activeIndex).padStart(2, '0');

  return (
    <section ref={container} className="works-section bg-white text-black flex w-full h-[100dvh] overflow-hidden relative z-50">
      
      {/* Left Area (Horizontal Scroll) */}
      <div className="flex-1 flex flex-col relative h-full overflow-hidden">
        
        {/* Header */}
        <div className="absolute top-3 left-4 sm:top-4 sm:left-6 md:top-6 md:left-10 z-20 flex flex-col z-[100] pointer-events-none">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-['Anton',sans-serif] uppercase tracking-wide leading-none md:leading-tight">
            IT TOOK <span className="text-[#0052ff]">MY TIME.</span>
          </h2>
          <div className="mt-1.5 sm:mt-2.5 md:mt-3 text-xl sm:text-2xl md:text-3xl font-bold font-['Anton',sans-serif]">
            <span className="text-[#0052ff] transition-all duration-300">{activeIndexStr}</span> <span className="text-gray-400">/ {totalProjectsStr}</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:block absolute left-6 md:left-10 bottom-6 md:bottom-8 z-20 font-['Caveat',cursive] text-2xl md:text-3xl text-black opacity-75 z-[100] pointer-events-none">
          SCROLL →
        </div>

        {/* Horizontal Scroll Area */}
        <div className="relative w-full h-full flex items-center overflow-hidden pt-12 sm:pt-16 md:pt-20">
          <div ref={scrollWrapper} className="flex h-full w-max items-center pl-[16vw] sm:pl-[24vw] md:pl-[32vw] lg:pl-[36vw] pr-[10vw]">
            
            {/* Intro Text Slide (Positioned towards the right of center) */}
            <div className="project-slide w-auto shrink-0 h-full flex items-center justify-start px-4 sm:px-8 md:px-12 mr-6 sm:mr-10 md:mr-16">
              
              {/* Photorealistic 3D WebGL Sphere */}
              <div className="floating-object w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 shrink-0 mr-3 sm:mr-6 md:mr-8 relative z-20 flex items-center justify-center">
                <RealisticSphere className="w-full h-full" />
              </div>

              {/* Text being pushed */}
              <h1 className="pushed-text text-[clamp(2rem,5.5vw,6.5rem)] font-['Anton',sans-serif] whitespace-nowrap text-[#0052ff] tracking-wide uppercase z-10 drop-shadow-sm leading-none">
                DESIGNED <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">FOR YOU.</span>
              </h1>

            </div>

            {/* Projects Horizontal Slider Cards */}
            {projects.map((project, i) => (
              <div key={i} className="project-slide w-[85vw] sm:w-[55vw] md:w-[42vw] lg:w-[35vw] px-3 sm:px-4 md:px-6 h-full flex items-center justify-center relative shrink-0">
                
                <div className="relative group cursor-pointer w-full flex flex-col">
                  
                  {/* Card Media Container */}
                  <div className="relative w-full h-[40vh] sm:h-[46vh] md:h-[50vh] max-h-[460px]">
                    
                    {/* Badge */}
                    <div className="absolute -top-3.5 -left-3.5 bg-black text-white text-xs font-bold px-3 py-1 flex items-center space-x-2 z-10 rounded-sm shadow-md">
                      <span className="w-2 h-2 rounded-full bg-[#0052ff]"></span>
                      <span>{project.id}</span>
                    </div>

                    {/* Image/Video */}
                    <div className="w-full h-full overflow-hidden shadow-xl border border-gray-200 rounded-xl bg-gray-100">
                      {project.image.endsWith('.mp4') ? (
                        <video 
                          src={project.image} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        />
                      ) : (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        />
                      )}
                    </div>
                    
                    {/* Subtitle */}
                    <div className="absolute top-4 right-4 text-[9px] md:text-[10px] font-bold tracking-widest uppercase bg-white/90 backdrop-blur-sm px-3 py-1 text-black border border-black/10 rounded-full shadow-sm">
                      {project.subtitle}
                    </div>

                  </div>
                  
                  {/* Title Below Card */}
                  <div className="mt-3.5 sm:mt-4 px-1">
                    <h3 className="text-[clamp(1.2rem,2.2vw,2.2rem)] font-['Anton',sans-serif] text-black uppercase leading-tight tracking-wide group-hover:text-[#0052ff] transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import RightSidebar from './RightSidebar';
import { PORTFOLIO_INFO } from './portfolioData';
import './Works.css';

gsap.registerPlugin(ScrollTrigger);

const defaultImages = [
  'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80'
];

// Map the projects from portfolioData to the format used in this component
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

    // We animate the wrapper's x position directly. This allows slides to be any width.
    const getScrollAmount = () => -(scrollWrapper.current!.scrollWidth - window.innerWidth);
    const scrollEnd = scrollWrapper.current.scrollWidth;
    
    const tween = gsap.to(scrollWrapper.current, {
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
          // Approximate the active index based on progress
          const currentIndex = Math.floor(self.progress * (projects.length + 1));
          const displayIndex = currentIndex === 0 ? 1 : currentIndex;
          if (displayIndex >= 1 && displayIndex <= projects.length) {
            setActiveIndex(displayIndex);
          }
        }
      }
    });

    // 1. Initial hit timeline (TEXT bounces in, BALL gets jolted on impact)
    const hitTl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top center",
        toggleActions: "play none none reset"
      }
    });

    // Text slides in and bounces
    hitTl.from('.pushed-text', {
      x: 800,
      duration: 1.5,
      ease: "bounce.out"
    }, 0);

    // Ball recoils/shakes right when the text slams into it
    hitTl.to('.floating-object', {
      x: -30,
      rotation: -15,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut"
    }, 0.55);

    // 2. Scrub animation (ball rolls forward pushing the text as you scroll horizontally)
    gsap.to('.floating-object', {
      rotation: 720,
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
      <div className="flex-1 flex flex-col relative h-full">
        
        {/* Header */}
        <div className="absolute top-6 left-6 md:top-12 md:left-12 z-20 flex flex-col z-[100] pointer-events-none">
          <div className="text-gray-600 text-[10px] md:text-sm tracking-[0.2em] mb-1 md:mb-2 uppercase flex items-center">
            DILANTHA DEV / 2018 <span className="mx-1 md:mx-2">→</span> <span className="text-[#df1b3f] font-bold">NOW</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-['Anton',sans-serif] uppercase tracking-wide leading-none md:leading-tight">
            IT TOOK <span className="text-[#df1b3f]">MY TIME.</span>
          </h2>
          <div className="mt-4 md:mt-8 text-2xl md:text-3xl font-bold font-['Anton',sans-serif]">
            <span className="text-[#df1b3f] transition-all duration-300">{activeIndexStr}</span> <span className="text-gray-400">/ {totalProjectsStr}</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:block absolute left-12 bottom-[20%] z-20 font-['Caveat',cursive] text-3xl text-black opacity-80 z-[100] pointer-events-none">
          SCROLL →
        </div>

        {/* Bottom Timeline */}
        <div className="absolute bottom-4 left-6 right-6 md:bottom-8 md:left-12 md:right-12 z-20 flex justify-between text-[8px] md:text-xs text-gray-500 tracking-widest z-[100] pointer-events-none">
          <div>
            <div className="text-black mb-1">2022 → NOW</div>
            <div className="font-bold text-gray-600 text-[10px] md:text-sm leading-none">SENIOR DEV</div>
            <div className="text-[8px] md:text-[10px]">FULL STACK</div>
          </div>
          <div className="hidden sm:block">
            <div className="text-black mb-1">2019 → 2022</div>
            <div className="font-bold text-gray-600 text-[10px] md:text-sm leading-none">FREELANCE</div>
            <div className="text-[8px] md:text-[10px]">WEB DEV</div>
          </div>
          <div>
            <div className="text-black mb-1">2015 → 2019</div>
            <div className="font-bold text-gray-600 text-[10px] md:text-sm leading-none">STUDENT</div>
            <div className="text-[8px] md:text-[10px]">PROJECTS</div>
          </div>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="relative w-full h-full flex items-center overflow-hidden">
          <div ref={scrollWrapper} className="flex h-full w-max">
            
            {/* Intro Text Slide */}
            <div className="project-slide w-[100vw] h-full flex flex-col md:flex-row items-center justify-center shrink-0 pl-6 pr-6 md:pl-[40vw] md:pr-32 pt-32 md:pt-0">
              
              {/* Floating Object that rolls (pushes) */}
              <div className="floating-object w-48 h-48 md:w-64 md:h-64 rounded-full bg-[radial-gradient(circle_at_30%_30%,_#ff4b6b,_#df1b3f,_#7a0e21)] shadow-[10px_15px_30px_rgba(0,0,0,0.2),_inset_-10px_-10px_20px_rgba(0,0,0,0.2)] flex items-center justify-center z-20 shrink-0 mr-2 lg:mr-4 relative overflow-hidden border-2 border-black/10">
                 
                 {/* Cross lines to make the spinning highly visible */}
                 <div className="absolute w-full h-1 bg-white/40 top-1/2 -translate-y-1/2"></div>
                 <div className="absolute h-full w-1 bg-white/40 left-1/2 -translate-x-1/2"></div>

                 {/* Center hub */}
                 <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-[4px] border-white/60 bg-[#df1b3f] shadow-inner flex items-center justify-center z-10">
                    <div className="w-4 h-4 bg-white rounded-full shadow-lg"></div>
                 </div>
              </div>

              {/* Text being pushed (bounces in) */}
              <h1 className="pushed-text text-[14vw] font-['Anton',sans-serif] whitespace-nowrap text-[#df1b3f] tracking-widest uppercase z-10 drop-shadow-sm leading-none pr-32">
                DESIGNED <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-400">FOR YOU.</span>
              </h1>

            </div>

            {projects.map((project, i) => (
              <div key={i} className="project-slide w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-[35vw] px-4 h-full flex items-center justify-center relative shrink-0">
                
                {/* Image & Title Wrapper */}
                <div className="relative group cursor-pointer w-full h-[60vh] md:h-[70vh]">
                  
                  {/* Badge */}
                  <div className="absolute -top-4 -left-4 bg-black text-white font-bold px-3 py-1 flex items-center space-x-2 z-10">
                    <span className="w-2 h-2 rounded-full bg-[#df1b3f]"></span>
                    <span>{project.id}</span>
                  </div>

                  {/* Image */}
                  <div className="w-full h-full overflow-hidden shadow-lg border border-gray-200">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                  </div>
                  
                  {/* Title Overlay */}
                  <div className="absolute -bottom-6 left-6 text-[5vw] md:text-[3vw] font-['Anton',sans-serif] text-black uppercase leading-none drop-shadow-sm">
                    {project.title}
                  </div>
                  
                  {/* Subtitle */}
                  <div className="absolute top-4 right-4 text-[10px] md:text-xs tracking-widest uppercase bg-white/90 px-3 py-1 text-black border border-black/10 shadow-sm">
                    {project.subtitle}
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Sidebar */}
      <RightSidebar activeSection="WORKS" />

    </section>
  );
}

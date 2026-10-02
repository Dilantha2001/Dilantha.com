import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import RightSidebar from './RightSidebar';
import './Works.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    title: 'TRENDING',
    subtitle: 'WEBGL EFFECTS WITHOUT CODE.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '02',
    title: 'LALITA',
    subtitle: 'PREMIUM WORDPRESS THEME',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '03',
    title: 'MOMENTUM',
    subtitle: 'DIGITAL PARADISE',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=600&q=80',
  },
];

export default function Works() {
  const container = useRef<HTMLDivElement>(null);
  const scrollWrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current || !scrollWrapper.current) return;

    // Horizontal scroll animation
    const sections = gsap.utils.toArray('.project-slide');
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        pin: true,
        scrub: 1,
        end: "+=3000",
        refreshPriority: 1,
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

    // Ball recoils/shakes right when the text slams into it (approx 0.55s into 1.5s bounce.out)
    hitTl.to('.floating-object', {
      x: -30,
      rotation: -15,
      duration: 0.15,
      yoyo: true,
      repeat: 1, // goes to -30 and back to 0
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
        end: "+=3000"
      }
    });

  }, { scope: container, dependencies: [] });

  return (
    <section ref={container} className="works-section bg-[#111111] text-white flex w-full h-[100dvh] overflow-hidden relative z-50">
      
      {/* Left Area (Horizontal Scroll) */}
      <div className="flex-1 flex flex-col relative h-full">
        
        {/* Header */}
        <div className="absolute top-12 left-12 z-20 flex flex-col z-[100]">
          <div className="text-gray-400 text-sm tracking-[0.2em] mb-2 uppercase flex items-center">
            DILANTHA DEV / 2018 <span className="mx-2">→</span> <span className="text-[#df1b3f] font-bold">NOW</span>
          </div>
          <h2 className="text-7xl font-bold font-['Anton',sans-serif] uppercase tracking-wide">
            IT TOOK <span className="text-[#df1b3f]">MY TIME.</span>
          </h2>
          <div className="mt-8 text-3xl font-bold font-['Anton',sans-serif]">
            <span className="text-[#df1b3f]">01</span> <span className="text-gray-500">/ 05</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute left-12 bottom-[20%] z-20 font-['Caveat',cursive] text-3xl text-white opacity-80 z-[100]">
          SCROLL →
        </div>

        {/* Bottom Timeline */}
        <div className="absolute bottom-8 left-12 right-12 z-20 flex justify-between text-xs text-gray-500 tracking-widest z-[100]">
          <div>
            <div className="text-white mb-1">2022 → NOW</div>
            <div className="font-bold text-gray-300 text-sm">SENIOR DEV</div>
            <div className="text-[10px]">FULL STACK DEVELOPER</div>
          </div>
          <div>
            <div className="text-white mb-1">2019 → 2022</div>
            <div className="font-bold text-gray-300 text-sm">FREELANCE</div>
            <div className="text-[10px]">WEB DEVELOPMENT</div>
          </div>
          <div>
            <div className="text-white mb-1">2015 → 2019</div>
            <div className="font-bold text-gray-300 text-sm">STUDENT</div>
            <div className="text-[10px]">UNIVERSITY PROJECTS</div>
          </div>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="relative w-full h-full flex items-center overflow-hidden">
          <div ref={scrollWrapper} className="flex h-full w-max">
            
            {/* Intro Text Slide */}
            <div className="project-slide w-[150vw] h-full flex items-center shrink-0 pl-[40vw]">
              
              {/* Floating Object that rolls (pushes) */}
              <div className="floating-object w-48 h-48 md:w-64 md:h-64 rounded-full bg-[radial-gradient(circle_at_30%_30%,_#ff4b6b,_#df1b3f,_#111111)] shadow-[10px_15px_30px_rgba(0,0,0,0.6),_inset_-10px_-10px_20px_rgba(0,0,0,0.4)] flex items-center justify-center z-20 shrink-0 mr-2 lg:mr-4 relative overflow-hidden border-2 border-white/10">
                 
                 {/* Cross lines to make the spinning highly visible */}
                 <div className="absolute w-full h-1 bg-white/20 top-1/2 -translate-y-1/2"></div>
                 <div className="absolute h-full w-1 bg-white/20 left-1/2 -translate-x-1/2"></div>

                 {/* Center hub */}
                 <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-[4px] border-white/60 bg-[#df1b3f] shadow-inner flex items-center justify-center z-10">
                    <div className="w-4 h-4 bg-white rounded-full shadow-lg"></div>
                 </div>
              </div>

              {/* Text being pushed (bounces in) */}
              <h1 className="pushed-text text-[14vw] font-['Anton',sans-serif] whitespace-nowrap text-[#df1b3f] tracking-widest uppercase z-10 drop-shadow-2xl leading-none">
                DESIGNED <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">FOR YOU.</span>
              </h1>

            </div>

            {projects.map((project, i) => (
              <div key={i} className="project-slide w-[100vw] h-full flex items-center justify-center relative shrink-0">
                
                {/* Image & Title Wrapper */}
                <div className="relative group cursor-pointer w-[60%] aspect-video">
                  
                  {/* Badge */}
                  <div className="absolute -top-4 -left-4 bg-white text-black font-bold px-3 py-1 flex items-center space-x-2 z-10">
                    <span className="w-2 h-2 rounded-full bg-[#df1b3f]"></span>
                    <span>{project.id}</span>
                  </div>

                  {/* Image */}
                  <div className="w-full h-full overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    />
                  </div>
                  
                  {/* Title Overlay */}
                  <div className="absolute -bottom-8 left-8 text-[8vw] font-['Anton',sans-serif] text-white uppercase leading-none drop-shadow-2xl">
                    {project.title}
                  </div>
                  
                  {/* Subtitle */}
                  <div className="absolute top-4 right-4 text-xs tracking-widest uppercase bg-black/50 px-3 py-1 text-white border border-white/20">
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

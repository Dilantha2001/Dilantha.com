import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PORTFOLIO_INFO } from '../../data/portfolioData';
import GlossyRedBall from './GlossyRedBall';
import musicAppImg from '../../assets/projects/music aoo.jpg';
import bookstoreImg from '../../assets/projects/bookstore.jpg';
import weddingImg from '../../assets/projects/wedding.jpg';
import aiDogImg from '../../assets/projects/aidog.jpg';
import postImg from '../../assets/projects/post.jpg';
import ecommerceImg from '../../assets/projects/ecommerce.jpg';
import sinhalaImg from '../../assets/projects/sinhala.jpg';
import ProjectModal, { type ProjectModalData } from './ProjectModal';
import './Works.css';

gsap.registerPlugin(ScrollTrigger);

const projectImageMap: Record<string, string> = {
  'music-streaming-app': musicAppImg,
  'online-book-store': bookstoreImg,
  'wedding-photography-platform': weddingImg,
  'dog-behavior-ai': aiDogImg,
  'trust-post-logistics': postImg,
  'fullstack-ecommerce-platform': ecommerceImg,
  'sinhala-caption': sinhalaImg,
};

const fallbackImages = [
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80'
];

const projects: ProjectModalData[] = PORTFOLIO_INFO.projects.map((p, index) => ({
  id: String(index + 1).padStart(2, '0'),
  rawId: String(p.id ?? index),
  title: p.title,
  subtitle: (p as any).category || p.tags?.slice(0, 3).join(' · ') || 'FEATURED PROJECT',
  category: (p as any).category,
  role: (p as any).role,
  description: p.description || '',
  highlights: (p as any).highlights || [],
  tags: p.tags || [],
  image: (p.id && projectImageMap[p.id]) ? projectImageMap[p.id] : fallbackImages[index % fallbackImages.length],
  links: p.links,
  date: p.date,
}));

export default function Works() {
  const container = useRef<HTMLDivElement>(null);
  const scrollWrapper = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedProject, setSelectedProject] = useState<ProjectModalData | null>(null);

  useEffect(() => {
    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    window.addEventListener('resize', handleRefresh);
    window.addEventListener('load', handleRefresh);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleRefresh);
      window.removeEventListener('load', handleRefresh);
    };
  }, []);

  useGSAP(() => {
    if (!container.current || !scrollWrapper.current) return;

    const getScrollAmount = () => {
      if (!scrollWrapper.current || !container.current) return 0;
      return -(scrollWrapper.current.scrollWidth - container.current.clientWidth);
    };

    const getScrollDistance = () => {
      if (!scrollWrapper.current || !container.current) return window.innerHeight * 2.5;
      const trackDistance = scrollWrapper.current.scrollWidth - container.current.clientWidth;
      return Math.max(trackDistance, window.innerHeight * 2);
    };
    
    gsap.to(scrollWrapper.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        pin: true,
        scrub: 1,
        end: () => `+=${getScrollDistance()}`,
        anticipatePin: 1,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        pinSpacing: true,
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
        end: () => `+=${getScrollDistance()}`,
        invalidateOnRefresh: true,
      }
    });

    // 3. Continuous smooth GSAP auto-zoom animation (Ken Burns breathing effect)
    gsap.utils.toArray<HTMLElement>('.works-project-image-autozoom').forEach((imgEl, index) => {
      gsap.to(imgEl, {
        scale: 1.07,
        duration: 3.8 + (index % 3) * 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    gsap.utils.toArray<HTMLElement>('.works-project-blur-autozoom').forEach((blurEl, index) => {
      gsap.to(blurEl, {
        scale: 1.25,
        opacity: 0.32,
        duration: 4.2 + (index % 3) * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
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
            <div className="works-intro-slide w-auto shrink-0 h-full flex items-center justify-start px-4 sm:px-8 md:px-12 mr-6 sm:mr-10 md:mr-16">
              
              {/* 3D Glossy Electric Blue Ball (Brand Theme #0052ff) */}
              <div className="floating-object w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 shrink-0 mr-3 sm:mr-6 md:mr-8 relative z-20 flex items-center justify-center">
                <GlossyRedBall className="w-full h-full" />
              </div>

              {/* Text being pushed */}
              <h1 className="pushed-text text-[clamp(2rem,5.5vw,6.5rem)] font-['Anton',sans-serif] whitespace-nowrap text-black tracking-wide uppercase z-10 drop-shadow-sm leading-none">
                DESIGNED <span className="text-[#0052ff]">FOR</span> YOU.
              </h1>

            </div>

            {/* Projects Horizontal Slider Cards */}
            {projects.map((project, i) => (
              <div key={i} className="project-slide w-[88vw] sm:w-[65vw] md:w-[52vw] lg:w-[44vw] max-w-[660px] px-3 sm:px-4 md:px-5 h-full flex items-center justify-center relative shrink-0">
                
                <div 
                  onClick={() => setSelectedProject(project)}
                  className="works-project-card relative group w-full flex flex-col transition-transform duration-300 hover:-translate-y-1"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedProject(project); }}
                  aria-label={`View details for ${project.title}`}
                >
                  
                  {/* Card Media Container (Widescreen 16:10 matching project mockups perfectly) */}
                  <div className="relative w-full aspect-[16/10] max-h-[420px]">
                    
                    {/* Badge */}
                    <div className="absolute -top-3.5 -left-3.5 bg-black text-white text-xs font-bold px-3 py-1 flex items-center space-x-2 z-10 rounded-sm shadow-md">
                      <span className="w-2 h-2 rounded-full bg-[#0052ff]"></span>
                      <span>{project.id}</span>
                    </div>

                    {/* Image/Video Container */}
                    <div className="w-full h-full overflow-hidden shadow-xl border border-gray-200/80 rounded-xl bg-[#07070a] flex items-center justify-center relative group-hover:border-[#0052ff]/40 transition-colors duration-300">
                      {/* Crisp Clean Mockup */}
                      {project.image.endsWith('.mp4') ? (
                        <video 
                          src={project.image} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="relative z-10 w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                      ) : (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="relative z-10 w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                      )}

                      {/* Interactive Hover Pill */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                        <span className="bg-[#0052ff] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-1.5">
                          <span>Inspect Details</span>
                          <span>↗</span>
                        </span>
                      </div>
                    </div>
                    
                    {/* Subtitle Badge */}
                    <div className="absolute top-3.5 right-3.5 text-[9px] md:text-[10px] font-bold tracking-widest uppercase bg-[#08080c]/85 backdrop-blur-md px-3 py-1 text-white/80 border border-white/10 rounded-full shadow-md z-20">
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

      {/* Project Details Popup Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

    </section>
  );
}

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PORTFOLIO_INFO } from '../../data/portfolioData';
import GlossyRedBall from './GlossyRedBall';
import musicAppImg from '../../assets/projects/music aoo.jpg';
import bookstoreImg from '../../assets/projects/bookstore.jpg';
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
  'wedding-photography-platform': 'https://res.cloudinary.com/dymkikwdc/video/upload/v1792428533/1019_2_xjb2ul.mp4',
  'dog-behavior-ai': aiDogImg,
  'trust-post-logistics': postImg,
  'fullstack-ecommerce-platform': ecommerceImg,
  'sinhala-caption': sinhalaImg,
  'smokio': 'https://res.cloudinary.com/dymkikwdc/video/upload/f_auto,q_auto/v1791980287/1014_1_nnsvxf.mp4',
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
  image: (p.id && projectImageMap[p.id]) ? projectImageMap[p.id] : (p.image || fallbackImages[index % fallbackImages.length]),
  links: p.links,
  date: p.date,
}));

export default function Works() {
  const container = useRef<HTMLDivElement>(null);
  const scrollWrapper = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedProject, setSelectedProject] = useState<ProjectModalData | null>(null);

  const trackContainerRef = useRef<HTMLDivElement>(null);

  // Resize and load refresh
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

  // Update active card on mobile touch swipe
  const handleTrackScroll = () => {
    if (window.innerWidth > 768 || !trackContainerRef.current) return;
    const track = trackContainerRef.current;
    const scrollLeft = track.scrollLeft;
    const trackCenter = scrollLeft + track.clientWidth / 2;

    const slides = track.querySelectorAll('.project-slide');
    let closestIndex = 0;
    let minDistance = Infinity;

    slides.forEach((slide, idx) => {
      const el = slide as HTMLElement;
      const slideCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(trackCenter - slideCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    if (closestIndex >= 0 && closestIndex < projects.length) {
      setActiveIndex(closestIndex + 1);
    }
  };

  // Jump to specific slide when dot or button is clicked
  const scrollToSlide = (index: number) => {
    if (trackContainerRef.current) {
      const slides = trackContainerRef.current.querySelectorAll('.project-slide');
      if (slides[index]) {
        const el = slides[index] as HTMLElement;
        const targetScroll = el.offsetLeft - (trackContainerRef.current.clientWidth - el.offsetWidth) / 2;
        trackContainerRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
        setActiveIndex(index + 1);
      }
    }
  };

  // Ball interactive tap recoil animation (Snappy, energetic & smooth)
  const handleBallTap = () => {
    gsap.timeline()
      .to('.works-section .floating-object', {
        x: -80,
        rotation: -80,
        duration: 0.26,
        ease: 'power3.out',
        overwrite: 'auto'
      })
      .to('.works-section .floating-object', {
        x: 0,
        rotation: 0,
        duration: 0.48,
        ease: 'elastic.out(1, 0.55)',
        overwrite: 'auto'
      });
  };

  useGSAP(() => {
    if (!container.current || !scrollWrapper.current) return;

    const mm = gsap.matchMedia();

    // DESKTOP ONLY (> 768px): Pinned horizontal scrub with glossy red ball physics
    mm.add('(min-width: 769px)', () => {
      const getScrollAmount = () => {
        if (!scrollWrapper.current || !container.current) return 0;
        return -(scrollWrapper.current.scrollWidth - container.current.clientWidth);
      };

      const getScrollDistance = () => {
        if (!scrollWrapper.current || !container.current) return window.innerHeight * 2;
        const trackDistance = scrollWrapper.current.scrollWidth - container.current.clientWidth;
        return Math.max(trackDistance, window.innerHeight * 1.7);
      };
      
      // Main horizontal pin & scrub animation
      gsap.to(scrollWrapper.current, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          pin: true,
          scrub: 0.8,
          end: () => `+=${getScrollDistance()}`,
          anticipatePin: 1,
          refreshPriority: 5,
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

      // 1. Initial hit timeline (Ball gets knocked away and springs back smoothly)
      const hitTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top center',
          toggleActions: 'play none none reset'
        }
      });

      hitTl.from('.works-section .pushed-text', {
        x: 220,
        duration: 1.1,
        ease: 'bounce.out'
      }, 0);

      // Ball gets knocked to the left and returns quickly & smoothly
      hitTl.to('.works-section .floating-object', {
        x: -80,
        rotation: -80,
        duration: 0.26,
        ease: 'power3.out'
      }, 0.38);

      hitTl.to('.works-section .floating-object', {
        x: 0,
        rotation: 0,
        duration: 0.48,
        ease: 'elastic.out(1, 0.55)'
      }, 0.64);

      // 2. Ball roll scrub animation
      gsap.to('.works-section .floating-object', {
        rotation: -1800,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          scrub: 0.8,
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
        }
      });
    });

    // MOBILE (<= 768px): Clear GSAP pin and transforms for smooth native touch swipe
    mm.add('(max-width: 768px)', () => {
      if (scrollWrapper.current) {
        gsap.set(scrollWrapper.current, { clearProps: 'all' });
      }
    });

    // Ken Burns breathing effect on project mockups
    gsap.utils.toArray<HTMLElement>('.works-project-image-autozoom').forEach((imgEl, index) => {
      gsap.to(imgEl, {
        scale: 1.07,
        duration: 3.8 + (index % 3) * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => {
      mm.revert();
    };
  }, { scope: container, dependencies: [] });

  const totalProjectsStr = String(projects.length).padStart(2, '0');
  const activeIndexStr = String(activeIndex).padStart(2, '0');

  return (
    <section 
      ref={container} 
      className="works-section bg-white text-black w-full h-auto md:h-[100dvh] overflow-visible md:overflow-hidden relative z-40 flex flex-col justify-between box-border"
    >
      
      {/* 1. Top Header Row (Pinned at top, balanced padding) */}
      <div className="works-header-row w-full px-4 sm:px-6 md:px-10 pt-4 sm:pt-5 md:pt-6 pb-2 z-20 flex justify-between items-start shrink-0">
        <div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-['Anton',sans-serif] uppercase tracking-wide leading-none">
            IT TOOK <span className="text-[#0052ff]">MY TIME.</span>
          </h2>
          <p className="text-[10px] sm:text-xs font-['Space_Mono',monospace] text-gray-500 uppercase tracking-widest mt-1">
            Selected Works Archive
          </p>
        </div>
        
        {/* Active / Total Counter Badge */}
        <div className="text-base sm:text-xl md:text-2xl font-bold font-['Anton',sans-serif] bg-black/[0.04] backdrop-blur-md border border-black/10 px-3 py-1 rounded-full shadow-sm">
          <span className="text-[#0052ff] transition-all duration-300">{activeIndexStr}</span> <span className="text-gray-400">/ {totalProjectsStr}</span>
        </div>
      </div>

      {/* 2. Middle: Horizontal Scroll Area (Desktop: GSAP Scrub / Mobile: Native Touch-Swipe Carousel) */}
      <div 
        ref={trackContainerRef}
        onScroll={handleTrackScroll}
        className="works-track-container relative w-full flex-1 flex items-center overflow-x-auto md:overflow-hidden min-h-0 my-auto py-1 sm:py-2"
      >
        <div 
          ref={scrollWrapper} 
          className="works-scroll-wrapper flex items-center h-full w-max"
        >
          
          {/* Intro Text Slide - Only on Desktop, on Mobile cards start directly with Project 01 */}
          <div className="works-intro-slide hidden md:flex w-auto shrink-0 items-center justify-start px-4 sm:px-8 md:px-12 mr-4 sm:mr-8 md:mr-16 h-full">
            <div 
              onClick={handleBallTap}
              className="floating-object w-20 h-20 sm:w-32 sm:h-32 md:w-48 md:h-48 shrink-0 mr-3 sm:mr-6 md:mr-8 relative z-20 flex items-center justify-center cursor-pointer select-none active:scale-95 transition-transform"
              title="Click or tap to bounce"
            >
              <GlossyRedBall className="w-full h-full pointer-events-none" />
            </div>
            <h1 className="pushed-text text-[clamp(1.75rem,5vw,5.5rem)] font-['Anton',sans-serif] whitespace-nowrap text-black tracking-wide uppercase z-10 drop-shadow-sm leading-none">
              DESIGNED <span className="text-[#0052ff]">FOR</span> YOU.
            </h1>
          </div>

          {/* Projects Horizontal Slider Cards */}
          {projects.map((project, i) => (
            <div 
              key={i} 
              className="project-slide w-[82vw] sm:w-[62vw] md:w-[48vw] lg:w-[44vw] xl:w-[42vw] max-w-[620px] xl:max-w-[780px] 2xl:max-w-[920px] px-2.5 sm:px-4 shrink-0 flex flex-col justify-center h-full relative"
            >
              
              <div 
                onClick={() => setSelectedProject(project)}
                className="works-project-card relative group w-full flex flex-col transition-transform duration-300 hover:-translate-y-1 active:scale-[0.98]"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedProject(project); }}
                aria-label={`View details for ${project.title}`}
              >
                
                {/* Card Media Container */}
                <div className="works-card-media-box relative w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200/90 bg-[#07070a] group-hover:border-[#0052ff]/50 transition-colors duration-300">
                  
                  {/* Number Badge */}
                  <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold px-3 py-1 flex items-center space-x-1.5 z-20 rounded-md border border-white/10 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#0052ff]"></span>
                    <span>{project.id}</span>
                  </div>

                  {/* Subtitle / Category Badge */}
                  <div className="absolute top-3 right-3 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-[#08080c]/85 backdrop-blur-md px-3 py-1 text-white/90 border border-white/10 rounded-full shadow-md z-20 max-w-[55%] truncate">
                    {project.subtitle}
                  </div>

                  {/* Main Media Preview */}
                  <div className="w-full h-full flex items-center justify-center relative p-2 sm:p-3">
                    {(project.image.includes('.mp4') || project.image.endsWith('.mp4')) ? (
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

                    {/* Interactive Inspect Details Pill */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                      <span className="bg-[#0052ff] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-1.5">
                        <span>Inspect Details</span>
                        <span>↗</span>
                      </span>
                    </div>
                  </div>

                  {/* Mobile Tap Hint Pill (Always visible on mobile) */}
                  <div className="md:hidden absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-[#0052ff] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    <span>Inspect</span>
                    <span>↗</span>
                  </div>

                </div>
                
                {/* Title Below Card */}
                <div className="mt-2.5 sm:mt-4 px-1">
                  <h3 className="text-lg sm:text-[clamp(1.15rem,2.2vw,2rem)] font-['Anton',sans-serif] text-black uppercase leading-tight tracking-wide group-hover:text-[#0052ff] transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 3. Bottom Indicator & Progress Dots Row */}
      <div className="works-indicator-row w-full px-4 sm:px-6 md:px-10 pb-3 sm:pb-5 md:pb-6 pt-2 z-20 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2 font-['Space_Mono',monospace] text-[11px] sm:text-xs text-gray-700 font-bold uppercase tracking-wider">
          <span className="hidden sm:inline">SWIPE OR SCROLL</span>
          <span className="sm:hidden flex items-center gap-1.5 text-[#0052ff] font-bold">
            <span>SWIPE CARDS</span>
            <span className="animate-pulse">↔</span>
          </span>
          <span className="hidden sm:inline text-[#0052ff] text-sm animate-pulse">→</span>
        </div>

        {/* Dynamic Project Progress Dots */}
        <div className="flex items-center gap-1.5">
          {projects.map((_, idx) => (
            <button 
              key={idx}
              type="button"
              onClick={() => scrollToSlide(idx)}
              aria-label={`Go to project ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx + 1 ? 'w-5 bg-[#0052ff]' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
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

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ScrambleText from '../Common/ScrambleText';

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const [svgContent, setSvgContent] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [isInView, setIsInView] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const statsRowRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    if (statsRowRef.current) {
      gsap.fromTo(
        statsRowRef.current.children,
        { opacity: 0, y: 35, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: statsRowRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (graphRef.current) {
      gsap.fromTo(
        graphRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: graphRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, { scope: sectionRef });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (graphRef.current) {
      observer.observe(graphRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    fetch(`https://raw.githubusercontent.com/Dilantha2001/Dilantha2001/output/github-contribution-grid-snake.svg?t=${Date.now()}`)
      .then((res) => res.text())
      .then((raw) => {
        // Replace SVG CSS variables with electric blue theme palette and hide progress bar
        const blueThemedSvg = raw
          .replace(
            /:root\{[^}]*\}/,
            ':root{--cb:rgba(0,82,255,0.08);--cs:#0052ff;--ce:#ebedf0;--c0:#ebedf0;--c1:#bfdbfe;--c2:#60a5fa;--c3:#0052ff;--c4:#1e40af;}'
          )
          .replace(
            /<\/style>/,
            '.u{display:none!important;opacity:0!important;visibility:hidden!important;}</style>'
          )
          .replace(/<rect[^>]*class="[^"]*\bu\b[^"]*"[^>]*\/?>/gi, '');
        setSvgContent(blueThemedSvg);
      })
      .catch((err) => {
        console.error('Failed to load GitHub activity SVG', err);
      });
  }, [isInView]);

  return (
    <section id="stats" ref={sectionRef} className="w-full bg-white pt-4 md:pt-6 pb-16 md:pb-24 px-4 md:px-8">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
        
        {/* Top 3 Stats */}
        <div ref={statsRowRef} className="flex flex-col md:flex-row justify-between items-center w-full mb-12 gap-12 md:gap-4 px-4">
          
          {/* 1. Projects Completed */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-black text-[4rem] md:text-[5rem] font-bold mb-0 leading-none font-['Anton',sans-serif]">
              <ScrambleText text="15+" />
            </h2>
            <p className="text-black/50 text-sm font-semibold tracking-widest uppercase mt-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0052ff]"></span>
              PROJECTS COMPLETED
            </p>
          </div>

          {/* 2. GitHub Contributions */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-black text-[4rem] md:text-[5rem] font-bold mb-0 leading-none font-['Anton',sans-serif]">
              <ScrambleText text="3.5K+" />
            </h2>
            <p className="text-black/50 text-sm font-semibold tracking-widest uppercase mt-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0052ff]"></span>
              GITHUB CONTRIBUTIONS
            </p>
          </div>

          {/* 3. System Uptime & Reliability */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-black text-[4rem] md:text-[5rem] font-bold mb-0 leading-none font-['Anton',sans-serif]">
              <ScrambleText text="99.9%" />
            </h2>
            <p className="text-black/50 text-sm font-semibold tracking-widest uppercase mt-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0052ff]"></span>
              UPTIME & RELIABILITY
            </p>
          </div>

        </div>

        {/* Github Snake Graph with Dates & Legend */}
        <div ref={graphRef} className="flex flex-col items-center mt-12 w-full max-w-5xl mx-auto pb-4">
          
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="text-black text-base font-bold tracking-widest uppercase font-sans">
              PERSONAL GITHUB ACTIVITY
            </h3>
          </div>
          
          <p className="text-black/50 text-xs mb-8 italic">
            (Work commits are stored securely in internal repositories)
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 items-start w-full">
            
            {/* Graph Container */}
            <div className="flex flex-col overflow-x-auto pb-2 w-full max-w-full custom-scrollbar">
              
              {/* Months */}
              <div className="flex text-black/50 text-[10px] mb-2 w-full justify-between pr-4 pl-8" style={{ minWidth: '850px' }}>
                {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => (
                  <span key={i} className="flex-1 font-medium">{m}</span>
                ))}
              </div>
              
              {/* Snake SVG with Pure Blue Palette */}
              <div className="flex flex-col gap-6 items-center w-full min-w-[850px] overflow-hidden">
                {svgContent ? (
                  <div 
                    className="w-full flex justify-center [&>svg]:w-full [&>svg]:h-auto [&_.u]:hidden -mt-2"
                    dangerouslySetInnerHTML={{ __html: svgContent }} 
                  />
                ) : (
                  <div className="w-full h-32 flex items-center justify-center text-black/40 text-xs gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0052ff] animate-ping"></span>
                    Loading GitHub Activity...
                  </div>
                )}
              </div>

            </div>

            {/* Year Selector */}
            <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-6 text-xs w-full md:w-24 shrink-0">
              {['2026', '2025', '2024', '2023'].map((year) => {
                const isActive = selectedYear === year;
                return (
                  <button 
                    key={year} 
                    onClick={() => setSelectedYear(year)}
                    className={`px-3 py-1.5 rounded text-left transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'bg-[#0052ff]/10 text-[#0052ff] border border-[#0052ff]/30 font-bold shadow-sm' 
                        : 'text-black/50 hover:text-[#0052ff] hover:bg-gray-50 border border-transparent font-medium'
                    }`}
                  >
                    {year}
                  </button>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

import React, { useRef } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    num: "01",
    title: "CONCEPT",
    desc: "During the concept phase, I work closely with my clients to understand their needs and goals for their website.",
    bullets: [
      "Reviewing any existing branding",
      "Target audience and competitors research",
      "Developing a comprehensive strategy"
    ]
  },
  {
    num: "02",
    title: "DESIGN",
    desc: "Once the concept is established, I move on to the design phase. Here, I create a visual representation of the website that reflects the client's brand and messaging.",
    bullets: [
      "Wireframing & Prototyping",
      "UI/UX Design crafting",
      "Design system generation"
    ]
  },
  {
    num: "03",
    title: "DEVELOPMENT",
    desc: "After the design is approved, I proceed to build the website using modern web technologies. I ensure the site is fast, responsive, and SEO friendly.",
    bullets: [
      "Frontend & Backend architecture",
      "Performance optimization",
      "Deployment & rigorous testing"
    ]
  }
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!lineRef.current) return;
    
    gsap.to(lineRef.current, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 40%",
        end: "bottom 90%",
        scrub: 1
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-[#f9fafb] text-[#111] py-32 px-6 md:px-16 lg:px-24 flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10 font-sans border-t border-gray-100 overflow-hidden">
      
      {/* Left Column: Sticky Title Area */}
      <div className="w-full lg:w-5/12 flex flex-col items-start lg:sticky lg:top-32 h-fit">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[2px] w-8 bg-[#df1b3f]"></div>
          <h4 className="text-[#df1b3f] text-xs font-bold tracking-[0.2em] uppercase">
            MY PROCESS
          </h4>
        </div>
        
        <h2 className="text-[3rem] md:text-5xl lg:text-[4rem] font-light mb-8 leading-[1.1] tracking-tight text-[#111]">
          Your Dream Website in<br/>
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#111] to-gray-400">just few steps</span>
        </h2>
        <p className="text-gray-500 mb-12 max-w-sm text-[15px] leading-relaxed">
          From consultation to launch, our streamlined process ensures timely delivery, crystal-clear communication, and outstanding quality work.
        </p>
        <button className="bg-[#111] text-white px-8 py-4 rounded-full text-xs font-bold tracking-[0.1em] flex items-center gap-3 hover:bg-[#df1b3f] hover:shadow-[0_8px_20px_rgba(223,27,63,0.3)] transition-all duration-300 transform hover:-translate-y-1 group">
          GET IN TOUCH 
          <span className="group-hover:rotate-45 transition-transform duration-300">
            <FiArrowUpRight size={18} />
          </span>
        </button>
      </div>

      {/* Right Column: Scrolling Cards */}
      <div className="w-full lg:w-7/12 relative flex">
        
        {/* Animated Vertical Line Timeline */}
        <div className="hidden md:block absolute left-[30px] top-10 bottom-[20vh] w-[2px] bg-gray-200 z-0 rounded-full">
          <div ref={lineRef} className="absolute top-0 left-0 w-full h-full bg-[#df1b3f] origin-top scale-y-0 rounded-full shadow-[0_0_10px_rgba(223,27,63,0.6)]"></div>
        </div>

        <div className="flex flex-col pb-10 w-full md:pl-20 z-10">
          {processSteps.map((step, idx) => {
            const isLast = idx === processSteps.length - 1;
            return (
              <div 
                key={idx} 
                className={`sticky border border-white rounded-[2rem] p-10 md:p-14 bg-white/90 backdrop-blur-xl flex flex-col gap-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ${!isLast ? 'mb-[20vh]' : ''}`}
                style={{ top: `calc(10rem + ${idx * 2}rem)` }}
              >
                {/* Huge Watermark Number */}
                <div className="absolute top-8 right-10 text-7xl md:text-9xl font-black text-gray-50 pointer-events-none select-none z-0">
                  {step.num}
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-6">
                    <span className="text-sm font-bold text-[#df1b3f] tracking-widest">{step.num}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#111] tracking-wide uppercase">{step.title}</h3>
                  </div>
                  <p className="text-gray-500 text-base md:text-[17px] leading-relaxed mb-8 max-w-lg">
                    {step.desc}
                  </p>
                  {step.bullets && step.bullets.length > 0 && (
                    <ul className="space-y-4">
                      {step.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-center gap-4 text-gray-600 text-base font-medium">
                          <span className="w-2 h-2 rounded-full bg-[#df1b3f] shadow-[0_0_8px_rgba(223,27,63,0.5)] shrink-0"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
    </section>
  );
}

import { useRef } from 'react';
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
      "Reviewing existing branding",
      "Target audience & competitor research",
      "Developing a comprehensive strategy"
    ]
  },
  {
    num: "02",
    title: "DESIGN",
    desc: "Once the concept is established, I move on to the design phase, creating a visual representation that reflects the brand and messaging.",
    bullets: [
      "Wireframing & interactive prototyping",
      "UI/UX Design crafting",
      "Design system generation"
    ]
  },
  {
    num: "03",
    title: "DEVELOPMENT",
    desc: "After the design is approved, I proceed to build the website using modern web technologies to ensure high performance and responsiveness.",
    bullets: [
      "Frontend & Backend architecture",
      "Performance & SEO optimization",
      "Deployment & rigorous testing"
    ]
  }
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const mm = gsap.matchMedia();

    // Desktop: Pinned timeline with comfortable reading duration and smooth progression
    mm.add("(min-width: 1024px)", () => {
      // Step 1 starts visible, Step 2 & 3 start hidden
      gsap.set(cards[0], { opacity: 1, y: 0, scale: 1 });
      gsap.set(cards.slice(1), { opacity: 0.15, y: 30, scale: 0.98 });

      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleY: 0.33 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=2600',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // 1. Hold on Step 1 for user to read
      tl.to({}, { duration: 1.2 })

      // 2. Transition smoothly to Step 2
      .to(cards[0], {
        opacity: 0.85,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
      })
      .to(cards[1], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: 'power2.out'
      }, '<')
      .to(lineRef.current, {
        scaleY: 0.66,
        duration: 1.0,
        ease: 'none'
      }, '<')

      // Hold on Step 2
      .to({}, { duration: 1.2 })

      // 3. Transition smoothly to Step 3
      .to(cards[1], {
        opacity: 0.85,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
      })
      .to(cards[2], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: 'power2.out'
      }, '<')
      .to(lineRef.current, {
        scaleY: 1,
        duration: 1.0,
        ease: 'none'
      }, '<')

      // Hold with all 3 steps completed and fully visible before unpinning
      .to(cards, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      })
      .to({}, { duration: 1.8 });
    });

    // Mobile / Tablet: Smooth non-pinned entrance as cards enter viewport
    mm.add("(max-width: 1023px)", () => {
      cards.forEach((card) => {
        gsap.fromTo(card, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      if (lineRef.current) {
        gsap.to(lineRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: 0.5
          }
        });
      }
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section 
      id="process"
      ref={containerRef} 
      className="w-full min-h-screen bg-[#f9fafb] text-[#111] py-12 md:py-16 px-6 md:px-16 lg:px-24 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center relative z-10 font-sans border-t border-gray-100 overflow-hidden"
    >
      {/* Left Column: Title & Info */}
      <div className="w-full lg:w-5/12 flex flex-col items-start justify-center">
        <div className="flex items-center gap-4 mb-5">
          <div className="h-[2px] w-8 bg-[#df1b3f]"></div>
          <h4 className="text-[#df1b3f] text-xs font-bold tracking-[0.2em] uppercase">
            HOW WE WORK / PROCESS
          </h4>
        </div>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light mb-6 leading-[1.1] tracking-tight text-[#111]">
          Your Dream Website in<br/>
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#111] to-gray-500">just few steps</span>
        </h2>

        <p className="text-gray-500 mb-8 max-w-sm text-[15px] leading-relaxed">
          From consultation to launch, our streamlined process ensures timely delivery, crystal-clear communication, and outstanding quality work.
        </p>

        <a href="#contact" className="bg-[#111] text-white px-8 py-4 rounded-full text-xs font-bold tracking-[0.1em] flex items-center gap-3 hover:bg-[#df1b3f] hover:shadow-[0_8px_20px_rgba(223,27,63,0.3)] transition-all duration-300 transform hover:-translate-y-1 group no-underline">
          GET IN TOUCH 
          <span className="group-hover:rotate-45 transition-transform duration-300">
            <FiArrowUpRight size={18} />
          </span>
        </a>
      </div>

      {/* Right Column: Vertical List of Cards */}
      <div className="w-full lg:w-7/12 relative flex items-center">
        
        {/* Animated Vertical Line Timeline */}
        <div className="hidden md:block absolute left-[15px] top-6 bottom-6 w-[2px] bg-gray-200 z-0 rounded-full">
          <div 
            ref={lineRef} 
            className="absolute top-0 left-0 w-full h-full bg-[#df1b3f] origin-top scale-y-0 rounded-full shadow-[0_0_10px_rgba(223,27,63,0.6)]"
          ></div>
        </div>

        {/* Cards list (One below another in order) */}
        <div className="flex flex-col gap-4 md:gap-5 w-full md:pl-14 z-10">
          {processSteps.map((step, index) => (
            <div 
              key={step.num}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="relative border border-gray-100 rounded-2xl p-5 md:p-6 bg-white flex flex-col gap-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] transition-shadow duration-300"
            >
              {/* Watermark Number */}
              <div className="absolute top-3 right-6 text-6xl md:text-7xl font-black text-gray-100 pointer-events-none select-none z-0">
                {step.num}
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[11px] font-bold text-[#df1b3f] tracking-widest bg-red-50 px-2.5 py-0.5 rounded-full">{step.num}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-[#111] tracking-wide uppercase">{step.title}</h3>
                </div>

                <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-3 max-w-xl">
                  {step.desc}
                </p>

                {step.bullets && step.bullets.length > 0 && (
                  <ul className="flex flex-wrap gap-x-6 gap-y-1.5 pt-2.5 border-t border-gray-100">
                    {step.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600 text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#df1b3f] shadow-[0_0_6px_rgba(223,27,63,0.5)] shrink-0"></span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}

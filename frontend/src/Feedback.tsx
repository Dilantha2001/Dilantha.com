import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import feedback1 from './assets/images (50).jfif';
import feedback2 from './assets/images (51).jfif';
import feedback3 from './assets/images (52).jfif';
import feedback4 from './assets/images (53).jfif';
import feedback5 from './assets/images (54).jfif';
import feedback6 from './assets/images (55).jfif';
import feedback7 from './assets/images (56).jfif';
import feedback8 from './assets/images (57).jfif';
import feedback9 from './assets/images (58).jfif';
import feedback10 from './assets/images (59).jfif';
import feedback11 from './assets/images (60).jfif';
import feedback12 from './assets/images (61).jfif';

gsap.registerPlugin(ScrollTrigger);

const feedbacks = [
  { name: "Sarah Jenkins", role: "Creative Director", text: "Dilantha completely transformed our brand. The attention to detail is just unmatched.", rating: 5, avatar: "https://i.pravatar.cc/150?u=sarah", flag: "🇺🇸", projectImage: feedback1 },
  { name: "Michael Chen", role: "Startup Founder", text: "The sickest GSAP animations I've ever seen. Our conversion rate doubled.", rating: 5, avatar: "https://i.pravatar.cc/150?u=michael", flag: "🇨🇦", projectImage: feedback5 },
  { name: "Emma Watson", role: "Marketing Head", text: "A true visionary. He doesn't just design, he architects experiences.", rating: 5, avatar: "https://i.pravatar.cc/150?u=emma", flag: "🇬🇧", projectImage: feedback2 },
  { name: "David Miller", role: "CEO @ TechNova", text: "Delivered ahead of schedule and blew our minds. The 3D elements are flawless.", rating: 5, avatar: "https://i.pravatar.cc/150?u=david", flag: "🇦🇺", projectImage: feedback6 },
  { name: "Sophie Turner", role: "Art Director", text: "Finally, a developer who actually understands design and typography.", rating: 5, avatar: "https://i.pravatar.cc/150?u=sophie", flag: "🇩🇪", projectImage: feedback3 },
  { name: "James Wilson", role: "E-commerce Owner", text: "Our website feels alive now. The buttery smooth scrolling is addictive.", rating: 5, avatar: "https://i.pravatar.cc/150?u=james", flag: "🇳🇿", projectImage: feedback7 },
  { name: "Olivia Davis", role: "Product Manager", text: "Insane work ethic. He debugged and rebuilt our core layout in a day.", rating: 5, avatar: "https://i.pravatar.cc/150?u=olivia", flag: "🇮🇪", projectImage: feedback4 },
  { name: "Liam Smith", role: "Agency Partner", text: "We offshore all our premium client builds to him now. Absolute beast.", rating: 5, avatar: "https://i.pravatar.cc/150?u=liam", flag: "🇺🇸", projectImage: feedback8 },
  { name: "Ava Taylor", role: "UI/UX Lead", text: "The transition effects are out of this world. Pixel perfect execution.", rating: 5, avatar: "https://i.pravatar.cc/150?u=ava", flag: "🇨🇦", projectImage: feedback10 },
  { name: "Noah Brown", role: "Tech Lead", text: "Clean code, amazing structure, and the visual result is just stunning.", rating: 5, avatar: "https://i.pravatar.cc/150?u=noah", flag: "🇬🇧", projectImage: feedback9 },
  { name: "Mia Johnson", role: "Content Creator", text: "My portfolio went viral just because of the crazy scroll animations he added!", rating: 5, avatar: "https://i.pravatar.cc/150?u=mia", flag: "🇦🇺", projectImage: feedback11 },
  { name: "Lucas White", role: "Brand Strategist", text: "He brought our rigid Figma designs to life with so much personality.", rating: 5, avatar: "https://i.pravatar.cc/150?u=lucas", flag: "🇺🇸", projectImage: feedback12 },
];

export default function Feedback() {
  const containerRef = useRef<HTMLDivElement>(null);
  const qRef = useRef<gsap.utils.SelectorFunc | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    
    // Create the timeline for the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500", // pin for a while
        pin: true,
        scrub: 1, // scrub the falling images
        refreshPriority: 0,
      }
    });

    // 1. Initial State: Images are randomly rotated, scaled, and scattered off-screen top/left/right
    const gridItems = q('.grid-item');
    
    gridItems.forEach((item, i) => {
      gsap.set(item, {
        y: () => -window.innerHeight - Math.random() * 500, // way above screen
        x: 0, // Fall straight down without random x spread
        scale: () => 1.2 + Math.random(), // slightly larger initial scale
        opacity: 0
      });
    });

    // 2. Animate images falling into their proper CSS grid places
    tl.to(gridItems, {
      y: 0,
      x: 0,
      rotation: 0,
      scale: 1,
      opacity: 1, // Keep them fully visible
      duration: 2,
      stagger: {
        amount: 1,
        from: "random"
      },
      ease: "power2.out"
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#111] overflow-hidden flex items-center justify-center">
      
      {/* Background Feedback Grid */}
      <div className="absolute inset-0 w-full h-full grid grid-cols-4 grid-rows-3 gap-6 pointer-events-none z-0 p-8">
        {feedbacks.map((fb, i) => (
          <div key={i} className="grid-item relative w-full h-full rounded-2xl shadow-2xl bg-[#181818]/90 backdrop-blur-md border border-white/5 flex flex-col overflow-hidden">
            {fb.projectImage && (
              <div className="h-[45%] w-full flex-shrink-0 border-b border-white/10 relative group overflow-hidden">
                <img src={fb.projectImage} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" alt="Project Design" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/90 via-[#181818]/10 to-transparent"></div>
              </div>
            )}
            <div className={`flex flex-col flex-grow ${fb.projectImage ? 'p-4 gap-2' : 'p-6 gap-4'}`}>
              <div className="flex text-[#df1b3f] text-xs md:text-sm">
                {'★'.repeat(fb.rating || 5)}
              </div>
              <p className="text-white/80 text-[10px] md:text-xs lg:text-sm font-light italic overflow-hidden line-clamp-3">"{fb.text}"</p>
              <div className="mt-auto flex items-center gap-3 pt-2">
                <div className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
                  <img src={fb.avatar} alt={fb.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-bold tracking-wider text-[10px] md:text-xs truncate">{fb.name}</h4>
                    <span className="text-[10px] md:text-xs flex-shrink-0" title="Country Flag">{fb.flag}</span>
                  </div>
                  <span className="text-[8px] md:text-[10px] text-[#df1b3f] uppercase tracking-widest truncate">{fb.role}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>





    </section>
  );
}

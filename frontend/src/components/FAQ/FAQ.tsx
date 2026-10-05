import { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What is your design process like?",
    answer: "I start by understanding your brand's core identity and goals. From there, I create low-fidelity wireframes to establish layout and user flow, before diving into high-fidelity Figma designs. Once approved, I build it using modern web technologies like React, GSAP, and Tailwind."
  },
  {
    question: "How long does a typical project take?",
    answer: "It entirely depends on the scope of the project. A standard landing page might take 1-2 weeks, while a full e-commerce platform or custom web application can take anywhere from 4 to 8 weeks. I always provide a clear timeline before we begin."
  },
  {
    question: "Do you only do design, or development too?",
    answer: "I am a full-stack product designer and developer. I handle the entire lifecycle—from the initial Figma designs and prototyping to the final deployment using React, Node, and modern databases. You get a seamless end-to-end service."
  },
  {
    question: "Can you add 3D elements and animations to my existing site?",
    answer: "Absolutely. I specialize in GSAP, Three.js, and WebGL. I can audit your current website and integrate high-end micro-interactions, scroll animations, and 3D objects to significantly elevate the user experience."
  }
];

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Entrance animation
    gsap.from('.faq-item', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });
  }, { scope: containerRef });

  useLayoutEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (!ref) return;
      if (openIndex === index) {
        gsap.to(ref, {
          height: 'auto',
          opacity: 1,
          duration: 0.6,
          ease: "expo.out"
        });
      } else {
        gsap.to(ref, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.inOut"
        });
      }
    });
  }, [openIndex]);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={containerRef} className="relative w-full bg-white py-32 px-8 z-10 border-t border-black/5">
      <div className="max-w-4xl mx-auto flex flex-col gap-16">
        
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-light text-black tracking-tight">
            Frequently Asked <span className="font-serif italic text-[#0052ff]">Questions</span>
          </h2>
          <p className="mt-4 text-black/50 text-sm md:text-base max-w-lg mx-auto">
            Everything you need to know about my process and how we can work together.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className="faq-item group cursor-pointer border-b border-black/10 pb-4 transition-colors hover:border-black/30"
                onClick={() => toggleFaq(i)}
              >
                <div className="flex justify-between items-center py-6">
                  <h3 className={`text-lg md:text-2xl transition-colors duration-300 ${isOpen ? 'text-[#0052ff]' : 'text-black'}`}>
                    {faq.question}
                  </h3>
                  <div className={`relative w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'border-[#0052ff] bg-[#0052ff]/10' : 'border-black/20'}`}>
                    <span className={`absolute w-3.5 h-[1.5px] bg-current transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180 text-[#0052ff]' : 'text-black'}`}></span>
                    <span className={`absolute w-3.5 h-[1.5px] bg-current transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180 text-[#0052ff] opacity-0' : 'rotate-90 text-black'}`}></span>
                  </div>
                </div>
                
                <div 
                  ref={el => { contentRefs.current[i] = el; }}
                  className="overflow-hidden h-0 opacity-0"
                >
                  <p className="text-black/60 font-light pb-6 pr-12 leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

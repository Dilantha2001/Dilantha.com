import React, { useState, useRef } from 'react';
import './ServicesList.css';

const services = [
  {
    num: '01',
    title: 'Brand identity',
    desc: "We get into the actual substance of what you're building before touching a single visual. What you stand for, who you're really talking to, what makes you different. Once we know that, we build the identity around it. Rooted in something real, not just something pretty.",
    img: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=400&q=80'
  },
  {
    num: '02',
    title: 'Website design',
    desc: "A brand that lives nowhere is just an idea. We build where yours shows up. Starting with what your audience actually needs when they land there, not with what looks good in a mockup. Clear, considered, built to work.",
    img: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=400&q=80'
  },
  {
    num: '03',
    title: 'UI/UX Design',
    desc: "Creating intuitive and stunning user interfaces. Designing experiences that captivate and convert your audience. Every touchpoint is carefully crafted.",
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80'
  },
  {
    num: '04',
    title: 'Frontend Development',
    desc: "Bringing designs to life with interactive, pixel-perfect, and highly responsive user interfaces using modern web technologies like React, GSAP, and TailwindCSS.",
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80'
  },
  {
    num: '05',
    title: 'Backend Development',
    desc: "Building scalable, robust, and secure server-side architectures and APIs. Turning complex business logic into clean, high-performance code that stands the test of time.",
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80'
  }
];

export default function ServicesList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const floatingRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (floatingRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      
      floatingRef.current.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(1)`;
    }
  };

  const handleMouseLeave = () => {
    if (floatingRef.current) {
      floatingRef.current.style.transform = `translate(-50%, -50%) scale(1)`;
    }
  };

  return (
    <section 
      id="services"
      className="services-container relative" 
      onMouseLeave={() => {
        setHoveredIndex(0);
        handleMouseLeave();
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Section Header */}
      <div className="services-header-box px-8 md:px-16 lg:px-24 pt-10 pb-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-[2px] w-8 bg-[#df1b3f]"></div>
          <h4 className="text-[#df1b3f] text-xs font-bold tracking-[0.2em] uppercase font-sans">
            SERVICES // WHAT I OFFER
          </h4>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#111] tracking-tight uppercase" style={{ fontFamily: 'Anton, sans-serif' }}>
          Crafting Digital <span className="text-[#df1b3f]">Experiences</span>
        </h2>
      </div>

      {/* Single floating image for all rows */}
      <div 
        ref={floatingRef}
        className={`service-image-wrapper ${hoveredIndex !== null ? 'visible' : ''} pointer-events-none`}
      >
        <div className="service-image-frame">
          <img 
            src={services[hoveredIndex !== null ? hoveredIndex : 0].img} 
            alt="Service preview" 
            className="service-image" 
          />
        </div>
      </div>
      {services.map((svc, index) => {
        const isActive = hoveredIndex === index;
        return (
          <div 
            key={svc.num} 
            className={`service-row ${isActive ? 'active' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
          >
            <div className="service-content">
              <h3 className="service-title">
                <span className="service-num">{svc.num} &mdash; </span>
                {svc.title.toLowerCase()}
              </h3>
              <p className="service-desc">
                {svc.desc}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

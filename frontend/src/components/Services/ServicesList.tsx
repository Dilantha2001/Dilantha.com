import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import frontendVideo from '../../assets/frontend.mp4';
import dbVideo from '../../assets/db.mp4';
import cloudVideo from '../../assets/cloud.mp4';
import threeDVideo from '../../assets/3d.mp4';
import aiVideo from '../../assets/ai.mp4';
import './ServicesList.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: '01',
    title: 'Frontend Engineering',
    desc: 'Crafting pixel-perfect, reactive user interfaces with React, Next.js, TypeScript, and micro-interactions.',
    img: frontendVideo,
  },
  {
    num: '02',
    title: 'Backend & API Architecture',
    desc: 'Designing resilient REST & GraphQL APIs, microservices, secure authentication, and high-throughput Node/Python backends.',
    img: dbVideo,
  },
  {
    num: '03',
    title: 'Database & Cloud Systems',
    desc: 'Architecting scalable SQL/NoSQL databases, distributed caching with Redis, CI/CD pipelines, and AWS cloud deployments.',
    img: cloudVideo,
  },
  {
    num: '04',
    title: 'Creative Motion & WebGL',
    desc: 'Building immersive, high-performance web experiences using GSAP animations, Three.js 3D viewports, and custom shaders.',
    img: threeDVideo,
  },
  {
    num: '05',
    title: 'AI & Intelligent Systems',
    desc: 'Integrating Large Language Models, vector search embeddings, computer vision, and real-time AI automation pipelines.',
    img: aiVideo,
  }
];

export default function ServicesList() {
  const containerRef = useRef<HTMLElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const [activeMedia, setActiveMedia] = useState<string>(services[0].img);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Row reveal animation on scroll
    const rows = gsap.utils.toArray('.clean-service-row') as HTMLElement[];
    rows.forEach((row) => {
      gsap.fromTo(
        row,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Smooth Cursor Media Follower
    if (cursorFollowerRef.current && containerRef.current) {
      const follower = cursorFollowerRef.current;
      const xTo = gsap.quickTo(follower, 'x', { duration: 0.35, ease: 'power3.out' });
      const yTo = gsap.quickTo(follower, 'y', { duration: 0.35, ease: 'power3.out' });
      const rotTo = gsap.quickTo(follower, 'rotation', { duration: 0.45, ease: 'power3.out' });

      let prevX = 0;

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - prevX;
        prevX = e.clientX;

        xTo(e.clientX);
        yTo(e.clientY);
        rotTo(gsap.utils.clamp(-12, 12, deltaX * 0.4));
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }

  }, { scope: containerRef });

  const handleRowEnter = (mediaSrc: string) => {
    setActiveMedia(mediaSrc);
    if (cursorFollowerRef.current) {
      gsap.to(cursorFollowerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleRowLeave = () => {
    if (cursorFollowerRef.current) {
      gsap.to(cursorFollowerRef.current, {
        scale: 0.75,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        overwrite: 'auto',
      });
    }
  };

  return (
    <section 
      id="services" 
      ref={containerRef} 
      className="clean-services-section"
      onMouseLeave={handleRowLeave}
    >
      <div className="clean-services-container">
        
        {/* Section Top Header */}
        <div className="clean-services-header">
          <div className="services-tag-row">
            <span className="services-dot"></span>
            <span className="services-tag-text">SERVICES & EXPERTISE</span>
          </div>
          <h2 className="services-section-title">
            SOLUTIONS CRAFTED <span className="text-[#0052ff]">FOR IMPACT</span>
          </h2>
        </div>

        {/* Minimal 3-Column Editorial List */}
        <div className="clean-services-list">
          {services.map((svc) => (
            <div 
              key={svc.num} 
              className="clean-service-row group"
              onMouseEnter={() => handleRowEnter(svc.img)}
            >
              
              {/* Left Column: Number */}
              <div className="clean-num-col">
                <span className="clean-num-text">{svc.num}</span>
              </div>

              {/* Middle Column: Bold Title */}
              <div className="clean-title-col">
                <h3 className="clean-title-text">{svc.title}</h3>
              </div>

              {/* Right Column: Clean Description Paragraph */}
              <div className="clean-desc-col">
                <p className="clean-desc-text">{svc.desc}</p>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Floating Mouse Cursor Media Follower */}
      <div 
        ref={cursorFollowerRef} 
        className="service-cursor-follower"
        aria-hidden="true"
      >
        <div className="service-cursor-img-box">
          {(activeMedia.includes('.mp4') || activeMedia.endsWith('.mp4')) ? (
            <video 
              key={activeMedia}
              src={activeMedia} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="service-cursor-img" 
            />
          ) : (
            <img 
              src={activeMedia} 
              alt="Service Preview" 
              className="service-cursor-img" 
            />
          )}
        </div>
      </div>

    </section>
  );
}

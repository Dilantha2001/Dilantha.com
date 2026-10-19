import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './RecentWorks.css';

gsap.registerPlugin(ScrollTrigger);

// Curated featured projects (4 projects in uniform 2x2 grid)
// All 4 projects feature smooth auto-playing showcase videos
const featuredProjects = [
  {
    id: "01",
    title: "Music Streaming Application",
    subtitle: "Full-Stack Audio Platform & Aggregation Engine",
    date: "@2026",
    tags: ["UI / UX DESIGN", "REACT · NODE"],
    image: "https://res.cloudinary.com/dymkikwdc/video/upload/f_auto,q_auto/v1791980462/1003_1_cscbnx.mp4",
    url: "https://github.com/Dilantha2001/MusicApplication",
  },
  {
    id: "02",
    title: "Smokio Digital Experience",
    subtitle: "High-Performance Interactive Web Application",
    date: "@2025",
    tags: ["WEB DEVELOPMENT", "GSAP · THREE.JS"],
    image: "https://res.cloudinary.com/dymkikwdc/video/upload/v1791985711/1014_4_s36zn6.mp4",
    url: "https://wondrous-zuccutto-2cd2ce.netlify.app/",
  },
  {
    id: "03",
    title: "Pirl Travels Experience",
    subtitle: "Interactive Travel Platform with Fluid GSAP Animations",
    date: "@2025",
    tags: ["TRAVEL & HOSPITALITY", "GSAP · REACT"],
    image: "https://res.cloudinary.com/dymkikwdc/video/upload/v1791983355/1014_3_bdxhxj.mp4",
    url: "https://ornate-monstera-997a7d.netlify.app/",
  },
  {
    id: "04",
    title: "Wedding Photography & Planning Suite",
    subtitle: "High-Resolution Gallery & Event Booking Platform",
    date: "@2025",
    tags: ["UI / UX DESIGN", "REACT · TAILWIND"],
    image: "https://res.cloudinary.com/dymkikwdc/video/upload/v1792428533/1019_2_xjb2ul.mp4",
    url: "https://my-project-pied-gamma-94.vercel.app/",
  },
];

export default function RecentWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Header reveal
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        }
      );
    }

    // High-Performance GPU-accelerated scale & appear entrance
    const cards = gsap.utils.toArray('.recent-work-card') as HTMLElement[];
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 45,
          scale: 0.90,
          force3D: true,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section id="works" ref={sectionRef} className="recent-works-section">
      <div className="recent-works-container">
        
        {/* Section Top Header */}
        <div ref={headerRef} className="recent-works-header-block">
          <div className="recent-works-tag-row">
            <span className="recent-works-dot"></span>
            <span className="recent-works-tag-text">SELECTED WORKS & CASE STUDIES</span>
          </div>
          <h2 className="recent-works-title">
            RECENT <span className="title-accent">WORKS</span>
          </h2>
        </div>

        {/* Uniform 2x2 Grid for All 4 Projects */}
        <div ref={gridRef} className="recent-works-grid">
          {featuredProjects.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="recent-work-card"
            >
              {/* Media Container */}
              {(() => {
                const isVideo = project.image.includes('.mp4');
                return (
                  <div className={`card-media-wrapper ${isVideo ? 'has-video' : ''}`}>
                    {isVideo ? (
                      <video
                        src={project.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="card-media-img card-media-video"
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="card-media-img"
                      />
                    )}
                    
                    {/* Floating Tags Pills */}
                    <div className="card-floating-tags">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Corner Hover Indicator Icon */}
                    <div className="card-hover-arrow">
                      <span>↗</span>
                    </div>
                  </div>
                );
              })()}

              {/* Bottom Metadata */}
              <div className="card-info-row">
                <div className="card-title-group">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-subtitle">{project.subtitle}</p>
                </div>
                <div className="card-date-tag">
                  {project.date}
                </div>
              </div>
            </a>
          ))}
        </div>


      </div>
    </section>
  );
}

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './RecentWorks.css';

gsap.registerPlugin(ScrollTrigger);

// Curated featured projects with layout proportions (wide = 60%, compact = 40%)
const featuredProjects = [
  {
    id: "01",
    title: "Music Streaming Application",
    subtitle: "Full-Stack Audio Platform & Aggregation Engine",
    date: "@2026",
    tags: ["UI / UX DESIGN", "REACT · NODE"],
    isWide: true,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    url: "https://github.com/Dilantha2001/MusicApplication",
  },
  {
    id: "02",
    title: "AI Canine Emotion Monitor",
    subtitle: "Multimodal Computer Vision & Audio AI",
    date: "@2026",
    tags: ["AI / RESEARCH", "PYTHON · YOLO"],
    isWide: false,
    image: "https://images.unsplash.com/photo-1534361960057-19889db98a1e?auto=format&fit=crop&w=800&q=80",
    url: "https://github.com/Dilantha2001/dogsense-analytics",
  },
  {
    id: "03",
    title: "Trust Post Logistics Platform",
    subtitle: "Real-Time Tracking & Nationwide Fleet System",
    date: "@2025",
    tags: ["FULL STACK", "POSTGRESQL"],
    isWide: false,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    url: "https://github.com/Dilantha2001/PostOffice",
  },
  {
    id: "04",
    title: "Smokio Digital Experience",
    subtitle: "High-Performance Interactive Web Application",
    date: "@2025",
    tags: ["WEB DEVELOPMENT", "GSAP · THREE.JS"],
    isWide: true,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    url: "https://wondrous-zuccutto-2cd2ce.netlify.app/",
  },
  {
    id: "05",
    title: "E-Commerce Luxury Store",
    subtitle: "Scalable Storefront, Cart & Secure Payments",
    date: "@2025",
    tags: ["ECOMMERCE", "TYPESCRIPT · SQL"],
    isWide: true,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    url: "https://github.com/Dilantha2001/Private-Store",
  },
  {
    id: "06",
    title: "Wedding Planning & Gallery Portal",
    subtitle: "High-Resolution Gallery & Event Booking",
    date: "@2024",
    tags: ["UI / UX DESIGN", "REACT · MONGO"],
    isWide: false,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    url: "https://comfy-medovik-ee1f2a.netlify.app/",
  },
];

export default function RecentWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Header reveal
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Cards reveal with stagger
    const cards = gsap.utils.toArray('.recent-work-card') as HTMLElement[];
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section id="works" ref={sectionRef} className="recent-works-section">
      <div className="recent-works-container">
        
        {/* Top Meta Bar */}
        <div ref={headerRef} className="recent-works-header-block">
          <div className="recent-works-top-bar">
            <div className="top-bar-left">
              <span className="dot-indicator"></span>
              <span className="top-bar-text">FEATURED PROJECTS</span>
            </div>
            <div className="top-bar-cross">+</div>
            <div className="top-bar-right">
              <span>@2026</span>
            </div>
          </div>

          {/* Giant Title with Counter Badge */}
          <div className="recent-works-title-row">
            <h2 className="recent-works-title">
              RECENT WORKS
            </h2>
            <span className="recent-works-count">
              [+{String(featuredProjects.length).padStart(2, '0')}]
            </span>
          </div>
        </div>

        {/* Asymmetric 2-Column Responsive Grid */}
        <div ref={gridRef} className="recent-works-grid">
          {featuredProjects.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className={`recent-work-card ${project.isWide ? 'card-wide' : 'card-compact'}`}
            >
              {/* Media Container */}
              <div className="card-media-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="card-media-img"
                />
                
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

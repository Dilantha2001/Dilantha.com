import { useEffect } from 'react';
import { 
  FiX, 
  FiExternalLink, 
  FiLayers, 
  FiCode, 
  FiCheckCircle, 
  FiUser, 
  FiCalendar, 
  FiCpu,
  FiServer,
  FiTruck,
  FiAward,
} from 'react-icons/fi';
import { 
  SiReact,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiCloudinary,
  SiDocker,
  SiNetlify,
  SiVite,
  SiGreensock,
  SiFigma,
  SiFastapi,
  SiHuggingface,
  SiOpencv,
} from 'react-icons/si';
import { FaGithub, FaCss3Alt, FaHtml5 } from 'react-icons/fa';
import './ProjectModal.css';

export interface ProjectModalData {
  id: string;
  rawId: string;
  title: string;
  subtitle: string;
  category?: string;
  role?: string;
  description: string;
  highlights?: string[];
  tags: string[];
  image: string;
  links?: { label: string; url: string; icon?: string }[];
  date?: string;
}

interface ProjectModalProps {
  project: ProjectModalData | null;
  onClose: () => void;
}

const renderTagIcon = (tag: string) => {
  const t = tag.toLowerCase().trim();
  
  if (t === 'react' || t.includes('react')) return <SiReact size={14} color="#61DAFB" />;
  if (t.includes('tailwind')) return <SiTailwindcss size={14} color="#38BDF8" />;
  if (t.includes('mongo')) return <SiMongodb size={14} color="#47A248" />;
  if (t.includes('express')) return <SiExpress size={14} color="#E2E8F0" />;
  if (t.includes('node')) return <SiNodedotjs size={14} color="#68A063" />;
  if (t.includes('typescript')) return <SiTypescript size={14} color="#3178C6" />;
  if (t.includes('javascript')) return <SiJavascript size={14} color="#F7DF1E" />;
  if (t.includes('python')) return <SiPython size={14} color="#3776AB" />;
  if (t.includes('tensor')) return <SiTensorflow size={14} color="#FF6F00" />;
  if (t.includes('pytorch')) return <SiPytorch size={14} color="#EE4C2C" />;
  if (t.includes('postgre')) return <SiPostgresql size={14} color="#4169E1" />;
  if (t.includes('sql') || t.includes('mysql')) return <SiMysql size={14} color="#4479A1" />;
  if (t.includes('firebase')) return <SiFirebase size={14} color="#FFCA28" />;
  if (t.includes('cloudinary')) return <SiCloudinary size={14} color="#3448C5" />;
  if (t.includes('docker')) return <SiDocker size={14} color="#2496ED" />;
  if (t.includes('netlify')) return <SiNetlify size={14} color="#00C7B7" />;
  if (t.includes('vite')) return <SiVite size={14} color="#646CFF" />;
  if (t.includes('gsap')) return <SiGreensock size={14} color="#88CE02" />;
  if (t.includes('figma') || t.includes('ui/ux') || t.includes('design')) return <SiFigma size={14} color="#F24E1E" />;
  if (t.includes('fastapi')) return <SiFastapi size={14} color="#009688" />;
  if (t.includes('hugging') || t.includes('transformer') || t.includes('nlp')) return <SiHuggingface size={14} color="#FFD21E" />;
  if (t.includes('vision') || t.includes('opencv') || t.includes('yolo') || t.includes('resnet')) return <SiOpencv size={14} color="#5C3EE8" />;
  if (t.includes('html')) return <FaHtml5 size={14} color="#E34F26" />;
  if (t.includes('css')) return <FaCss3Alt size={14} color="#1572B6" />;
  if (t.includes('rest') || t.includes('api')) return <FiServer size={14} color="#60A5FA" />;
  if (t.includes('logistics') || t.includes('gps')) return <FiTruck size={14} color="#F59E0B" />;
  if (t.includes('deep learning') || t.includes('ai') || t.includes('machine learning')) return <FiCpu size={14} color="#A855F7" />;
  if (t.includes('full') || t.includes('stack')) return <FiLayers size={14} color="#3B82F6" />;
  if (t.includes('showcase') || t.includes('research')) return <FiAward size={14} color="#EC4899" />;
  
  return <FiCode size={13} className="text-[#0052ff]" />;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [project, onClose]);

  if (!project) return null;

  // Find GitHub or Demo links if available
  const githubLink = project.links?.find((l) => 
    l.label?.toLowerCase().includes('github') || l.url?.includes('github.com')
  );
  const liveDemoLink = project.links?.find((l) => 
    l.label?.toLowerCase().includes('demo') || 
    l.label?.toLowerCase().includes('live') || 
    (!l.url?.includes('github.com') && l.url !== '#')
  );

  return (
    <div 
      className="project-modal-backdrop"
      onClick={onClose}
      onWheel={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="project-modal-container"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          className="project-modal-close-btn"
          onClick={onClose}
          aria-label="Close project modal"
        >
          <FiX size={20} strokeWidth={2.4} />
        </button>

        {/* Media Showcase Banner */}
        <div className="project-modal-media-wrap">
          {/* Ambient Backdrop Blur */}
          {project.image.endsWith('.mp4') ? (
            <video 
              src={project.image} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="project-modal-media-blur"
            />
          ) : (
            <img 
              src={project.image} 
              alt="" 
              aria-hidden="true"
              className="project-modal-media-blur"
            />
          )}

          {/* Index Badge */}
          <div className="project-modal-index-badge">
            <span className="project-modal-badge-dot" />
            <span>PROJECT {project.id}</span>
          </div>

          {project.image.endsWith('.mp4') ? (
            <video 
              src={project.image} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="project-modal-media-main"
            />
          ) : (
            <img 
              src={project.image} 
              alt={project.title} 
              className="project-modal-media-main"
            />
          )}
          <div className="project-modal-media-gradient" />
        </div>

        {/* Modal Body */}
        <div className="project-modal-body">
          
          {/* Top Meta Specifications */}
          <div className="project-modal-spec-bar">
            {project.category && (
              <span className="project-spec-item">
                <FiLayers size={13} className="text-[#0052ff]" />
                <span>{project.category}</span>
              </span>
            )}
            {project.role && (
              <span className="project-spec-item">
                <FiUser size={13} className="text-[#0052ff]" />
                <span>{project.role}</span>
              </span>
            )}
            {project.date && (
              <span className="project-spec-item">
                <FiCalendar size={13} className="text-[#0052ff]" />
                <span>{project.date}</span>
              </span>
            )}
          </div>

          {/* Title Row */}
          <div className="project-modal-title-row">
            <h2 className="project-modal-title">{project.title}</h2>
          </div>

          {/* Detailed Executive Overview */}
          {project.description && (
            <div className="project-modal-desc-box">
              <div className="project-modal-box-header">
                <FiCpu size={14} className="text-[#0052ff]" />
                <span>Executive Overview</span>
              </div>
              <p>{project.description}</p>
            </div>
          )}

          {/* Key Engineering Highlights & Core Features */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="project-modal-highlights-section">
              <div className="project-modal-section-title">
                Key Features & Engineering Highlights
              </div>
              <div className="project-modal-highlights-grid">
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="project-modal-highlight-item">
                    <FiCheckCircle size={15} className="text-[#0052ff] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Tags */}
          {project.tags && project.tags.length > 0 && (
            <div>
              <div className="project-modal-section-title">
                Technologies & Architecture Stack
              </div>
              <div className="project-modal-tags-grid">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="project-modal-tag-pill">
                    {renderTagIcon(tag)}
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links & CTA Action Buttons */}
          <div className="project-modal-actions">
            {githubLink && (
              <a 
                href={githubLink.url} 
                target="_blank" 
                rel="noreferrer"
                className="project-modal-btn-primary"
              >
                <FaGithub size={17} />
                <span>Explore Source Code</span>
                <FiExternalLink size={14} />
              </a>
            )}

            {liveDemoLink && liveDemoLink.url !== '#' && (
              <a 
                href={liveDemoLink.url} 
                target="_blank" 
                rel="noreferrer"
                className="project-modal-btn-secondary"
              >
                <span>Launch Live Preview</span>
                <FiExternalLink size={14} />
              </a>
            )}

            {(!githubLink && (!liveDemoLink || liveDemoLink.url === '#')) && (
              <span className="text-xs text-gray-400 font-medium tracking-wide">
                Private Enterprise Repository • Details & Demo Available on Request
              </span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

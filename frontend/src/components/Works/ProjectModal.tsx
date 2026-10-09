import { useEffect } from 'react';
import { FiX, FiExternalLink, FiLayers, FiCode } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import './ProjectModal.css';

export interface ProjectModalData {
  id: string;
  rawId: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  links?: { label: string; url: string; icon?: string }[];
  date?: string;
}

interface ProjectModalProps {
  project: ProjectModalData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
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
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="project-modal-container"
        onClick={(e) => e.stopPropagation()}
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
            />
          ) : (
            <img 
              src={project.image} 
              alt={project.title} 
            />
          )}
          <div className="project-modal-media-gradient" />
        </div>

        {/* Modal Body */}
        <div className="project-modal-body">
          
          {/* Title & Subtitle */}
          <div className="project-modal-title-row">
            <div className="project-modal-subtitle">
              <FiLayers size={14} />
              <span>{project.subtitle}</span>
              {project.date && <span>• {project.date}</span>}
            </div>
            <h2 className="project-modal-title">{project.title}</h2>
          </div>

          {/* Detailed Description */}
          {project.description && (
            <div className="project-modal-desc-box">
              <p>{project.description}</p>
            </div>
          )}

          {/* Tech Stack Tags */}
          {project.tags && project.tags.length > 0 && (
            <div>
              <div className="project-modal-section-title">
                Technologies & Architecture
              </div>
              <div className="project-modal-tags-grid">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="project-modal-tag-pill">
                    <FiCode size={12} className="text-[#0052ff]" />
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
                <span>View Source Code</span>
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
                <span>Live Demonstration</span>
                <FiExternalLink size={14} />
              </a>
            )}

            {(!githubLink && (!liveDemoLink || liveDemoLink.url === '#')) && (
              <span className="text-xs text-gray-400 font-medium tracking-wide">
                Repository access available upon request.
              </span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import "./ScrollingProjectShowcase.css";

export interface Project {
  id?: string | number;
  title: string;
  description?: string;
  tags?: string[];
  links?: { label: string; url: string; icon: string }[];
  href?: string;
  image?: string;
}

interface Props {
  projects: Project[];
  onOpen?: (p: Project) => void;
}

export const ScrollingProjectShowcase: React.FC<Props> = ({ projects, onOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use IntersectionObserver to detect which project row is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(i);
          }
        },
        {
          root: null,
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [projects]);

  const activeProject = projects[activeIndex];
  const VISIBLE_TAGS = 4;

  return (
    <div ref={containerRef} className="sp-showcase-container">
      {/* ── LEFT: scrollable project list ── */}
      <div className="sp-left-panel">
        {projects.map((project, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={project.id ?? i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className={`sp-project-row ${isActive ? 'active' : ''}`}
              onClick={() => onOpen?.(project)}
            >
              {/* Index number */}
              <span className="sp-index">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <h3 className="sp-title">
                {project.title}
              </h3>

              {/* Description — only visible when active */}
              <motion.div
                initial={false}
                animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <p className="sp-desc">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="sp-tags">
                  {project.tags?.slice(0, VISIBLE_TAGS).map((t) => (
                    <span key={t} className="sp-tag">{t}</span>
                  ))}
                  {(project.tags?.length ?? 0) > VISIBLE_TAGS && (
                    <span className="sp-tag">
                      +{(project.tags?.length ?? 0) - VISIBLE_TAGS} more
                    </span>
                  )}
                </div>

                {/* Action links */}
                <div className="sp-actions">
                  {project.links?.map((link) => {
                    const Icon = (SiIcons as any)[link.icon] ?? (FaIcons as any)[link.icon];
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="sp-link"
                      >
                        {Icon && <Icon className="sp-icon" />}
                        {link.label}
                      </a>
                    );
                  })}
                  <button
                    onClick={(e) => { e.stopPropagation(); onOpen?.(project); }}
                    className="sp-btn"
                  >
                    <BsArrowUpRightCircleFill className="sp-icon" />
                    Details
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ── RIGHT: sticky demo preview ── */}
      <div className="sp-right-panel">
        <div className="sp-sticky-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject?.id ?? activeIndex}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="sp-preview-card"
            >
              {/* Browser-chrome mock wrapper */}
              <div className="sp-browser-mock">
                {/* Browser top bar */}
                <div className="sp-browser-header">
                  <span className="sp-dot dot-red" />
                  <span className="sp-dot dot-yellow" />
                  <span className="sp-dot dot-green" />
                  <div className="sp-url-bar">
                    <span className="sp-url-dot" />
                    <span className="sp-url-text">
                      {activeProject?.href && activeProject.href !== "#"
                        ? activeProject.href
                        : `dilantha.dev/projects/${activeProject?.id ?? ""}`}
                    </span>
                  </div>
                  {activeProject?.href && activeProject.href !== "#" && (
                    <a
                      href={activeProject.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sp-external-link"
                      title="Open live demo"
                    >
                      <FiExternalLink />
                    </a>
                  )}
                </div>

                {/* Project screenshot */}
                <div className="sp-screenshot">
                  {activeProject?.image ? (
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                    />
                  ) : (
                    <div className="sp-placeholder">
                      <span>{activeProject?.title?.slice(0, 2).toUpperCase()}</span>
                    </div>
                  )}
                  <div className="sp-gradient-overlay" />
                </div>
              </div>

              {/* Caption below screenshot */}
              <div className="sp-caption">
                <div>
                  <h4 className="sp-caption-title">
                    {activeProject?.title}
                  </h4>
                  <p className="sp-caption-tags">
                    {activeProject?.tags?.join(" · ")}
                  </p>
                </div>
                <span className="sp-caption-index">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}
                </span>
              </div>

              {/* Progress dots */}
              <div className="sp-progress">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      itemRefs.current[i]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                      setActiveIndex(i);
                    }}
                    className={`sp-progress-dot ${i === activeIndex ? "active" : ""}`}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

import * as SiIcons from 'react-icons/si';
import { TECH_STACK } from '../../data/portfolioData';
import './Technologies.css';

// Ensure proper icon matching for items
const getTechIcon = (name: string, iconName?: string) => {
  if (iconName && (SiIcons as any)[iconName]) {
    const IconComp = (SiIcons as any)[iconName];
    return <IconComp size={iconName === 'SiNodedotjs' ? 28 : 22} />;
  }
  if (name.toLowerCase().includes('webflow')) {
    return <SiIcons.SiWebflow size={22} />;
  }
  if (name.toLowerCase().includes('typescript')) {
    return <SiIcons.SiTypescript size={20} />;
  }
  return null;
};

export default function Technologies() {
  return (
    <section id="technologies" className="technologies-section">
      <div className="technologies-container">
        
        {/* Left Column: Heading & Summary */}
        <div className="technologies-left">
          <div className="tech-tag-row">
            <span className="tech-dot"></span>
            <span className="tech-tag-text">STACK & TOOLING</span>
          </div>
          <h2 className="tech-heading">
            Technologies <br />
            <span className="tech-heading-accent">I work with</span>
          </h2>
          <p className="tech-desc">
            A modern and scalable technology stack spanning performant UI engineering, robust APIs, distributed caching, and machine learning pipelines.
          </p>
        </div>

        {/* Right Column: 2-Column Tech Grid */}
        <div className="technologies-right">
          {TECH_STACK.map((t, i) => {
            const icon = getTechIcon(t.name, t.iconName);
            return (
              <div key={i} className="tech-item-row group">
                {icon && (
                  <span className="tech-icon-box">
                    {icon}
                  </span>
                )}
                <span className={`tech-name ${t.font}`}>{t.name}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

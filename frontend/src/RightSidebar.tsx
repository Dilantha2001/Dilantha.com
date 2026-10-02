import React from 'react';

interface RightSidebarProps {
  activeSection: string;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ activeSection }) => {
  return (
    <div className="intro-right">
      <div className="right-header">
        <h2 className="right-name"><span className="name-cream">Dilantha</span> <span className="name-red">Dev</span></h2>
        <div className="right-subtitle">CODE / MOTION / WEBGL</div>
      </div>

      <div className="social-icons">
        <span className="icon-box">in</span>
        <span className="icon-box">W</span>
        <span className="icon-box">Be</span>
        <span className="icon-box">🏀</span>
        <span className="icon-box">P</span>
      </div>

      <p className="bio-text">
        Frontend Developer | WordPress Developer<br/>
        JavaScript, PHP, WebGL, GSAP, Three.js
      </p>

      <div className="location-info">
        <span>📍 BASED IN HUNGARY</span>
        <span>🌐 WORKING WORLDWIDE</span>
      </div>

      <nav className="right-nav-menu">
        <ul>
          <li className={activeSection === 'INTRODUCE' ? 'text-[#df1b3f]' : ''}><span className={`nav-num ${activeSection === 'INTRODUCE' ? 'text-[#df1b3f]' : ''}`}>01</span> INTRODUCE</li>
          <li className={activeSection === 'SKILLS' ? 'text-[#df1b3f]' : ''}><span className={`nav-num ${activeSection === 'SKILLS' ? 'text-[#df1b3f]' : ''}`}>02</span> SKILLS</li>
          <li className={activeSection === 'WORKS' ? 'text-[#df1b3f]' : ''}><span className={`nav-num ${activeSection === 'WORKS' ? 'text-[#df1b3f]' : ''}`}>03</span> WORKS</li>
          <li className={activeSection === 'AWARDS' ? 'text-[#df1b3f]' : ''}><span className={`nav-num ${activeSection === 'AWARDS' ? 'text-[#df1b3f]' : ''}`}>04</span> AWARDS</li>
          <li className={activeSection === 'CONTACT' ? 'text-[#df1b3f]' : ''}><span className={`nav-num ${activeSection === 'CONTACT' ? 'text-[#df1b3f]' : ''}`}>05</span> CONTACT</li>
        </ul>
      </nav>

      <div className="portrait-box">
        <div className="portrait-label">PORTRAIT / 01</div>
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" 
          alt="Daniel Kiss Portrait" 
        />
      </div>

      <div className="email-box">
        <span>info@danielkiss.hu</span>
        <span className="email-icon">✉</span>
      </div>
    </div>
  );
};

export default RightSidebar;

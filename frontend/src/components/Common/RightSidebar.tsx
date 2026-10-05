interface RightSidebarProps {
  activeSection: string;
}

export default function RightSidebar({ activeSection }: RightSidebarProps) {
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
          <li className={activeSection === 'INTRODUCE' ? 'text-[#0052ff]' : ''}><span className={`nav-num ${activeSection === 'INTRODUCE' ? 'text-[#0052ff]' : ''}`}>01</span> INTRODUCE</li>
          <li className={activeSection === 'SKILLS' ? 'text-[#0052ff]' : ''}><span className={`nav-num ${activeSection === 'SKILLS' ? 'text-[#0052ff]' : ''}`}>02</span> SKILLS</li>
          <li className={activeSection === 'WORKS' ? 'text-[#0052ff]' : ''}><span className={`nav-num ${activeSection === 'WORKS' ? 'text-[#0052ff]' : ''}`}>03</span> WORKS</li>
          <li className={activeSection === 'AWARDS' ? 'text-[#0052ff]' : ''}><span className={`nav-num ${activeSection === 'AWARDS' ? 'text-[#0052ff]' : ''}`}>04</span> AWARDS</li>
          <li className={activeSection === 'CONTACT' ? 'text-[#0052ff]' : ''}><span className={`nav-num ${activeSection === 'CONTACT' ? 'text-[#0052ff]' : ''}`}>05</span> CONTACT</li>
        </ul>
      </nav>

    </div>
  );
}

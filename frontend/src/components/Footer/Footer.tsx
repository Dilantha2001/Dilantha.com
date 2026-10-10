import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import DlogoClean from '../../assets/Dlogo_clean.png';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [time, setTime] = useState("");
  const footerRef = useRef<HTMLElement>(null);
  const topAreaRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });

    if (topAreaRef.current) {
      tl.fromTo(
        topAreaRef.current.children,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          force3D: true,
        }
      );
    }

    if (giantTextRef.current) {
      tl.fromTo(
        giantTextRef.current,
        { opacity: 0, y: 50, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: 'power3.out',
          force3D: true,
        },
        '-=0.5'
      );
    }
  }, { scope: footerRef });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour12: false });
      setTime(timeString);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="custom-footer">
      
      {/* Top Content Area */}
      <div ref={topAreaRef} className="footer-top">
        
        {/* Left Side: Logo & Big Text */}
        <div className="footer-left">
          <div className="footer-logo-area">
            <img src={DlogoClean} alt="Dilantha Logo" className="footer-logo-img" />
            <div className="footer-brand-text">
              <span className="footer-brand-name">Dilantha</span>
              <span className="footer-brand-sub">Portfolio</span>
            </div>
          </div>
          
          <h2 className="footer-headline">
            AN AWARD WINNING FREELANCE WEB DEVELOPER AND DESIGNER. WEB DEVELOPMENT IS WHERE MY PASSION AND TALENT MEET.
          </h2>
        </div>

        {/* Right Side: Columns */}
        <div className="footer-right">
          <div className="footer-col">
            <h4>NAVIGATION</h4>
            <ul>
              <li><a href="#about">ABOUT</a></li>
              <li>
                <a href="#works" className="footer-nav-link">
                  <span>PROJECTS</span>
                  <span className="footer-count-badge">10</span>
                </a>
              </li>
              <li><a href="#process">PROCESS</a></li>
              <li><a href="#services">SERVICES</a></li>
              <li><a href="#contact">LET&apos;S CONNECT</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>SOCIAL</h4>
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/dilantha-ranaweera-825148295" target="_blank" rel="noreferrer" className="footer-social-link">
                  <FaLinkedin className="footer-social-icon linkedin-icon" />
                  <span>LINKEDIN</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/Dilantha2001" target="_blank" rel="noreferrer" className="footer-social-link">
                  <FaGithub className="footer-social-icon github-icon" />
                  <span>GITHUB</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-col email-col">
            <h4>DROP ME A LINE</h4>
            <a href="mailto:pramudithadilantha89@gmail.com" className="footer-email">
              PRAMUDITHADILANTHA89@GMAIL.COM
            </a>
          </div>
        </div>
      </div>

      {/* Middle Text Area */}
      <div className="footer-middle">
        <div className="fm-left">
          <p>INDEPENDENT DEVELOPER/DESIGNER SINCE 2018.</p>
          <p>© COPYRIGHT 2026 DILANTHA DEV. ALL RIGHTS RESERVED.</p>
        </div>
        <div className="fm-right">
          <p>LOCAL TIME : <span className="time-red">{time}</span></p>
          <p>DEVELOPMENT AND DESIGN HANDCRAFTED WITH PASSION BY <span className="name-red">DILANTHA DEV</span>.</p>
        </div>
      </div>

      {/* Giant Bottom Text */}
      <div ref={giantTextRef} className="footer-giant-text">
        DILANTHA
      </div>

      {/* Back to Top Button */}
      <button className="back-to-top" onClick={scrollToTop} aria-label="Back to Top">
        BACK TO TOP
      </button>

    </footer>
  );
}

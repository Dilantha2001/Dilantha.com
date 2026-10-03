import React, { useState, useEffect } from 'react';
import './Footer.css';

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      // You can adjust this to a specific timezone if needed, currently using local time
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
    <footer className="custom-footer">
      
      {/* Top Content Area */}
      <div className="footer-top">
        
        {/* Left Side: Logo & Big Text */}
        <div className="footer-left">
          <div className="footer-logo-area">
            <div className="footer-g-logo">d</div>
            <div className="footer-brand">
              <span className="brand-name">DILANTHA DEV</span>
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
              <li><a href="#home">HOME</a></li>
              <li><a href="#contact">LET'S CONNECT</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>SOCIAL</h4>
            <ul>
              <li><a href="#linkedin">LINKEDIN</a></li>
              <li><a href="#behance">BEHANCE</a></li>
              <li><a href="#github">GITHUB</a></li>
            </ul>
          </div>
          
          <div className="footer-col email-col">
            <h4>DROP ME A LINE</h4>
            <a href="mailto:hello@dilantha.com" className="footer-email">
              HELLO@DILANTHA.COM
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
      <div className="footer-giant-text">
        DILANTHA
      </div>

      {/* Back to Top Button */}
      <button className="back-to-top" onClick={scrollToTop}>
        BACK TO TOP
      </button>

    </footer>
  );
}

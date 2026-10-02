import { useState, useEffect, useRef } from 'react';
import './Hero.css';
import heroVideo1 from './assets/hero.mp4';
import heroVideo2 from './assets/hero2.mp4';
import heroVideo3 from './assets/hero3.mp4';

const videos = [heroVideo1, heroVideo2, heroVideo3];

function Hero() {
  const [currentVid, setCurrentVid] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Set playback rate to make them faster
    videoRefs.current.forEach(vid => {
      if (vid) {
        vid.playbackRate = 1.5; // Speed up by 1.5x
      }
    });

    // Auto-switch videos every 5 seconds
    const interval = setInterval(() => {
      setCurrentVid(prev => (prev + 1) % videos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {videos.map((vid, i) => (
        <video 
          key={i}
          ref={el => videoRefs.current[i] = el}
          src={vid} 
          autoPlay 
          loop 
          muted 
          playsInline
          className={`hero-bg-video ${i === currentVid ? 'active' : ''}`}
        />
      ))}
      <div className="hero-overlay"></div>

      <div className="hero-top-nav">
        <div className="hero-logo">Hero</div>
        <nav className="hero-main-nav">
          <ul>
            <li>HOME</li>
            <li>ABOUT</li>
            <li>SERVICES</li>
            <li>PORTFOLIO</li>
            <li>PAGES ▾</li>
            <li>CONTACT</li>
          </ul>
        </nav>
      </div>

      <div className="hero-center-content">
        <h1 className="hero-headline">
          <span className="serif-italic">We Are</span> <span className="sans-bold yellow-text">THE CREATIVES</span><br />
          <span className="serif-italic">You</span> <span className="sans-bold">NEED!</span>
        </h1>
      </div>
    </section>
  );
}

export default Hero;

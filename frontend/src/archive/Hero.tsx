import { useState, useEffect, useRef } from 'react';
import './Hero.css';
import heroVideo1 from './assets/hero.mp4';
import heroVideo2 from './assets/hero2.mp4';
import heroVideo3 from './assets/hero3.mp4';
import { MdWavingHand } from "react-icons/md";

const videos = [heroVideo1, heroVideo2, heroVideo3];

function Hero() {
  const [currentVid, setCurrentVid] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isVisibleRef = useRef(true);

  // IntersectionObserver to pause videos when scrolled away from Hero
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        videoRefs.current.forEach((vid, i) => {
          if (vid) {
            if (entry.isIntersecting && i === currentVid) {
              vid.play().catch(() => {});
            } else {
              vid.pause();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [currentVid]);

  // Handle active video switching and playback
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (vid) {
        vid.playbackRate = 1.5;
        if (i === currentVid && isVisibleRef.current) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      }
    });
  }, [currentVid]);

  useEffect(() => {
    // Auto-switch videos every 5 seconds
    const interval = setInterval(() => {
      if (isVisibleRef.current) {
        setCurrentVid(prev => (prev + 1) % videos.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={heroRef} className="hero">
      {videos.map((vid, i) => (
        <video 
          key={i}
          ref={el => videoRefs.current[i] = el}
          src={vid} 
          loop 
          muted 
          playsInline
          preload="metadata"
          className={`hero-bg-video ${i === currentVid ? 'active' : ''}`}
        />
      ))}
      <div className="hero-overlay"></div>

      <div className="hero-top-nav">
        <div className="hero-logo">Hero</div>
        <nav className="hero-main-nav">
          <ul style={{ display: 'flex', alignItems: 'center' }}>
            <li>HOME</li>
            <li>ABOUT</li>
            <li>SERVICES</li>
            <li>PORTFOLIO</li>
            <li>PAGES ▾</li>
            <li>CONTACT</li>
            <li style={{ marginLeft: '10px' }}>
              <button className="nav-request-btn">
                <span className="waving-hand" style={{ color: '#df1b3f', display: 'flex', alignItems: 'center' }}>
                  <MdWavingHand size={18} />
                </span> 
                REQUEST
              </button>
            </li>
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

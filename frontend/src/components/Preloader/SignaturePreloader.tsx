import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './SignaturePreloader.css';

interface SignaturePreloaderProps {
  onComplete?: () => void;
}

export default function SignaturePreloader({ onComplete }: SignaturePreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);
  const [displayText, setDisplayText] = useState('!9X#K2_L');
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    // Lock scroll during real preloading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let isMounted = true;
    const target = 'DILANTHA';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>_#%&';
    let frame = 0;
    const totalShuffleFrames = 30; // ~960ms auto shuffle

    // 1. AUTOMATIC Character Shuffle (Starts immediately on load, no hover needed)
    const shuffleInterval = setInterval(() => {
      frame++;
      const progress = Math.min(1, frame / totalShuffleFrames);
      const revealedCount = Math.floor(progress * target.length);

      let output = '';
      for (let i = 0; i < target.length; i++) {
        if (i < revealedCount) {
          output += target[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(output);

      if (frame >= totalShuffleFrames) {
        clearInterval(shuffleInterval);
        setDisplayText(target);
        setIsResolved(true);
      }
    }, 32);

    const startTime = Date.now();
    const minDisplayTime = 1200; // allows full view of auto shuffle animation

    const trackRealAssets = async () => {
      // 1. Wait for Web Fonts
      const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();

      // 2. Wait for Window Complete event
      const windowLoadPromise = new Promise<void>((resolve) => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', () => resolve(), { once: true });
        }
      });

      // 3. Track all <img> tags in DOM
      const imgElements = Array.from(document.images);
      const imgPromises = imgElements.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise<void>((resolve) => {
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener('error', () => resolve(), { once: true });
        });
      });

      // 4. Track Hero & background <video> elements in DOM
      const videoElements = Array.from(document.querySelectorAll('video'));
      const videoPromises = videoElements.map((vid) => {
        if (vid.readyState >= 3) return Promise.resolve();
        return new Promise<void>((resolve) => {
          vid.addEventListener('loadeddata', () => resolve(), { once: true });
          vid.addEventListener('error', () => resolve(), { once: true });
        });
      });

      // Wait for all actual assets or 5s safety timeout
      const allAssets = Promise.all([
        fontPromise,
        windowLoadPromise,
        Promise.all(imgPromises),
        Promise.all(videoPromises),
      ]);

      const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 5000));

      await Promise.race([allAssets, timeoutPromise]);

      // Ensure minimum comfortable duration for shuffle completion
      const elapsed = Date.now() - startTime;
      if (elapsed < minDisplayTime) {
        await new Promise((resolve) => setTimeout(resolve, minDisplayTime - elapsed));
      }

      if (!isMounted) return;

      // Smooth fade-out reveal
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.03,
          duration: 0.65,
          ease: 'power2.inOut',
          onComplete: () => {
            document.body.style.overflow = originalOverflow;
            setIsDone(true);
            if (onComplete) onComplete();
          },
        });
      } else {
        document.body.style.overflow = originalOverflow;
        setIsDone(true);
        if (onComplete) onComplete();
      }
    };

    trackRealAssets();

    return () => {
      isMounted = false;
      clearInterval(shuffleInterval);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div ref={containerRef} className="signature-preloader-container">
      <div className="loader-box">
        {/* White Bracket Pulse Loader on top */}
        <div className="loader">
          <span>{'{'}</span>
          <span>{'}'}</span>
        </div>
        {/* "DILANTHA" - Automatic character shuffle on load */}
        <p className={`loader-name-below ${isResolved ? 'is-resolved' : ''}`}>
          {displayText}
        </p>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './SignaturePreloader.css';

import imgAidog from '../../assets/projects/aidog.jpg';
import imgEcommerce from '../../assets/projects/ecommerce.jpg';
import imgBookstore from '../../assets/projects/bookstore.jpg';
import imgWedding from '../../assets/projects/wedding.jpg';
import heroaImg from '../../assets/heroa.jpg'; // Hero Section Background Image

// Sequence images culminating firmly on the Hero Section image (heroa.jpg)
const SEQUENCE_IMAGES = [
  imgAidog,
  imgEcommerce,
  imgBookstore,
  imgWedding,
  heroaImg, // MUST BE LAST: Exactly matches Hero section image
];

interface SignaturePreloaderProps {
  onComplete?: () => void;
}

export default function SignaturePreloader({ onComplete }: SignaturePreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLSpanElement>(null);
  const textRightRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // 1. Lock scroll during preloading
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.classList.add('preloader-active');
    document.body.classList.add('preloader-active');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    if ((window as any).lenis) {
      (window as any).lenis.stop();
    }

    const preventTouchMove = (e: TouchEvent) => e.preventDefault();
    window.addEventListener('touchmove', preventTouchMove, { passive: false });

    const unlockScroll = () => {
      document.documentElement.classList.remove('preloader-active');
      document.body.classList.remove('preloader-active');
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      window.removeEventListener('touchmove', preventTouchMove);
      window.scrollTo(0, 0);
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
        (window as any).lenis.start();
      }
    };

    // 2. Pre-cache all sequence images into browser memory with decode()
    SEQUENCE_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.decode) {
        img.decode().catch(() => {});
      }
    });

    // 3. GSAP Master Timeline (Pure GPU transforms)
    const tl = gsap.timeline();

    // Initial State: "DILA" and "NTHA" united as "DILANTHA", frame collapsed to 0
    gsap.set(frameRef.current, { width: 0, opacity: 0, scale: 0.95, margin: 0 });
    gsap.set([textLeftRef.current, textRightRef.current], { x: 0, opacity: 0 });
    
    // Set first image visible, rest hidden
    imageRefs.current.forEach((imgEl, idx) => {
      if (imgEl) {
        gsap.set(imgEl, { opacity: idx === 0 ? 1 : 0 });
      }
    });

    // Step 1: "DILANTHA" text fades in together at center as ONE cohesive word
    tl.to(
      [textLeftRef.current, textRightRef.current],
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    );

    // DELIBERATE REST PAUSE:
    // "DILANTHA" remains completely still and normal for ~0.65s so the user clearly reads it
    tl.to({}, { duration: 0.65 });

    // Step 2: Text splits apart and the media box reveals smoothly in the center
    tl.to(
      frameRef.current,
      {
        width: 'clamp(80px, 18vw, 230px)',
        margin: '0 clamp(6px, 1.4vw, 20px)',
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power3.inOut',
      }
    );

    // Step 3: Fast sequence cycling through images, ending firmly on heroa.jpg (Hero section image)
    for (let i = 1; i < SEQUENCE_IMAGES.length; i++) {
      tl.call(() => {
        if (imageRefs.current[i - 1]) {
          imageRefs.current[i - 1]!.style.opacity = '0';
        }
        if (imageRefs.current[i]) {
          imageRefs.current[i]!.style.opacity = '1';
        }
      }, undefined, `+=${0.14}`);
    }

    // Step 3b: Deliberate hold on heroa.jpg so user clearly sees their Hero Section Image
    tl.to({}, { duration: 0.85 });

    // Step 4: 100% GPU-ACCELERATED CLIP-PATH SCALE EXPANSION
    tl.call(() => {
      if (!frameRef.current || !textLeftRef.current || !textRightRef.current || !containerRef.current) return;

      // 4a. Read exact screen geometry
      const frameRect = frameRef.current.getBoundingClientRect();
      const leftRect = textLeftRef.current.getBoundingClientRect();
      const rightRect = textRightRef.current.getBoundingClientRect();

      // 4b. Pin text elements with fixed GPU transforms
      gsap.set(textLeftRef.current, {
        position: 'fixed',
        top: leftRect.top,
        left: leftRect.left,
        width: leftRect.width,
        height: leftRect.height,
        margin: 0,
        zIndex: 10,
        willChange: 'transform, opacity',
      });

      gsap.set(textRightRef.current, {
        position: 'fixed',
        top: rightRect.top,
        left: rightRect.left,
        width: rightRect.width,
        height: rightRect.height,
        margin: 0,
        zIndex: 10,
        willChange: 'transform, opacity',
      });

      // 4c. Calculate exact clip insets for the small frame
      const insetTop = Math.round(frameRect.top);
      const insetRight = Math.round(window.innerWidth - frameRect.right);
      const insetBottom = Math.round(window.innerHeight - frameRect.bottom);
      const insetLeft = Math.round(frameRect.left);

      // 4d. Set frame to fullscreen dimensions INSTANTLY, masked by clip-path
      gsap.set(frameRef.current, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        borderRadius: 0,
        boxShadow: 'none',
        zIndex: 50,
        clipPath: `inset(${insetTop}px ${insetRight}px ${insetBottom}px ${insetLeft}px round 3px)`,
        willChange: 'clip-path',
      });

      // 4e. Ensure the Hero Section Image is guaranteed 100% visible
      const heroImg = imageRefs.current[SEQUENCE_IMAGES.length - 1];
      if (heroImg) {
        heroImg.style.opacity = '1';
      }

      // 4f. Master Scale Timeline (Completely GPU Composited)
      const scaleTl = gsap.timeline({
        onComplete: () => {
          unlockScroll();
          setIsDone(true);
          if (onComplete) onComplete();
        },
      });

      // "DILA" glides left on GPU compositor
      scaleTl.to(
        textLeftRef.current,
        {
          x: -Math.max(window.innerWidth * 0.35, 260),
          opacity: 0,
          duration: 0.85,
          ease: 'power3.inOut',
        },
        0
      );

      // "NTHA" glides right on GPU compositor
      scaleTl.to(
        textRightRef.current,
        {
          x: Math.max(window.innerWidth * 0.35, 260),
          opacity: 0,
          duration: 0.85,
          ease: 'power3.inOut',
        },
        0
      );

      // Preloader background fades to transparent on GPU (keeps children visible)
      scaleTl.to(
        containerRef.current,
        {
          backgroundColor: 'transparent',
          duration: 0.7,
          ease: 'power2.inOut',
        },
        0
      );

      // Frame expands smoothly to fullscreen via GPU clipPath unmasking
      scaleTl.to(
        frameRef.current,
        {
          clipPath: 'inset(0px 0px 0px 0px round 0px)',
          duration: 1.05,
          ease: 'power3.inOut',
        },
        0
      );
    });

    return () => {
      tl.kill();
      unlockScroll();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div ref={containerRef} className="nbn-preloader-container" aria-label="Loading Dilantha Portfolio">
      <div className="nbn-preloader-content">
        {/* Left text: "DILA" */}
        <span ref={textLeftRef} className="nbn-preloader-text left">DILA</span>

        {/* Center media frame with stacked image sequence ending firmly on Hero image */}
        <div ref={frameRef} className="nbn-preloader-media-box">
          {SEQUENCE_IMAGES.map((src, idx) => (
            <img
              key={idx}
              ref={(el) => {
                imageRefs.current[idx] = el;
              }}
              src={src}
              alt={idx === SEQUENCE_IMAGES.length - 1 ? 'Dilantha Hero Visual' : `Visual ${idx + 1}`}
              className={`nbn-preloader-image ${idx === SEQUENCE_IMAGES.length - 1 ? 'is-hero-final' : ''}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: idx === 0 ? 1 : 0,
                zIndex: idx + 1,
                pointerEvents: 'none',
              }}
              loading="eager"
            />
          ))}
        </div>

        {/* Right text: "NTHA" */}
        <span ref={textRightRef} className="nbn-preloader-text right">NTHA</span>
      </div>
    </div>
  );
}

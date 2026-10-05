import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Introduce.css'; 
import ServicesList from './ServicesList';
import RightSidebar from './RightSidebar';

gsap.registerPlugin(ScrollTrigger);

function FooterIntroduce() {
  const containerRef = useRef<HTMLElement>(null);
  const qRef = useRef<gsap.utils.SelectorFunc | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Create a selector scoped to the container
    const q = gsap.utils.selector(containerRef);

    // 1. Animate right sidebar elements on entry
    gsap.from(q('.intro-right > *'), {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      x: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });

    // 2. Pin the section and delay fade out until 80% scroll
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=1500', // Extended scroll distance (1500px)
        pin: true,
        scrub: true,
        anticipatePin: 1,
        refreshPriority: 2,
      }
    });

    // Wait for 80% of the timeline duration doing nothing
    pinTl.to({}, { duration: 0.8 })
    // Fade out and float up in the last 20%
    .to(q('.intro-left'), {
      opacity: 0,
      y: -100, // Move up for a nice cinematic exit
      duration: 0.2,
      ease: 'power2.inOut',
    });

  }, { scope: containerRef, dependencies: [] });

  const renderRulerMarks = (isVertical: boolean) => {
    const marks = [];
    for (let i = 100; i <= 2500; i += 100) {
      marks.push(
        <div key={i} className={`ruler-mark ${isVertical ? 'vertical' : 'horizontal'}`} style={isVertical ? { top: `${i}px` } : { left: `${i}px` }}>
          <span className="ruler-num">{i}</span>
        </div>
      );
    }
    return marks;
  };

  return (
    <section className="introduce" ref={containerRef}>
     
      <div className="intro-content">
        <div className="intro-left" style={{ padding: 0 }}>
          <ServicesList />
        </div>

        <RightSidebar activeSection="INTRODUCE" />
      </div>
    </section>
  );
}

export default FooterIntroduce;

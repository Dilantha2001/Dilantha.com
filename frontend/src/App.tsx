import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import HeroCover from './components/Hero/HeroCover';
import StickyNavbar from './components/Common/StickyNavbar';
import AboutMe from './components/AboutMe/AboutMe';
import RecentWorks from './components/RecentWorks/RecentWorks';
import ServicesList from './components/Services/ServicesList';
import Works from './components/Works/Works';
import Technologies from './components/Technologies/Technologies';
import Feedback2 from './components/Feedback/Feedback2';
import FAQ from './components/FAQ/FAQ';
import LetsChat from './components/Contact/LetsChat';
import StatsSection from './components/Stats/StatsSection';
import Footer from './components/Footer/Footer';
import ProjectCursor from './components/Common/ProjectCursor';
import SignaturePreloader from './components/Preloader/SignaturePreloader';

import './styles/App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [heroEntered, setHeroEntered] = useState(false);

  useEffect(() => {
    // Force browser to always start at top on reload (prevents scroll jumps)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    
    (window as any).lenis = lenis;

    if (!isPreloaded) {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true });
    }

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  useEffect(() => {
    if (isPreloaded) {
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }

      // Re-sort and recalculate all ScrollTriggers across all sections
      const refreshScroll = () => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      };

      const rafId = requestAnimationFrame(refreshScroll);
      const t1 = setTimeout(refreshScroll, 120);
      const t2 = setTimeout(refreshScroll, 500);
      const t3 = setTimeout(refreshScroll, 1200);

      window.addEventListener('resize', refreshScroll);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        window.removeEventListener('resize', refreshScroll);
      };
    }
  }, [isPreloaded]);

  return (
    <div className="app-wrapper">
      {/* Signature Preloader */}
      {!isPreloaded && (
        <SignaturePreloader
          onComplete={() => {
            setIsPreloaded(true);
            setHeroEntered(true);
          }}
        />
      )}

      {/* Persistent Floating Navbar (Active from 2nd page / About section onwards) */}
      <StickyNavbar />

      {/* 1st Section: Cinematic Cover Hero (heroa.jpg) */}
      <HeroCover isEntered={heroEntered} />

      {/* 2nd Section: Next-Gen Digital Solution Interactive Showcase */}
      {/* <Hero2 /> */}

      {/* 2nd Section: About Me with Editorial Counter Grid & Bottom Logo Marquee */}
      <AboutMe />

      {/* 3rd Section: Recent Works (Editorial Asymmetric Grid) */}
      <RecentWorks />

      {/* 4th Section: Scroll-Expanding Interactive Services Section (Exact Screenshot Design) */}
      <ServicesList />

      {/* 5th Section: Horizontal Scroll Works Section (Ball push & timeline) */}
      <Works />

      {/* 6th Section: Technologies */}
      <Technologies />

      {/* 7th Section: Client Feedback Marquee */}
      <Feedback2 />

      {/* 8th Section: FAQ */}
      <FAQ />

      {/* 9th Section: Contact / Lets Chat */}
      <LetsChat />

      {/* 10th Section: GitHub Activity & Live Stats */}
      <StatsSection />

      {/* 11th Section: Footer */}
      <Footer />

      {/* Global Interactive Project Cursor (Black circle with 'Explore More' on project hover) */}
      {isPreloaded && <ProjectCursor />}
    </div>
  );
}

export default App;

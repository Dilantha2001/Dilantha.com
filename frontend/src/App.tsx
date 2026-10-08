import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Hero2 from './components/Hero/Hero2';
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

import './styles/App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    
    (window as any).lenis = lenis;

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

  return (
    <div className="app-wrapper">
      {/* Persistent Floating Navbar (Active from 2nd page / About section onwards) */}
      <StickyNavbar />

      {/* 1st Section: Hero */}
      <Hero2 />

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
    </div>
  );
}

export default App;

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Hero2 from './components/Hero/Hero2';
import AboutMe from './components/AboutMe/AboutMe';
import ProjectsSlider from './components/ProjectsSlider/ProjectsSlider';
import Process from './components/Process/Process';
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
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    
    (window as any).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return (
    <div className="app-wrapper">
      {/* 1st Section: Hero */}
      <Hero2 />

      {/* 2nd Section: About Me */}
      <AboutMe />
      
      {/* 3rd Section: Projects Slider */}
      <ProjectsSlider />

      {/* 4th Section: How We Work / Process */}
      <Process />

      {/* 5th Section: Services */}
      <ServicesList />

      {/* 6th Section: Works Timeline & Showcase */}
      <Works />

      {/* 7th Section: Technologies */}
      <Technologies />

      {/* 8th Section: Client Feedback Marquee */}
      <Feedback2 />

      {/* 9th Section: FAQ */}
      <FAQ />

      {/* 10th Section: Contact / Lets Chat */}
      <LetsChat />

      {/* 11th Section: GitHub Activity & Live Stats */}
      <StatsSection />

      {/* 12th Section: Footer */}
      <Footer />
    </div>
  );
}

export default App;

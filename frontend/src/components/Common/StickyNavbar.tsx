import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MdWavingHand } from 'react-icons/md';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import './StickyNavbar.css';

gsap.registerPlugin(ScrollTrigger);

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'works', label: 'PROJECTS', href: '#works' },
  { id: 'services', label: 'SERVICES', href: '#services' },
  { id: 'feedback', label: 'REVIEWS', href: '#feedback' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
];

export default function StickyNavbar() {
  const navRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // GSAP ScrollTrigger: Show on scroll UP, Hide on scroll DOWN (Active from 2nd page / About onwards)
  useGSAP(() => {
    if (!navRef.current) return;

    // Initially hide off-screen
    gsap.set(navRef.current, { y: -100, opacity: 0, pointerEvents: 'none' });

    let isShown = false;

    const showNavbar = () => {
      if (isShown) return;
      isShown = true;
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    const hideNavbar = () => {
      if (!isShown) return;
      isShown = false;
      gsap.to(navRef.current, {
        y: -100,
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.35,
        ease: 'power3.in',
        overwrite: 'auto',
      });
      setMobileMenuOpen(false);
    };

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const threshold = window.innerHeight * 0.75;
        const currentScroll = self.scroll();

        // 1. Above 2nd page (inside Hero) -> Always hide
        if (currentScroll < threshold) {
          hideNavbar();
          return;
        }

        // 2. Scrolling UP -> Show navbar with GSAP
        if (self.direction === -1) {
          showNavbar();
        } 
        // 3. Scrolling DOWN -> Hide navbar with GSAP
        else if (self.direction === 1) {
          hideNavbar();
        }
      },
    });

    return () => {
      st.kill();
    };
  }, { scope: navRef });

  useEffect(() => {
    const handleSectionSpy = () => {
      const sections = ['about', 'works', 'services', 'feedback', 'faq', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleSectionSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleSectionSpy);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(targetEl, { offset: -60, duration: 1.2 });
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav 
      ref={navRef}
      className="sticky-navbar-wrapper"
      aria-label="Main persistent navigation"
    >
      <div className="sticky-navbar-container">
        
        {/* Brand & Live Status */}
        <a 
          href="#top" 
          onClick={scrollToTop} 
          className="sticky-navbar-brand"
          title="Back to Top"
        >
          <span className="sticky-navbar-brand-name">DILANTHA</span>
          <span className="sticky-navbar-dot-wrapper">
            <span className="sticky-navbar-pulse-dot"></span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="sticky-navbar-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`sticky-navbar-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
                {isActive && <span className="sticky-navbar-active-bar" />}
              </a>
            );
          })}
        </div>

        {/* Right CTA Button */}
        <div className="sticky-navbar-cta">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="sticky-navbar-talk-btn"
          >
            <MdWavingHand className="sticky-navbar-hand" />
            <span>LET&apos;S TALK</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="sticky-navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sticky-navbar-mobile-menu">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`sticky-navbar-mobile-link ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="sticky-navbar-mobile-cta-btn"
          >
            <MdWavingHand className="sticky-navbar-hand" />
            <span>LET&apos;S TALK</span>
          </a>
        </div>
      )}
    </nav>
  );
}

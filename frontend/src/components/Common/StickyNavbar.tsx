import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  FiHome, 
  FiFolder, 
  FiLayers, 
  FiMessageSquare, 
  FiHelpCircle, 
  FiArrowUpRight, 
  FiChevronRight,
  FiPlus
} from 'react-icons/fi';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import './StickyNavbar.css';

gsap.registerPlugin(ScrollTrigger);

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'about', label: 'Home', href: '#about', icon: <FiHome size={15} /> },
  { id: 'works', label: 'Projects', href: '#works', icon: <FiFolder size={15} /> },
  { id: 'services', label: 'Services', href: '#services', icon: <FiLayers size={15} /> },
  { id: 'feedback', label: 'Reviews', href: '#feedback', icon: <FiMessageSquare size={15} /> },
  { id: 'faq', label: 'FAQ', href: '#faq', icon: <FiHelpCircle size={15} /> },
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
        
        {/* Left: Logo mark + 2-line brand */}
        <a 
          href="#top" 
          onClick={scrollToTop} 
          className="sticky-navbar-brand"
          title="Back to Top"
        >
          <div className="sticky-navbar-logo-mark" aria-hidden="true">
            <FiPlus size={16} strokeWidth={2.6} />
          </div>
          <div className="sticky-navbar-brand-text">
            <span className="brand-name">Dilantha</span>
            <span className="brand-sub">Portfolio</span>
          </div>
        </a>

        {/* Center: Desktop Nav Pills */}
        <div className="sticky-navbar-pills">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`sticky-navbar-pill ${isActive ? 'active' : ''}`}
              >
                <span className="pill-icon">{item.icon}</span>
                <span className="pill-text">{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right: CTA Button with vector hand & black circle arrow */}
        <div className="sticky-navbar-cta-group">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="sticky-navbar-cta-btn"
          >
            <span className="cta-hand-wrap" aria-hidden="true">
              <svg 
                className="cta-hand-svg" 
                viewBox="0 0 24 24" 
                width="16" 
                height="16" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18 11V6a2 2 0 0 0-4 0v4" />
                <path d="M14 10V4a2 2 0 0 0-4 0v6" />
                <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
              </svg>
            </span>
            <span className="cta-btn-text">Let&apos;s connect</span>
            <span className="cta-btn-dot">
              <FiArrowUpRight size={15} strokeWidth={2.4} />
            </span>
            <span className="cta-btn-chevrons" aria-hidden="true">
              <FiChevronRight size={13} strokeWidth={2.5} />
              <FiChevronRight size={13} strokeWidth={2.5} style={{ marginLeft: -8 }} />
            </span>
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
              <span className="pill-icon">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="sticky-navbar-mobile-cta-btn"
          >
            <span className="cta-hand-wrap" aria-hidden="true">
              <svg 
                className="cta-hand-svg" 
                viewBox="0 0 24 24" 
                width="16" 
                height="16" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18 11V6a2 2 0 0 0-4 0v4" />
                <path d="M14 10V4a2 2 0 0 0-4 0v6" />
                <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
              </svg>
            </span>
            <span>Let&apos;s connect</span>
            <FiArrowUpRight size={15} />
          </a>
        </div>
      )}
    </nav>
  );
}

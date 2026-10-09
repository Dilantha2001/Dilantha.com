import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import StickyNavbar from '../components/Common/StickyNavbar';
import Footer from '../components/Footer/Footer';

// Mock GSAP to avoid canvas/animation loop issues in Node jsdom
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    set: vi.fn(),
    to: vi.fn(),
    fromTo: vi.fn(),
    timeline: () => ({
      to: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
    }),
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn().mockReturnValue({ kill: vi.fn() }),
  },
}));

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((fn) => {
    try {
      fn();
    } catch {}
  }),
}));

describe('StickyNavbar Unit Tests', () => {
  it('should render the brand name Dilantha and Portfolio', () => {
    render(<StickyNavbar />);
    expect(screen.getByText('Dilantha')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<StickyNavbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('should render the logo image', () => {
    render(<StickyNavbar />);
    const logoImgs = screen.getAllByAltText(/Dilantha Logo/i);
    expect(logoImgs.length).toBeGreaterThan(0);
  });
});

describe('Footer Unit Tests', () => {
  it('should render brand title and social links in Footer', () => {
    render(<Footer />);
    expect(screen.getAllByText('Dilantha').length).toBeGreaterThan(0);
    expect(screen.getByText('LINKEDIN')).toBeInTheDocument();
    expect(screen.getByText('GITHUB')).toBeInTheDocument();
    expect(screen.getByText(/PRAMUDITHADILANTHA89@GMAIL.COM/i)).toBeInTheDocument();
  });
});

describe('ProjectModal Unit Tests', () => {
  const mockProject = {
    id: '01',
    rawId: 'test-app',
    title: 'Music Streaming Application',
    subtitle: 'REACT · NODE · FULL STACK',
    description: 'A full-stack streaming platform.',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: 'test.jpg',
    links: [
      { label: 'GitHub', url: 'https://github.com/Dilantha2001/MusicApplication' },
    ],
  };

  it('should render project details in modal', async () => {
    const { default: ProjectModal } = await import('../components/Works/ProjectModal');
    render(<ProjectModal project={mockProject} onClose={vi.fn()} />);
    
    expect(screen.getByText('Music Streaming Application')).toBeInTheDocument();
    expect(screen.getByText('A full-stack streaming platform.')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('View Source Code')).toBeInTheDocument();
  });
});

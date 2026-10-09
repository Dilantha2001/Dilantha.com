import { describe, it, expect } from 'vitest';
import { PORTFOLIO_INFO } from '../data/portfolioData';

describe('Portfolio Data Integrity Unit Tests', () => {
  it('should have personal details with name, email and title', () => {
    expect(PORTFOLIO_INFO.personal.name).toBe('Dilantha Ranaweera');
    expect(PORTFOLIO_INFO.personal.contact.email).toBe('pramudithadilantha89@gmail.com');
    expect(PORTFOLIO_INFO.personal.title).toBeDefined();
    expect(PORTFOLIO_INFO.personal.contact.socials?.length).toBeGreaterThan(0);
  });

  it('should have properly structured projects with titles and tags', () => {
    expect(PORTFOLIO_INFO.projects.length).toBeGreaterThan(0);
    
    PORTFOLIO_INFO.projects.forEach((proj) => {
      expect(proj.id).toBeDefined();
      expect(proj.title?.trim()).not.toBe('');
      expect(proj.description?.trim()).not.toBe('');
      expect(Array.isArray(proj.tags)).toBe(true);
      expect(proj.tags?.length).toBeGreaterThan(0);
    });
  });

  it('should include the primary projects', () => {
    const projectIds = PORTFOLIO_INFO.projects.map(p => p.id);
    expect(projectIds).toContain('music-streaming-app');
    expect(projectIds).toContain('online-book-store');
    expect(projectIds).toContain('wedding-photography-platform');
  });

  it('should have valid skill categories and skills', () => {
    expect(PORTFOLIO_INFO.skills.length).toBeGreaterThan(0);
    PORTFOLIO_INFO.skills.forEach(category => {
      expect(category.title).toBeDefined();
      expect(category.skills.length).toBeGreaterThan(0);
      category.skills.forEach(skill => {
        expect(skill.name).toBeDefined();
        expect(skill.level).toBeGreaterThanOrEqual(0);
        expect(skill.level).toBeLessThanOrEqual(100);
      });
    });
  });
});

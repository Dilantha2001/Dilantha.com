export interface SocialLink {
  label: string;
  url: string;
  icon?: string;
}

export interface SkillItem {
  name: string;
  level?: number;
  icon?: string;
  category?: string;
  years?: number;
  note?: string;
}

export interface SkillGroup {
  title: string;
  skills: SkillItem[];
}

export interface ProjectLink {
  label: string;
  url: string;
  icon?: string;
}

export interface ProjectItem {
  id?: string | number;
  title: string;
  description?: string;
  longDescription?: string;
  image?: string;
  video?: string;
  href?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags?: string[];
  featured?: boolean;
  date?: string;
  links?: ProjectLink[];
}

export interface ExperienceItem {
  id?: string;
  title: string;
  company: string;
  location?: string;
  date?: {
    start: string;
    end: string;
    present: boolean;
  };
  summary?: string;
  bullets?: string[];
  tech?: string[];
}

export interface EducationItem {
  degree: string;
  institution?: string;
  school?: string;
  year?: string;
  date?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface Portfolio {
  meta?: {
    createdAt?: string;
    locale?: string;
    url?: string;
    pdf?: string;
  };
  personal: {
    name: string;
    title: string;
    headline?: string;
    avatar?: string;
    summary?: string;
    contact: {
      email: string;
      phone?: string;
      location?: string;
      website?: string;
      socials?: SocialLink[];
    };
  };
  highlights?: string[];
  skills: SkillGroup[];
  experience?: ExperienceItem[];
  education?: EducationItem[];
  certifications?: CertificationItem[];
  extras?: {
    languages?: LanguageItem[];
    interests?: string[];
  };
  projects: ProjectItem[];
}

export type TagColors = Record<string, string>;

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Hero Section
    'hero.title': 'Luis Ortiz',
    'hero.subtitle': 'Information Scientist | AI Systems Architect',
    'hero.typing': 'Bridging Data Repositories <> Intelligent Applications.',
    'hero.cta': 'Explore My Work',
    
    // Expertise Section
    'expertise.title': 'Core Domains',
    'expertise.openscience.title': 'Open Science & Repositories',
    'expertise.openscience.desc': 'Structuring knowledge for global access and collaboration.',
    'expertise.datascience.title': 'Data Science & Automation',
    'expertise.datascience.desc': 'Transforming raw data into efficient, automated workflows.',
    'expertise.ai.title': 'AI Application Development',
    'expertise.ai.desc': 'Building conversational interfaces and intelligent agents.',
    'expertise.research.title': 'Academic Research',
    'expertise.research.desc': 'Authoring scientific papers grounded in information theory.',
    
    // Technical Stack
    'stack.build': 'Build With:',
    'stack.hobbies': 'Hobbies:',
    'stack.drone': 'Drone Pilot',
    'stack.photo': 'Photographer',
    
    // Academic Section
    'academic.title': 'Research | Pontificia Universidad Javeriana',
    'academic.subtitle': 'Author of Scientific Papers |',
    'academic.orcid': 'ORCID',
    'academic.profile': 'ORCID Profile',
    'academic.publications': 'Publications',
    
    // Footer
    'footer.tagline': 'Designed for Connection.',
    'footer.linkedin': 'LinkedIn',
    'footer.email': 'Email',
    'footer.copyright': 'Systems in Motion.',
  },
  es: {
    // Hero Section
    'hero.title': 'Luis Ortiz',
    'hero.subtitle': 'Científico de la Información | Arquitecto de Sistemas de IA',
    'hero.typing': 'Conectando Repositorios de Datos <> Aplicaciones Inteligentes.',
    'hero.cta': 'Explora Mi Trabajo',
    
    // Expertise Section
    'expertise.title': 'Dominios Principales',
    'expertise.openscience.title': 'Ciencia Abierta & Repositorios',
    'expertise.openscience.desc': 'Estructurando conocimiento para acceso y colaboración global.',
    'expertise.datascience.title': 'Ciencia de Datos & Automatización',
    'expertise.datascience.desc': 'Transformando datos crudos en flujos de trabajo eficientes y automatizados.',
    'expertise.ai.title': 'Desarrollo de Aplicaciones de IA',
    'expertise.ai.desc': 'Construyendo interfaces conversacionales y agentes inteligentes.',
    'expertise.research.title': 'Investigación Académica',
    'expertise.research.desc': 'Autor de artículos científicos fundamentados en teoría de la información.',
    
    // Technical Stack
    'stack.build': 'Construyo Con:',
    'stack.hobbies': 'Hobbies:',
    'stack.drone': 'Piloto de Drones',
    'stack.photo': 'Fotógrafo',
    
    // Academic Section
    'academic.title': 'Investigación | Pontificia Universidad Javeriana',
    'academic.subtitle': 'Autor de Artículos Científicos |',
    'academic.orcid': 'ORCID',
    'academic.profile': 'Perfil ORCID',
    'academic.publications': 'Publicaciones',
    
    // Footer
    'footer.tagline': 'Diseñado para Conectar.',
    'footer.linkedin': 'LinkedIn',
    'footer.email': 'Correo',
    'footer.copyright': 'Sistemas en Movimiento.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
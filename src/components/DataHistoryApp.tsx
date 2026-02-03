import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Code2, Share, Terminal, Database, Cpu, Users, BookOpen, Languages, RefreshCw, Facebook, Twitter, Instagram, Link2, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const DataScienceHistoryApp = () => {
  const { language: globalLanguage } = useLanguage();
  const language = globalLanguage;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentCategory, setCurrentCategory] = useState('all');
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  // Language dictionaries
  const translations = {
    es: {
      appName: 'Historia de la Ciencia de Datos',
      domain: 'datascience.history',
      version: 'data-science-history v2.0.0',
      terminalUser: 'user@datascience:~$',
      terminalCommand: './data-history --science --tech --statistics --people',
      loadingSteps: [
        'Iniciando sistema de efemérides de ciencia de datos...',
        'Conectando con bases de datos históricas...',
        'Cargando hitos científicos y tecnológicos...',
        'Procesando estadísticas y descubrimientos...',
        'Sistema listo. Explora la evolución de los datos y la información.'
      ],
      currentDate: 'Fecha actual:',
      categories: [
        { id: 'all', name: 'Todos' },
        { id: 'tech', name: 'Tecnología' },
        { id: 'science', name: 'Ciencia' },
        { id: 'statistics', name: 'Estadística' },
        { id: 'people', name: 'Personas' }
      ],
      title: 'EFEMÉRIDES DE CIENCIA DE DATOS',
      noEvents: 'No hay eventos para esta fecha en la categoría seleccionada.',
      share: 'Compartir',
      shareOn: 'Compartir en',
      copyLink: 'Copiar enlace',
      linkCopied: '¡Enlace copiado!',
      refresh: 'Actualizar',
      fetching: 'Buscando eventos históricos...',
      error: 'Error al cargar eventos. Intenta nuevamente.',
      stats: {
        dates: 'Fechas Históricas',
        events: 'Eventos Registrados',
        categories: 'Categorías',
        years: 'Años de Historia'
      },
      footer: {
        copyright: '© 2025',
        archive: 'Data Science History Archive',
        tagline: 'Preservando los hitos de la ciencia de datos y la información'
      },
      days: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      months: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    },
    en: {
      appName: 'Data Science History',
      domain: 'datascience.history',
      version: 'data-science-history v2.0.0',
      terminalUser: 'user@datascience:~$',
      terminalCommand: './data-history --science --tech --statistics --people',
      loadingSteps: [
        'Starting data science ephemeris system...',
        'Connecting to historical databases...',
        'Loading scientific and technological milestones...',
        'Processing statistics and discoveries...',
        'System ready. Explore the evolution of data and information.'
      ],
      currentDate: 'Current date:',
      categories: [
        { id: 'all', name: 'All' },
        { id: 'tech', name: 'Technology' },
        { id: 'science', name: 'Science' },
        { id: 'statistics', name: 'Statistics' },
        { id: 'people', name: 'People' }
      ],
      title: 'DATA SCIENCE MILESTONES',
      noEvents: 'No events for this date in the selected category.',
      share: 'Share',
      shareOn: 'Share on',
      copyLink: 'Copy Link',
      linkCopied: 'Link copied!',
      refresh: 'Refresh',
      fetching: 'Fetching historical events...',
      error: 'Error loading events. Try again.',
      stats: {
        dates: 'Historical Dates',
        events: 'Registered Events',
        categories: 'Categories',
        years: 'Years of History'
      },
      footer: {
        copyright: '© 2025',
        archive: 'Data Science History Archive',
        tagline: 'Preserving the milestones of data science and information'
      },
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  };

  const t = translations[language];

  const formatDate = (date) => {
    return `${t.days[date.getDay()]}, ${date.getDate()} ${language === 'es' ? 'de' : 'of'} ${t.months[date.getMonth()]} ${language === 'es' ? 'de' : ''} ${date.getFullYear()}`;
  };

  const getMonthName = (date) => {
    return t.months[date.getMonth()];
  };

  // Fetch real events from backend edge function
  const fetchHistoricalEvents = async (date) => {
    setIsFetching(true);
    setError(null);

    const day = date.getDate();
    const month = getMonthName(date);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-history-events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          day,
          month,
          language
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data.events || []);
      
      if (data.isFallback) {
        console.warn('Using fallback data');
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Fallback to example data
      setEvents([
        {
          year: 1981,
          event: language === 'es' 
            ? "IBM lanzó su primera computadora personal, democratizando el acceso a la tecnología."
            : "IBM launched its first personal computer, democratizing access to technology.",
          category: 'tech',
          icon: 'Cpu'
        }
      ]);
    } finally {
      setIsFetching(false);
    }
  };

  // Initial loading animation
  const [currentStep, setCurrentStep] = useState(0);
  const loadingSteps = t.loadingSteps;

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        if (currentStep < loadingSteps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          setIsLoading(false);
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isLoading, loadingSteps.length]);

  // Fetch events when date changes or component mounts
  useEffect(() => {
    if (!isLoading) {
      fetchHistoricalEvents(currentDate);
    }
  }, [currentDate, language, isLoading]);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentEvents = () => {
    if (currentCategory === 'all') {
      return events;
    }
    return events.filter(event => event.category === currentCategory);
  };

  // Share functionality
  const getShareText = (event: { year: number; event: string }) => {
    const text = `${event.year}: ${event.event}`;
    const url = window.location.href;
    return { text, url };
  };

  const shareOnFacebook = (event: { year: number; event: string }) => {
    const { url } = getShareText(event);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    setShowShareMenu(false);
  };

  const shareOnTwitter = (event: { year: number; event: string }) => {
    const { text, url } = getShareText(event);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    setShowShareMenu(false);
  };

  const shareOnInstagram = (event: { year: number; event: string }) => {
    const { text } = getShareText(event);
    navigator.clipboard.writeText(text);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
    window.open('https://www.instagram.com/', '_blank');
    setShowShareMenu(false);
  };

  const copyShareLink = (event: { year: number; event: string }) => {
    const { text, url } = getShareText(event);
    navigator.clipboard.writeText(`${text}\n${url}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
    setShowShareMenu(false);
  };
  const getIconComponent = (iconName) => {
    const icons = {
      'Database': Database,
      'Cpu': Cpu,
      'Users': Users,
      'BookOpen': BookOpen,
      'Code2': Code2
    };
    const IconComponent = icons[iconName] || Code2;
    return <IconComponent className="w-4 h-4" />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'tech': 'text-blue-400',
      'science': 'text-purple-400',
      'statistics': 'text-yellow-400',
      'people': 'text-pink-400',
      'all': 'text-green-400'
    };
    return colors[category] || 'text-green-400';
  };

  const categories = t.categories.map(cat => ({
    ...cat,
    icon: { all: Database, tech: Cpu, science: Database, statistics: BookOpen, people: Users }[cat.id]
  }));

  const currentEvents = getCurrentEvents();

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5" />
          <span className="text-gray-400">{t.appName}</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="text-white font-bold">{t.domain}</span>
          </div>
        </div>
        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">⋯</span>
        </div>
      </div>

      {/* Version Info */}
      <div className="border border-green-600 rounded-lg p-2 mb-4 text-sm">
        <span className="text-gray-500">←</span>
        <span className="ml-2">{t.version}</span>
        <span className="float-right text-gray-500">⟨⟩ 06:40:34</span>
      </div>

      {/* Terminal Command */}
      <div className="mb-6">
        <span className="text-green-400">{t.terminalUser} </span>
        <span className="text-white">{t.terminalCommand}</span>
      </div>

      {/* Loading Section */}
      {isLoading && (
        <div className="border border-green-600 rounded-lg p-4 mb-6">
          {loadingSteps.map((step, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="w-2 h-2 mr-3">
                {index <= currentStep && (
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                )}
              </div>
              <span className={index <= currentStep ? 'text-green-400' : 'text-gray-600'}>
                {step}
                {index <= currentStep && index < loadingSteps.length - 1 && (
                  <span className="ml-2">[OK]</span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Current Date */}
      <div className="border border-green-600 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{t.currentDate} </span>
            <span className="text-white ml-1">{formatDate(currentDate)}</span>
          </div>
          <button
            onClick={() => fetchHistoricalEvents(currentDate)}
            disabled={isFetching}
            className="flex items-center space-x-2 px-3 py-1 border border-green-600 rounded-lg hover:bg-green-900 hover:bg-opacity-20 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
            <span className="text-sm">{t.refresh}</span>
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border border-green-600 rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setCurrentCategory(category.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                  currentCategory === category.id 
                    ? 'bg-green-900 bg-opacity-20 border-green-400 text-green-400' 
                    : 'border-green-600 text-green-600 hover:bg-green-900 hover:bg-opacity-10'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fetching Indicator */}
      {isFetching && (
        <div className="border border-green-600 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            <span>{t.fetching}</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="border border-red-600 rounded-lg p-4 mb-6 text-red-400">
          <div className="flex items-center">
            <span className="mr-2">⚠</span>
            <span>{t.error}</span>
          </div>
        </div>
      )}

      {/* Daily Ephemeris */}
      <div className="border border-green-600 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <Database className="w-5 h-5 mr-2" />
          <h2 className="text-xl font-bold">{t.title}</h2>
        </div>
        
        {currentEvents.length === 0 && !isFetching ? (
          <div className="text-center py-8">
            <p className="text-gray-500">{t.noEvents}</p>
          </div>
        ) : (
          currentEvents.map((event, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex items-center mb-3">
                {getIconComponent(event.icon)}
                <span className="text-lg font-bold ml-2">
                  {event.year}:
                </span>
                <span className={`ml-2 text-sm ${getCategoryColor(event.category)}`}>
                  {categories.find(cat => cat.id === event.category)?.name}
                </span>
              </div>
              
              <p className="text-green-300 leading-relaxed mb-4">
                {event.event}
              </p>

              {index === currentEvents.length - 1 && (
                <div className="relative" ref={shareMenuRef}>
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="bg-transparent border border-green-600 text-green-400 px-6 py-2 rounded-lg hover:bg-green-900 hover:bg-opacity-20 transition-colors flex items-center space-x-2"
                  >
                    <Share className="w-4 h-4" />
                    <span>{t.share}</span>
                  </button>
                  
                  {showShareMenu && (
                    <div className="absolute bottom-full mb-2 left-0 bg-gray-900 border border-green-600 rounded-lg p-2 min-w-[180px] z-50">
                      <button 
                        onClick={() => shareOnFacebook(event)}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-green-900 hover:bg-opacity-30 transition-colors text-left"
                      >
                        <Facebook className="w-4 h-4 text-blue-500" />
                        <span>Facebook</span>
                      </button>
                      <button 
                        onClick={() => shareOnTwitter(event)}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-green-900 hover:bg-opacity-30 transition-colors text-left"
                      >
                        <Twitter className="w-4 h-4 text-sky-400" />
                        <span>X (Twitter)</span>
                      </button>
                      <button 
                        onClick={() => shareOnInstagram(event)}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-green-900 hover:bg-opacity-30 transition-colors text-left"
                      >
                        <Instagram className="w-4 h-4 text-pink-500" />
                        <span>Instagram</span>
                      </button>
                      <div className="border-t border-green-600 my-1"></div>
                      <button 
                        onClick={() => copyShareLink(event)}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-green-900 hover:bg-opacity-30 transition-colors text-left"
                      >
                        {linkCopied ? (
                          <>
                            <Check className="w-4 h-4 text-green-400" />
                            <span>{t.linkCopied}</span>
                          </>
                        ) : (
                          <>
                            <Link2 className="w-4 h-4" />
                            <span>{t.copyLink}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="border border-green-600 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">{events.length}</div>
          <div className="text-sm text-green-300">{t.stats.events}</div>
        </div>
        <div className="border border-green-600 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">365</div>
          <div className="text-sm text-green-300">{t.stats.dates}</div>
        </div>
        <div className="border border-green-600 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">4</div>
          <div className="text-sm text-green-300">{t.stats.categories}</div>
        </div>
        <div className="border border-green-600 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">200+</div>
          <div className="text-sm text-green-300">{t.stats.years}</div>
        </div>
      </div>

      {/* Terminal Prompt */}
      <div className="mb-4">
        <span className="text-green-400">{t.terminalUser} </span>
        <span className="animate-pulse">█</span>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-8">
        <p>{t.footer.copyright} <span className="underline">{t.footer.archive}</span></p>
        <p>{t.footer.tagline}</p>
      </div>
    </div>
  );
};

export default DataScienceHistoryApp;

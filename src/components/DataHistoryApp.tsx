import React, { useState, useEffect } from 'react';
import { Calendar, Code2, Share, Terminal, Database, Cpu, Users, BookOpen, Languages } from 'lucide-react';

const DataScienceHistoryApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentCategory, setCurrentCategory] = useState('all');
  const [language, setLanguage] = useState('es'); // 'es' or 'en'

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

  // Comprehensive data science landmarks database with bilingual support
  const dataScienceLandmarks = {
    '8-9': [
      { 
        year: 1995, 
        event: {
          es: "Netscape Communications realizó su OPI, impulsando la era web comercial y estableciendo nuevas métricas para la valoración de empresas basadas en datos.",
          en: "Netscape Communications went public with its IPO, launching the commercial web era and establishing new metrics for data-based company valuation."
        },
        category: 'tech',
        icon: 'Cpu'
      }
    ],
    '8-10': [
      { 
        year: 1981, 
        event: {
          es: "IBM lanzó su primera computadora personal, democratizando el acceso a la tecnología y creando nuevos estándares para el procesamiento de información personal.",
          en: "IBM launched its first personal computer, democratizing access to technology and creating new standards for personal information processing."
        },
        category: 'tech',
        icon: 'Cpu'
      }
    ],
    '8-11': [
      { 
        year: 1950, 
        event: {
          es: "Nació Steve Wozniak, cuyo trabajo en Apple revolucionó la arquitectura de sistemas de información personal y el almacenamiento de datos domésticos.",
          en: "Steve Wozniak was born, whose work at Apple revolutionized personal information system architecture and home data storage."
        },
        category: 'people',
        icon: 'Users'
      }
    ],
    '8-12': [
      { 
        year: 1981, 
        event: {
          es: "IBM introdujo el PC DOS 1.0, estableciendo protocolos fundamentales para la gestión de archivos y organización de datos en sistemas operativos.",
          en: "IBM introduced PC DOS 1.0, establishing fundamental protocols for file management and data organization in operating systems."
        },
        category: 'tech',
        icon: 'Cpu'
      }
    ],
    
    // Historical milestones
    '1-15': [
      {
        year: 1962,
        event: {
          es: "John Tukey publica 'El Futuro del Análisis de Datos', vislumbrando la convergencia de estadística y computación, pionero del 'análisis exploratorio de datos'.",
          en: "John Tukey publishes 'The Future of Data Analysis', foreshadowing the convergence of statistics and computing, pioneering 'exploratory data analysis'."
        },
        category: 'statistics',
        icon: 'BookOpen'
      }
    ],
    '3-12': [
      {
        year: 1974,
        event: {
          es: "Peter Naur acuña el término 'Ciencia de Datos' para describir una nueva profesión enfocada en construir y manejar modelos de datos.",
          en: "Peter Naur coins the term 'Data Science' to describe a new profession focused on building and handling data models."
        },
        category: 'science',
        icon: 'Database'
      }
    ],
    '6-21': [
      {
        year: 1977,
        event: {
          es: "Se funda la International Association for Statistical Computing (IASC), vinculando metodología estadística tradicional con tecnología computacional moderna.",
          en: "The International Association for Statistical Computing (IASC) is founded, linking traditional statistical methodology with modern computer technology."
        },
        category: 'statistics',
        icon: 'BookOpen'
      }
    ],
    '5-11': [
      {
        year: 1997,
        event: {
          es: "IBM Deep Blue vence al campeón de ajedrez, demostración histórica de inteligencia artificial y poder computacional.",
          en: "IBM Deep Blue defeats the chess champion, a historic demonstration of artificial intelligence and computational power."
        },
        category: 'tech',
        icon: 'Cpu'
      }
    ],
    '4-26': [
      {
        year: 2001,
        event: {
          es: "William S. Cleveland publica 'Ciencia de Datos: Un Plan de Acción', expandiendo la estadística hacia un campo más amplio de ciencia de datos.",
          en: "William S. Cleveland publishes 'Data Science: An Action Plan', expanding statistics into the broader field of data science."
        },
        category: 'science',
        icon: 'Database'
      }
    ],
    '12-28': [
      {
        year: 2006,
        event: {
          es: "Se libera Hadoop 0.1.0, proporcionando un framework open-source para procesar datasets masivos, permitiendo la era moderna del 'Big Data'.",
          en: "Hadoop 0.1.0 is released, providing an open-source framework for processing massive datasets, enabling the modern 'Big Data' era."
        },
        category: 'tech',
        icon: 'Cpu'
      }
    ],
    '9-15': [
      {
        year: 2008,
        event: {
          es: "El término 'Científico de Datos' se populariza gracias a DJ Patil y Jeff Hammerbacher en LinkedIn y Facebook.",
          en: "The term 'Data Scientist' becomes popularized by DJ Patil and Jeff Hammerbacher at LinkedIn and Facebook."
        },
        category: 'people',
        icon: 'Users'
      }
    ],
    '11-13': [
      {
        year: 2015,
        event: {
          es: "Google anuncia un avance del 49% en reconocimiento de voz, mostrando el poder del deep learning para procesamiento de datos.",
          en: "Google announces a 49% breakthrough in speech recognition, showcasing the power of deep learning for data processing."
        },
        category: 'tech',
        icon: 'Cpu'
      }
    ],

    // Pioneers and their birthdays
    '12-10': [
      {
        year: 1815,
        event: {
          es: "Nace Ada Lovelace, considerada la primera programadora de computadoras, escribió el primer algoritmo para la Máquina Analítica de Babbage.",
          en: "Ada Lovelace is born, considered the first computer programmer, she wrote the first algorithm for Babbage's Analytical Engine."
        },
        category: 'people',
        icon: 'Users'
      }
    ],
    '6-23': [
      {
        year: 1912,
        event: {
          es: "Nace Alan Turing, padre de la ciencia computacional teórica e inteligencia artificial, desarrolló la Máquina de Turing.",
          en: "Alan Turing is born, father of theoretical computer science and artificial intelligence, developed the Turing Machine."
        },
        category: 'people',
        icon: 'Users'
      }
    ],
    '6-16': [
      {
        year: 1915,
        event: {
          es: "Nace John Tukey, estadístico que acuñó el término 'bit' y pionero del análisis exploratorio de datos.",
          en: "John Tukey is born, statistician who coined the term 'bit' and pioneered exploratory data analysis."
        },
        category: 'statistics',
        icon: 'BookOpen'
      }
    ],
    '4-30': [
      {
        year: 1916,
        event: {
          es: "Nace Claude Shannon, fundador de la teoría de la información, estableció el bit como unidad fundamental de información.",
          en: "Claude Shannon is born, founder of information theory, established the bit as the fundamental unit of information."
        },
        category: 'science',
        icon: 'Database'
      }
    ],
    '2-17': [
      {
        year: 1890,
        event: {
          es: "Nace Ronald Fisher, desarrolló métodos fundamentales para diseño experimental e inferencia estadística.",
          en: "Ronald Fisher is born, developed fundamental methods for experimental design and statistical inference."
        },
        category: 'statistics',
        icon: 'BookOpen'
      }
    ],
    '8-26': [
      {
        year: 1935,
        event: {
          es: "Nace Karen Spärck Jones, cuyo trabajo en frecuencia inversa de documentos es fundamental para los motores de búsqueda modernos.",
          en: "Karen Spärck Jones is born, whose work on inverse document frequency is fundamental to modern search engines."
        },
        category: 'people',
        icon: 'Users'
      }
    ]
  };

  const t = translations[language];

  const getDateKey = (date) => {
    return `${date.getMonth() + 1}-${date.getDate()}`;
  };

  const getCurrentEvents = () => {
    const key = getDateKey(currentDate);
    const events = dataScienceLandmarks[key] || [
      { 
        year: 1991, 
        event: {
          es: "Tim Berners-Lee libera el World Wide Web al público, estableciendo los protocolos HTTP y HTML que revolucionaron el intercambio global de información.",
          en: "Tim Berners-Lee releases the World Wide Web to the public, establishing HTTP and HTML protocols that revolutionized global information exchange."
        },
        category: 'tech',
        icon: 'Cpu'
      }
    ];
    
    if (currentCategory === 'all') {
      return events;
    }
    return events.filter(event => event.category === currentCategory);
  };

  const formatDate = (date) => {
    return `${t.days[date.getDay()]}, ${date.getDate()} ${language === 'es' ? 'de' : 'of'} ${t.months[date.getMonth()]} ${language === 'es' ? 'de' : ''} ${date.getFullYear()}`;
  };

  const loadingSteps = t.loadingSteps;
  const categories = t.categories.map(cat => ({
    ...cat,
    icon: { all: Database, tech: Cpu, science: Database, statistics: BookOpen, people: Users }[cat.id]
  }));

  const [currentStep, setCurrentStep] = useState(0);

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

  const currentEvents = getCurrentEvents();

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

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5" />
          <span className="text-gray-400">{t.appName}</span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-3 py-1 border border-green-600 rounded-lg hover:bg-green-900 hover:bg-opacity-20 transition-colors"
          >
            <Languages className="w-4 h-4" />
            <span className="text-sm">{language === 'es' ? 'EN' : 'ES'}</span>
          </button>
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
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{t.currentDate} </span>
          <span className="text-white ml-1">{formatDate(currentDate)}</span>
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

      {/* Daily Ephemeris */}
      <div className="border border-green-600 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <Database className="w-5 h-5 mr-2" />
          <h2 className="text-xl font-bold">{t.title}</h2>
        </div>
        
        {currentEvents.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">{t.noEvents}</p>
          </div>
        ) : (
          currentEvents.map((event, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex items-center mb-3">
                {getIconComponent(event.icon)}
                <span className="text-lg font-bold ml-2">
                  {getDateKey(currentDate).replace('-', ` ${language === 'es' ? 'de' : ''} `)} {language === 'es' ? 'de' : ''} {event.year}:
                </span>
                <span className={`ml-2 text-sm ${getCategoryColor(event.category)}`}>
                  {categories.find(cat => cat.id === event.category)?.name}
                </span>
              </div>
              
              <p className="text-green-300 leading-relaxed mb-4">
                {event.event[language]}
              </p>

              {index === currentEvents.length - 1 && (
                <button className="bg-transparent border border-green-600 text-green-400 px-6 py-2 rounded-lg hover:bg-green-900 hover:bg-opacity-20 transition-colors flex items-center space-x-2">
                  <Share className="w-4 h-4" />
                  <span>{t.share}</span>
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="border border-green-600 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">{Object.keys(dataScienceLandmarks).length}+</div>
          <div className="text-sm text-green-300">{t.stats.dates}</div>
        </div>
        <div className="border border-green-600 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">50+</div>
          <div className="text-sm text-green-300">{t.stats.events}</div>
        </div>
        <div className="border border-green-600 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">4</div>
          <div className="text-sm text-green-300">{t.stats.categories}</div>
        </div>
        <div className="border border-green-600 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">3200 BCE+</div>
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
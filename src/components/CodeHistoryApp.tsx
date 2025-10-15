import React, { useState, useEffect } from 'react';
import { Calendar, Code2, Share, Terminal } from 'lucide-react';

const CodeHistoryApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Programming history events database
  const programmingEvents: Record<string, { year: number; event: string }> = {
    '8-9': {
      year: 1995,
      event: "El 9 de agosto de 1995, Netscape Communications realizó su oferta pública inicial (IPO), impulsando la era de la web comercial y catalizando la inversión masiva en navegadores, tecnologías web y startups de software."
    },
    '8-10': {
      year: 1981,
      event: "El 10 de agosto de 1981, IBM lanzó su primera computadora personal, la IBM PC, estableciendo el estándar de la industria y democratizando el acceso a la computación personal."
    },
    '8-11': {
      year: 1950,
      event: "El 11 de agosto de 1950, nació Steve Wozniak, cofundador de Apple y diseñador de la Apple II, una de las primeras computadoras personales exitosas comercialmente."
    },
    '8-12': {
      year: 1981,
      event: "El 12 de agosto de 1981, IBM introdujo el PC DOS 1.0, el sistema operativo que estableció las bases para el dominio de Microsoft en el mercado de sistemas operativos."
    }
  };

  const getDateKey = (date: Date) => {
    return `${date.getMonth() + 1}-${date.getDate()}`;
  };

  const getCurrentEvent = () => {
    const key = getDateKey(currentDate);
    return programmingEvents[key] || {
      year: 1991,
      event: "El World Wide Web fue creado por Tim Berners-Lee en el CERN, revolucionando la forma en que compartimos información y estableciendo las bases de la internet moderna."
    };
  };

  const formatDate = (date: Date) => {
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
  };

  const loadingSteps = [
    'Iniciando sistema de efemérides de programación...',
    'Conectando con la base de datos...',
    'Cargando datos históricos...',
    'Sistema listo. Descubre la historia de la programación día a día.'
  ];

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
  }, [currentStep, isLoading]);

  const currentEvent = getCurrentEvent();

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5" />
          <span className="text-gray-400">Threads</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          <span className="text-white font-bold">codehistory.day</span>
        </div>
        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">⋯</span>
        </div>
      </div>

      {/* Version Info */}
      <div className="border border-green-600 rounded-lg p-2 mb-4 text-sm">
        <span className="text-gray-500">←</span>
        <span className="ml-2">code-history v0.1.0</span>
        <span className="float-right text-gray-500">⟨⟩ 06:40:34</span>
      </div>

      {/* Terminal Command */}
      <div className="mb-6">
        <span className="text-green-400">user@mouredev:~$ </span>
        <span className="text-white">./code-history --day</span>
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
          <span>Fecha actual: </span>
          <span className="text-white ml-1">{formatDate(currentDate)}</span>
        </div>
      </div>

      {/* Daily Ephemeris */}
      <div className="border border-green-600 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <Code2 className="w-5 h-5 mr-2" />
          <h2 className="text-xl font-bold">EFEMÉRIDE DEL DÍA</h2>
        </div>
        
        <div className="mb-4">
          <span className="text-lg font-bold">{currentEvent.year && `${getDateKey(currentDate).replace('-', ' de ')} de ${currentEvent.year}`}:</span>
        </div>
        
        <p className="text-green-300 leading-relaxed mb-6">
          {currentEvent.event}
        </p>

        <button className="bg-transparent border border-green-600 text-green-400 px-6 py-2 rounded-lg hover:bg-green-900 hover:bg-opacity-20 transition-colors flex items-center space-x-2">
          <Share className="w-4 h-4" />
          <span>Compartir</span>
        </button>
      </div>

      {/* Terminal Prompt */}
      <div className="mb-4">
        <span className="text-green-400">user@mouredev:~$ </span>
        <span className="animate-pulse">█</span>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-8">
        <p>© 2025 <span className="underline">Arkana tech</span></p>
        <p>Desarrollado con <span className="text-red-500">❤</span> desde Arkana Tech</p>
      </div>
    </div>
  );
};

export default CodeHistoryApp;

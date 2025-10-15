import React, { useState, useEffect } from 'react';
import { Calendar, Database, Library, Share, Terminal } from 'lucide-react';

const DataHistoryApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Data & information landmarks database
  const dataLandmarks: Record<string, { year: number; landmark: string }> = {
    '8-9': {
      year: 1995,
      landmark: "El 9 de agosto de 1995, Netscape Communications realizó su OPI, marcando un hito en los datos de mercado tecnológico y estableciendo nuevas métricas para la valoración de empresas basadas en datos web."
    },
    '8-10': {
      year: 1981,
      landmark: "El 10 de agosto de 1981, IBM lanzó su primera computadora personal, democratizando el acceso a la tecnología y creando nuevos estándares para el procesamiento de información personal."
    },
    '8-11': {
      year: 1950,
      landmark: "El 11 de agosto de 1950, nació Steve Wozniak, cuyo trabajo en Apple revolucionó la arquitectura de sistemas de información personal y el almacenamiento de datos domésticos."
    },
    '8-12': {
      year: 1981,
      landmark: "El 12 de agosto de 1981, IBM introdujo el PC DOS 1.0, estableciendo protocolos fundamentales para la gestión de archivos y la organización de datos en sistemas operativos."
    }
  };

  const getDateKey = (date: Date) => {
    return `${date.getMonth() + 1}-${date.getDate()}`;
  };

  const getCurrentLandmark = () => {
    const key = getDateKey(currentDate);
    return dataLandmarks[key] || { 
      year: 1991, 
      landmark: "El World Wide Web fue liberado al público por Tim Berners-Lee, estableciendo los protocolos HTTP y HTML que revolucionaron el intercambio global de información." 
    };
  };

  const formatDate = (date: Date) => {
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
  };

  const loadingSteps = [
    'Iniciando sistema de hitos históricos...',
    'Conectando con archivos de datos históricos...',
    'Cargando landmarks de tecnología e información...',
    'Analizando bibliotecas de datos históricos...',
    'Sistema listo. Explora los hitos que moldearon el mundo de los datos.'
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

  const currentLandmark = getCurrentLandmark();

  return (
    <div className="min-h-screen bg-slate-900 text-blue-400 font-mono p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5" />
          <span className="text-gray-400">DataHistory</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
          <span className="text-white font-bold">data-landmarks.tech</span>
        </div>
        <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">⋯</span>
        </div>
      </div>

      {/* Version Info */}
      <div className="border border-blue-600 rounded-lg p-2 mb-4 text-sm">
        <span className="text-gray-500">←</span>
        <span className="ml-2">data-history v1.2.0</span>
        <span className="float-right text-gray-500">⟨⟩ 06:40:34</span>
      </div>

      {/* Terminal Command */}
      <div className="mb-6">
        <span className="text-blue-400">@zitro677:~$ </span>
        <span className="text-white">./data-history --landmarks --tech --libraries</span>
      </div>

      {/* Loading Section */}
      {isLoading && (
        <div className="border border-blue-600 rounded-lg p-4 mb-6">
          {loadingSteps.map((step, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="w-2 h-2 mr-3">
                {index <= currentStep && (
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                )}
              </div>
              <span className={index <= currentStep ? 'text-blue-400' : 'text-gray-600'}>
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
      <div className="border border-blue-600 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Fecha de consulta: </span>
          <span className="text-white ml-1">{formatDate(currentDate)}</span>
        </div>
      </div>

      {/* Historical Landmark */}
      <div className="border border-blue-600 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <Database className="w-5 h-5 mr-2" />
          <Library className="w-5 h-5 mr-2" />
          <h2 className="text-xl font-bold">HITO HISTÓRICO - DATOS & TECNOLOGÍA</h2>
        </div>
        
        <div className="mb-4">
          <span className="text-lg font-bold">
            {currentLandmark.year && `${getDateKey(currentDate).replace('-', ' de ')} de ${currentLandmark.year}`}:
          </span>
        </div>
        
        <p className="text-blue-300 leading-relaxed mb-6">
          {currentLandmark.landmark}
        </p>

        <div className="flex space-x-4">
          <button className="bg-transparent border border-blue-600 text-blue-400 px-6 py-2 rounded-lg hover:bg-blue-900 hover:bg-opacity-20 transition-colors flex items-center space-x-2">
            <Share className="w-4 h-4" />
            <span>Compartir Hito</span>
          </button>
          <button className="bg-transparent border border-blue-600 text-blue-400 px-6 py-2 rounded-lg hover:bg-blue-900 hover:bg-opacity-20 transition-colors">
            Ver Más Landmarks
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border border-blue-600 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">250+</div>
          <div className="text-sm text-blue-300">Landmarks de Datos</div>
        </div>
        <div className="border border-blue-600 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">45</div>
          <div className="text-sm text-blue-300">Bibliotecas Históricas</div>
        </div>
        <div className="border border-blue-600 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">1980+</div>
          <div className="text-sm text-blue-300">Tecnologías Registradas</div>
        </div>
      </div>

      {/* Terminal Prompt */}
      <div className="mb-4">
        <span className="text-blue-400">@zitro677:~$ </span>
        <span className="animate-pulse">█</span>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-8">
        <p>© 2025 <span className="underline">Data History Archive</span></p>
        <p>Preservando los hitos de la tecnología de la información desde 2025</p>
      </div>
    </div>
  );
};

export default DataHistoryApp;

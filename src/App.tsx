import React, { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { ResultsPanel } from './components/ResultsPanel';
import { DatabaseStats } from './components/DatabaseStats';
import { recommendationEngine } from './services/recommendationEngine';
import { SearchCriteria, SearchResult } from './types/materials';
import { Atom, Search, Database } from 'lucide-react';

function App() {
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'database'>('search');

  const handleSearch = async (criteria: SearchCriteria) => {
    setIsLoading(true);
    
    // Simular tiempo de procesamiento
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const results = recommendationEngine.recommend(criteria);
      setSearchResults(results);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Atom className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Sistema de Recomendación de Materiales de Carbono
                </h1>
                <p className="text-sm text-gray-600">
                  Motor de búsqueda avanzado para propiedades de materiales
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              SRMC v1.0
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'search'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Search size={16} className="mr-2" />
              Búsqueda y Recomendaciones
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'database'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Database size={16} className="mr-2" />
              Base de Datos
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'search' ? (
          <div className="space-y-8">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            <ResultsPanel results={searchResults} />
          </div>
        ) : (
          <DatabaseStats />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              Sistema de Recomendación de Materiales de Carbono (SRMC) - 
              Motor de búsqueda avanzado con algoritmo de puntuación ponderada
            </p>
            <p className="mt-2">
              Base de datos: {recommendationEngine.getDatabaseStats().totalMaterials} materiales de carbono con propiedades mecánicas, físicas, eléctricas y térmicas
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
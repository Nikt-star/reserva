import React, { useState } from 'react';
import { SearchCriteria } from '../types/materials';
import { Search, Sliders, Target, DollarSign } from 'lucide-react';

interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [criteria, setCriteria] = useState<SearchCriteria>({});
  const [activeTab, setActiveTab] = useState<'range' | 'categorical' | 'priority'>('range');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(criteria);
  };

  const updateCriteria = (updates: Partial<SearchCriteria>) => {
    setCriteria(prev => ({ ...prev, ...updates }));
  };

  const clearCriteria = () => {
    setCriteria({});
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Search className="mr-3 text-blue-600" size={24} />
          Búsqueda de Materiales de Carbono
        </h2>
        <button
          onClick={clearCriteria}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Limpiar criterios
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('range')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'range'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Sliders size={16} className="inline mr-2" />
          Por Rango
        </button>
        <button
          onClick={() => setActiveTab('categorical')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'categorical'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Target size={16} className="inline mr-2" />
          Categórico
        </button>
        <button
          onClick={() => setActiveTab('priority')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'priority'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <DollarSign size={16} className="inline mr-2" />
          Por Prioridad
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Búsqueda por Rango */}
        {activeTab === 'range' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Propiedades Mecánicas</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Dureza (Mohs)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Mín"
                    value={criteria.hardnessMin || ''}
                    onChange={(e) => updateCriteria({ hardnessMin: e.target.value ? Number(e.target.value) : undefined })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Máx"
                    value={criteria.hardnessMax || ''}
                    onChange={(e) => updateCriteria({ hardnessMax: e.target.value ? Number(e.target.value) : undefined })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Módulo de Young (GPa)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Mín"
                    value={criteria.youngModulusMin || ''}
                    onChange={(e) => updateCriteria({ youngModulusMin: e.target.value ? Number(e.target.value) : undefined })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Máx"
                    value={criteria.youngModulusMax || ''}
                    onChange={(e) => updateCriteria({ youngModulusMax: e.target.value ? Number(e.target.value) : undefined })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Resistencia a la Tracción (MPa)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Mín"
                    value={criteria.tensileStrengthMin || ''}
                    onChange={(e) => updateCriteria({ tensileStrengthMin: e.target.value ? Number(e.target.value) : undefined })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Máx"
                    value={criteria.tensileStrengthMax || ''}
                    onChange={(e) => updateCriteria({ tensileStrengthMax: e.target.value ? Number(e.target.value) : undefined })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Propiedades Físicas y Térmicas</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Densidad (g/cm³)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Mín"
                    value={criteria.densityMin || ''}
                    onChange={(e) => updateCriteria({ densityMin: e.target.value ? Number(e.target.value) : undefined })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Máx"
                    value={criteria.densityMax || ''}
                    onChange={(e) => updateCriteria({ densityMax: e.target.value ? Number(e.target.value) : undefined })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Conductividad Térmica (W/m·K)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Mín"
                    value={criteria.thermalConductivityMin || ''}
                    onChange={(e) => updateCriteria({ thermalConductivityMin: e.target.value ? Number(e.target.value) : undefined })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Máx"
                    value={criteria.thermalConductivityMax || ''}
                    onChange={(e) => updateCriteria({ thermalConductivityMax: e.target.value ? Number(e.target.value) : undefined })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Resistencia a la Temperatura (°C)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Mín"
                    value={criteria.temperatureResistanceMin || ''}
                    onChange={(e) => updateCriteria({ temperatureResistanceMin: e.target.value ? Number(e.target.value) : undefined })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Máx"
                    value={criteria.temperatureResistanceMax || ''}
                    onChange={(e) => updateCriteria({ temperatureResistanceMax: e.target.value ? Number(e.target.value) : undefined })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Búsqueda Categórica */}
        {activeTab === 'categorical' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Nivel de Conductividad Eléctrica
              </label>
              <select
                value={criteria.electricalConductivityLevel || ''}
                onChange={(e) => updateCriteria({ 
                  electricalConductivityLevel: e.target.value as any || undefined 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Cualquiera</option>
                <option value="Aislante">Aislante</option>
                <option value="Conductor Bajo">Conductor Bajo</option>
                <option value="Alto">Alto</option>
                <option value="Extremo">Extremo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Costo Relativo Máximo
              </label>
              <select
                value={criteria.relativeCostMax || ''}
                onChange={(e) => updateCriteria({ 
                  relativeCostMax: e.target.value ? Number(e.target.value) as any : undefined 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Cualquiera</option>
                <option value="1">1 - Muy Bajo</option>
                <option value="2">2 - Bajo</option>
                <option value="3">3 - Medio</option>
                <option value="4">4 - Alto</option>
                <option value="5">5 - Muy Alto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Forma Típica
              </label>
              <select
                value={criteria.typicalForm || ''}
                onChange={(e) => updateCriteria({ 
                  typicalForm: e.target.value as any || undefined 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Cualquiera</option>
                <option value="Fibra">Fibra</option>
                <option value="Polvo">Polvo</option>
                <option value="Cristal">Cristal</option>
                <option value="Lámina">Lámina</option>
                <option value="Tubo">Tubo</option>
              </select>
            </div>
          </div>
        )}

        {/* Búsqueda por Prioridad */}
        {activeTab === 'priority' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Prioridades (1-5)</h3>
              
              {[
                { key: 'hardnessPriority', label: 'Dureza' },
                { key: 'youngModulusPriority', label: 'Módulo de Young' },
                { key: 'tensileStrengthPriority', label: 'Resistencia a la Tracción' },
                { key: 'densityPriority', label: 'Densidad' },
                { key: 'thermalConductivityPriority', label: 'Conductividad Térmica' }
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    {label}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={criteria[key as keyof SearchCriteria] as number || 1}
                    onChange={(e) => updateCriteria({ [key]: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span className="font-medium">
                      {criteria[key as keyof SearchCriteria] || 1}
                    </span>
                    <span>5</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Más Prioridades</h3>
              
              {[
                { key: 'electricalConductivityPriority', label: 'Conductividad Eléctrica' },
                { key: 'temperatureResistancePriority', label: 'Resistencia a la Temperatura' },
                { key: 'costPriority', label: 'Costo' },
                { key: 'formPriority', label: 'Forma del Material' }
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    {label}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={criteria[key as keyof SearchCriteria] as number || 1}
                    onChange={(e) => updateCriteria({ [key]: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span className="font-medium">
                      {criteria[key as keyof SearchCriteria] || 1}
                    </span>
                    <span>5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? 'Buscando...' : 'Buscar Materiales'}
          </button>
        </div>
      </form>
    </div>
  );
};
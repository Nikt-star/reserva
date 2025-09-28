import React from 'react';
import { SearchResult } from '../types/materials';
import { Trophy, Target, DollarSign, Zap, Thermometer, Hammer } from 'lucide-react';

interface ResultsPanelProps {
  results: SearchResult | null;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ results }) => {
  if (!results) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-gray-400 mb-4">
          <Target size={48} className="mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          Realiza una búsqueda para ver recomendaciones
        </h3>
        <p className="text-gray-500">
          Utiliza los criterios de búsqueda para encontrar los materiales de carbono más adecuados para tu aplicación.
        </p>
      </div>
    );
  }

  const { topRecommendations, totalMaterialsEvaluated } = results;

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Trophy className="mr-3 text-yellow-500" size={24} />
            Top 3 Recomendaciones
          </h2>
          <div className="text-sm text-gray-500">
            {totalMaterialsEvaluated} materiales evaluados
          </div>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {topRecommendations.map((result, index) => (
          <div
            key={result.material.id}
            className={`bg-white rounded-xl shadow-lg p-6 border-t-4 ${
              index === 0 ? 'border-yellow-400' : index === 1 ? 'border-gray-400' : 'border-orange-400'
            }`}
          >
            {/* Ranking badge */}
            <div className="flex items-center justify-between mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-500' : 'bg-orange-500'
              }`}>
                {index + 1}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">
                  {result.fulfillmentPercentage.toFixed(0)}%
                </div>
                <div className="text-xs text-gray-500">Cumplimiento</div>
              </div>
            </div>

            {/* Material info */}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {result.material.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {result.material.description}
            </p>

            {/* Score */}
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">
                Puntuación Total: {result.score}
              </div>
            </div>

            {/* Key properties */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm">
                <Hammer size={14} className="mr-2 text-gray-500" />
                <span>Dureza: {result.material.hardness} Mohs</span>
              </div>
              <div className="flex items-center text-sm">
                <Zap size={14} className="mr-2 text-gray-500" />
                <span>Conductividad: {result.material.electricalConductivityLevel}</span>
              </div>
              <div className="flex items-center text-sm">
                <Thermometer size={14} className="mr-2 text-gray-500" />
                <span>Térmica: {result.material.thermalConductivity} W/m·K</span>
              </div>
              <div className="flex items-center text-sm">
                <DollarSign size={14} className="mr-2 text-gray-500" />
                <span>Costo: {result.material.relativeCost}/5</span>
              </div>
            </div>

            {/* Form and applications */}
            <div className="mb-4">
              <div className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium mb-2">
                {result.material.typicalForm}
              </div>
              <div className="text-xs text-gray-600">
                <strong>Aplicaciones:</strong> {result.material.typicalApplications.slice(0, 2).join(', ')}
                {result.material.typicalApplications.length > 2 && '...'}
              </div>
            </div>

            {/* Matched criteria */}
            {result.matchedCriteria.length > 0 && (
              <div className="border-t pt-3">
                <div className="text-xs font-medium text-green-600 mb-1">
                  Criterios Cumplidos ({result.matchedCriteria.length}):
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  {result.matchedCriteria.slice(0, 3).map((criteria, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                      {criteria}
                    </div>
                  ))}
                  {result.matchedCriteria.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{result.matchedCriteria.length - 3} más...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      {topRecommendations.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Tabla de Comparación - Top 3
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium text-gray-700">Propiedad</th>
                  {topRecommendations.map((result, index) => (
                    <th key={result.material.id} className="text-center py-2 font-medium text-gray-700">
                      #{index + 1} {result.material.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { key: 'hardness', label: 'Dureza (Mohs)', unit: '' },
                  { key: 'youngModulus', label: 'Módulo de Young', unit: ' GPa' },
                  { key: 'tensileStrength', label: 'Resistencia Tracción', unit: ' MPa' },
                  { key: 'density', label: 'Densidad', unit: ' g/cm³' },
                  { key: 'thermalConductivity', label: 'Conductividad Térmica', unit: ' W/m·K' },
                  { key: 'electricalConductivityLevel', label: 'Conductividad Eléctrica', unit: '' },
                  { key: 'relativeCost', label: 'Costo Relativo', unit: '/5' }
                ].map(({ key, label, unit }) => (
                  <tr key={key}>
                    <td className="py-2 font-medium text-gray-600">{label}</td>
                    {topRecommendations.map((result) => (
                      <td key={result.material.id} className="text-center py-2">
                        {result.material[key as keyof typeof result.material]}{unit}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
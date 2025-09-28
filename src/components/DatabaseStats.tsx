import React from 'react';
import { recommendationEngine } from '../services/recommendationEngine';
import { Database, BarChart3, Layers, DollarSign } from 'lucide-react';

export const DatabaseStats: React.FC = () => {
  const stats = recommendationEngine.getDatabaseStats();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Database className="mr-3 text-blue-600" size={20} />
        Base de Datos de Materiales
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {stats.totalMaterials}
          </div>
          <div className="text-sm text-blue-700">
            Materiales Totales
          </div>
        </div>

        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {stats.materialTypes.length}
          </div>
          <div className="text-sm text-green-700">
            Tipos de Forma
          </div>
        </div>

        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {stats.hardnessRange.min}-{stats.hardnessRange.max}
          </div>
          <div className="text-sm text-purple-700">
            Rango Dureza (Mohs)
          </div>
        </div>

        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600 mb-1">
            {stats.costRange.min}-{stats.costRange.max}
          </div>
          <div className="text-sm text-orange-700">
            Rango de Costo
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
            <Layers size={16} className="mr-2" />
            Formas Disponibles
          </h3>
          <div className="space-y-2">
            {stats.materialTypes.map((type) => (
              <div key={type} className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">{type}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
            <BarChart3 size={16} className="mr-2" />
            Niveles de Conductividad
          </h3>
          <div className="space-y-2">
            {stats.conductivityLevels.map((level) => (
              <div key={level} className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">{level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
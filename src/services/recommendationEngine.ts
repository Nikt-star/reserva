import { CarbonMaterial, SearchCriteria, RecommendationResult, SearchResult } from '../types/materials';
import { carbonMaterials } from '../data/carbonMaterials';

export class RecommendationEngine {
  private materials: CarbonMaterial[];

  constructor(materials: CarbonMaterial[] = carbonMaterials) {
    this.materials = materials;
  }

  /**
   * Algoritmo principal de recomendación con puntuación ponderada
   */
  public recommend(criteria: SearchCriteria): SearchResult {
    const results: RecommendationResult[] = [];

    for (const material of this.materials) {
      const evaluation = this.evaluateMaterial(material, criteria);
      results.push(evaluation);
    }

    // Ordenar por puntuación descendente
    results.sort((a, b) => b.score - a.score);

    return {
      topRecommendations: results.slice(0, 3),
      totalMaterialsEvaluated: this.materials.length,
      searchCriteria: criteria
    };
  }

  /**
   * Evalúa un material específico contra los criterios de búsqueda
   */
  private evaluateMaterial(material: CarbonMaterial, criteria: SearchCriteria): RecommendationResult {
    let totalScore = 0;
    let totalCriteria = 0;
    let fulfilledCriteria = 0;
    const matchedCriteria: string[] = [];
    const missedCriteria: string[] = [];

    // Evaluación de rangos numéricos
    const rangeChecks = [
      { prop: 'hardness', min: criteria.hardnessMin, max: criteria.hardnessMax, priority: criteria.hardnessPriority, label: 'Dureza' },
      { prop: 'youngModulus', min: criteria.youngModulusMin, max: criteria.youngModulusMax, priority: criteria.youngModulusPriority, label: 'Módulo de Young' },
      { prop: 'tensileStrength', min: criteria.tensileStrengthMin, max: criteria.tensileStrengthMax, priority: criteria.tensileStrengthPriority, label: 'Resistencia a la Tracción' },
      { prop: 'compressiveStrength', min: criteria.compressiveStrengthMin, max: criteria.compressiveStrengthMax, priority: criteria.compressiveStrengthPriority, label: 'Resistencia a la Compresión' },
      { prop: 'density', min: criteria.densityMin, max: criteria.densityMax, priority: criteria.densityPriority, label: 'Densidad' },
      { prop: 'meltingPoint', min: criteria.meltingPointMin, max: criteria.meltingPointMax, priority: criteria.meltingPointPriority, label: 'Punto de Fusión' },
      { prop: 'temperatureResistance', min: criteria.temperatureResistanceMin, max: criteria.temperatureResistanceMax, priority: criteria.temperatureResistancePriority, label: 'Resistencia a la Temperatura' },
      { prop: 'electricalConductivity', min: criteria.electricalConductivityMin, max: criteria.electricalConductivityMax, priority: criteria.electricalConductivityPriority, label: 'Conductividad Eléctrica' },
      { prop: 'thermalConductivity', min: criteria.thermalConductivityMin, max: criteria.thermalConductivityMax, priority: criteria.thermalConductivityPriority, label: 'Conductividad Térmica' }
    ];

    for (const check of rangeChecks) {
      if (check.min !== undefined || check.max !== undefined) {
        totalCriteria++;
        const value = material[check.prop as keyof CarbonMaterial] as number;
        const meetsMin = check.min === undefined || value >= check.min;
        const meetsMax = check.max === undefined || value <= check.max;
        
        if (meetsMin && meetsMax) {
          fulfilledCriteria++;
          const priority = check.priority || 1;
          totalScore += priority;
          matchedCriteria.push(`${check.label}: ${value}`);
        } else {
          missedCriteria.push(`${check.label}: ${value} (requerido: ${check.min || 'min'} - ${check.max || 'max'})`);
        }
      }
    }

    // Evaluación de criterios categóricos
    if (criteria.electricalConductivityLevel) {
      totalCriteria++;
      if (material.electricalConductivityLevel === criteria.electricalConductivityLevel) {
        fulfilledCriteria++;
        const priority = criteria.electricalConductivityPriority || 1;
        totalScore += priority;
        matchedCriteria.push(`Nivel de Conductividad: ${material.electricalConductivityLevel}`);
      } else {
        missedCriteria.push(`Nivel de Conductividad: ${material.electricalConductivityLevel} (requerido: ${criteria.electricalConductivityLevel})`);
      }
    }

    if (criteria.relativeCostMax) {
      totalCriteria++;
      if (material.relativeCost <= criteria.relativeCostMax) {
        fulfilledCriteria++;
        const priority = criteria.costPriority || 1;
        totalScore += priority;
        matchedCriteria.push(`Costo Relativo: ${material.relativeCost}`);
      } else {
        missedCriteria.push(`Costo Relativo: ${material.relativeCost} (máximo: ${criteria.relativeCostMax})`);
      }
    }

    if (criteria.typicalForm) {
      totalCriteria++;
      if (material.typicalForm === criteria.typicalForm) {
        fulfilledCriteria++;
        const priority = criteria.formPriority || 1;
        totalScore += priority;
        matchedCriteria.push(`Forma: ${material.typicalForm}`);
      } else {
        missedCriteria.push(`Forma: ${material.typicalForm} (requerido: ${criteria.typicalForm})`);
      }
    }

    const fulfillmentPercentage = totalCriteria > 0 ? (fulfilledCriteria / totalCriteria) * 100 : 0;

    return {
      material,
      score: totalScore,
      fulfillmentPercentage,
      matchedCriteria,
      missedCriteria
    };
  }

  /**
   * Obtiene estadísticas de la base de datos de materiales
   */
  public getDatabaseStats() {
    return {
      totalMaterials: this.materials.length,
      materialTypes: [...new Set(this.materials.map(m => m.typicalForm))],
      conductivityLevels: [...new Set(this.materials.map(m => m.electricalConductivityLevel))],
      costRange: {
        min: Math.min(...this.materials.map(m => m.relativeCost)),
        max: Math.max(...this.materials.map(m => m.relativeCost))
      },
      hardnessRange: {
        min: Math.min(...this.materials.map(m => m.hardness)),
        max: Math.max(...this.materials.map(m => m.hardness))
      }
    };
  }
}

// Instancia singleton del motor de recomendación
export const recommendationEngine = new RecommendationEngine();
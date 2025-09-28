export interface CarbonMaterial {
  id: string;
  name: string;
  description: string;
  
  // Propiedades Mecánicas
  hardness: number; // Escala Mohs
  youngModulus: number; // GPa
  tensileStrength: number; // MPa
  compressiveStrength: number; // MPa
  
  // Propiedades Físicas
  density: number; // g/cm³
  meltingPoint: number; // °C
  temperatureResistance: number; // °C
  
  // Propiedades Eléctricas
  electricalConductivity: number; // S/m
  electricalConductivityLevel: 'Aislante' | 'Conductor Bajo' | 'Alto' | 'Extremo';
  
  // Propiedades Térmicas
  thermalConductivity: number; // W/m·K
  
  // Propiedades Contextuales
  relativeCost: 1 | 2 | 3 | 4 | 5; // Escala 1-5
  typicalForm: 'Fibra' | 'Polvo' | 'Cristal' | 'Lámina' | 'Tubo';
  typicalApplications: string[];
}

export interface SearchCriteria {
  // Búsqueda por Rango
  hardnessMin?: number;
  hardnessMax?: number;
  youngModulusMin?: number;
  youngModulusMax?: number;
  tensileStrengthMin?: number;
  tensileStrengthMax?: number;
  compressiveStrengthMin?: number;
  compressiveStrengthMax?: number;
  densityMin?: number;
  densityMax?: number;
  meltingPointMin?: number;
  meltingPointMax?: number;
  temperatureResistanceMin?: number;
  temperatureResistanceMax?: number;
  electricalConductivityMin?: number;
  electricalConductivityMax?: number;
  thermalConductivityMin?: number;
  thermalConductivityMax?: number;
  
  // Búsqueda por Valor Categórico
  electricalConductivityLevel?: 'Aislante' | 'Conductor Bajo' | 'Alto' | 'Extremo';
  relativeCostMax?: 1 | 2 | 3 | 4 | 5;
  typicalForm?: 'Fibra' | 'Polvo' | 'Cristal' | 'Lámina' | 'Tubo';
  
  // Búsqueda por Prioridad (1-5)
  hardnessPriority?: number;
  youngModulusPriority?: number;
  tensileStrengthPriority?: number;
  compressiveStrengthPriority?: number;
  densityPriority?: number;
  meltingPointPriority?: number;
  temperatureResistancePriority?: number;
  electricalConductivityPriority?: number;
  thermalConductivityPriority?: number;
  costPriority?: number;
  formPriority?: number;
}

export interface RecommendationResult {
  material: CarbonMaterial;
  score: number;
  fulfillmentPercentage: number;
  matchedCriteria: string[];
  missedCriteria: string[];
}

export interface SearchResult {
  topRecommendations: RecommendationResult[];
  totalMaterialsEvaluated: number;
  searchCriteria: SearchCriteria;
}
export function calculateReduction(
  baselineFactor: number,
  scenarioFactor: number,
  distanceKm: number
): { tons: number; kg: number } {
  const kg = (baselineFactor - scenarioFactor) * distanceKm;
  return {
    tons: parseFloat((kg / 1000).toFixed(6)),
    kg: parseFloat(kg.toFixed(3)),
  };
}

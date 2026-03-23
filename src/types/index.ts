// ===== Policy Types =====
export interface Policy {
  id: string;
  title: string;
  regionType: 'national' | 'province' | 'city';
  province: string;
  category: 'policy' | 'methodology';
  status: 'active' | 'expired';
  publishDate: string;
  issuingAuthority: string;
  summary: string;
  sourceUrl?: string;
  replacedBy?: { id: string; title: string };
}

// ===== Carbon Price Types =====
export interface CarbonProduct {
  id: string;
  name: string;
  fullName: string;
  market: 'domestic' | 'international';
  unit: string;
  region?: string;
  notes: string;
}

export interface PriceRecord {
  productId: string;
  date: string;
  price: number;
  change: number;
}

export interface PriceTrendPoint {
  date: string;
  [productId: string]: number | string;
}

// ===== Emission Types =====
export interface TransportMode {
  mode: string;
  label: string;
  icon: string;
  baselineFactor: number;
  scenarioFactor: number;
}

export interface Methodology {
  id: string;
  province: string;
  name: string;
  transportModes: TransportMode[];
}

// ===== News Types =====
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishDate: string;
  url: string;
  tags: string[];
}

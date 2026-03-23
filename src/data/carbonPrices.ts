import type { PriceRecord } from '../types';
import { CARBON_PRODUCTS_META } from '../utils/constants';
import dayjs from 'dayjs';

function generatePriceHistory(basePrice: number, days: number, volatility: number, seed: number): number[] {
  const prices: number[] = [];
  let price = basePrice;
  let s = seed;
  for (let i = 0; i < days; i++) {
    s = (s * 9301 + 49297) % 233280;
    const rnd = s / 233280 - 0.5;
    price = price + rnd * volatility;
    price = Math.max(price * 0.9, Math.min(price * 1.1, price));
    prices.push(parseFloat(price.toFixed(2)));
  }
  return prices;
}

const BASE_PRICES: Record<string, { base: number; vol: number; seed: number }> = {
  CCER: { base: 83.00, vol: 1.2, seed: 42 },
  CEA: { base: 82.00, vol: 1.5, seed: 73 },
  PHCER: { base: 78.00, vol: 1.0, seed: 15 },
  PCER: { base: 75.00, vol: 0.8, seed: 88 },
  CQCER: { base: 72.00, vol: 0.9, seed: 33 },
  GDCER: { base: 76.00, vol: 1.0, seed: 56 },
  VCS: { base: 11.50, vol: 0.5, seed: 21 },
  CDM: { base: 7.00, vol: 0.4, seed: 67 },
};

const DAYS = 30;
const today = dayjs('2026-03-23');

export function generateAllPriceRecords(): PriceRecord[] {
  const records: PriceRecord[] = [];

  for (const product of CARBON_PRODUCTS_META) {
    const config = BASE_PRICES[product.id] || { base: 50, vol: 1, seed: 99 };
    const prices = generatePriceHistory(config.base, DAYS, config.vol, config.seed);

    for (let i = 0; i < DAYS; i++) {
      const date = today.subtract(DAYS - 1 - i, 'day').format('YYYY-MM-DD');
      const change = i === 0 ? 0 : parseFloat((prices[i] - prices[i - 1]).toFixed(2));
      records.push({
        productId: product.id,
        date,
        price: prices[i],
        change,
      });
    }
  }

  return records;
}

export function getLatestPrices(): Array<{
  productId: string;
  name: string;
  fullName: string;
  price: number;
  change: number;
  unit: string;
  notes: string;
  market: 'domestic' | 'international';
}> {
  const allRecords = generateAllPriceRecords();
  const latestDate = today.format('YYYY-MM-DD');

  return CARBON_PRODUCTS_META.map((product) => {
    const record = allRecords.find(
      (r) => r.productId === product.id && r.date === latestDate
    );
    return {
      productId: product.id,
      name: product.name,
      fullName: product.fullName,
      price: record?.price ?? 0,
      change: record?.change ?? 0,
      unit: product.unit,
      notes: product.notes,
      market: product.market,
    };
  });
}

export function getTrendData(market: 'domestic' | 'international'): Array<Record<string, string | number>> {
  const allRecords = generateAllPriceRecords();
  const products = CARBON_PRODUCTS_META.filter((p) => p.market === market);
  const dates = Array.from({ length: DAYS }, (_, i) =>
    today.subtract(DAYS - 1 - i, 'day').format('YYYY-MM-DD')
  );

  return dates.map((date) => {
    const point: Record<string, string | number> = { date: dayjs(date).format('MM-DD') };
    for (const product of products) {
      const record = allRecords.find(
        (r) => r.productId === product.id && r.date === date
      );
      point[product.id] = record?.price ?? 0;
    }
    return point;
  });
}

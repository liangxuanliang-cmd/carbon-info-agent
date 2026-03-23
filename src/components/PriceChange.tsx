import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PriceChangeProps {
  value: number;
}

export default function PriceChange({ value }: PriceChangeProps) {
  if (value === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-text-secondary">
        <Minus className="w-3.5 h-3.5" />
        <span>0.00</span>
      </span>
    );
  }

  const isUp = value > 0;
  return (
    <span
      className={`inline-flex items-center gap-1 font-medium ${
        isUp ? 'text-price-up' : 'text-price-down'
      }`}
    >
      {isUp ? (
        <TrendingUp className="w-3.5 h-3.5" />
      ) : (
        <TrendingDown className="w-3.5 h-3.5" />
      )}
      <span>{isUp ? '+' : ''}{value.toFixed(2)}</span>
    </span>
  );
}

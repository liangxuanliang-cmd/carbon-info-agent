import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CARBON_PRODUCTS_META } from '../utils/constants';

const COLORS: Record<string, string> = {
  CCER: '#4CAF50',
  CEA: '#2196F3',
  PHCER: '#FF9800',
  PCER: '#9C27B0',
  CQCER: '#00BCD4',
  GDCER: '#795548',
  VCS: '#E91E63',
  CDM: '#607D8B',
};

interface PriceTrendChartProps {
  data: Array<Record<string, string | number>>;
  market: 'domestic' | 'international';
  title: string;
  yAxisUnit: string;
}

export default function PriceTrendChart({ data, market, title, yAxisUnit }: PriceTrendChartProps) {
  const products = CARBON_PRODUCTS_META.filter((p) => p.market === market);
  const [visibleProducts, setVisibleProducts] = useState<Set<string>>(
    () => new Set(products.map((p) => p.id))
  );

  const toggleProduct = (id: string) => {
    setVisibleProducts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (visibleProducts.size === products.length) {
      setVisibleProducts(new Set([products[0].id]));
    } else {
      setVisibleProducts(new Set(products.map((p) => p.id)));
    }
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-text-primary mb-3 m-0">{title}</h3>

      {/* Checkbox filters */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
        <label className="flex items-center gap-1.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={visibleProducts.size === products.length}
            onChange={toggleAll}
            className="w-3.5 h-3.5 accent-primary cursor-pointer"
          />
          <span className="text-xs font-medium text-text-secondary">{'\u5168\u9009'}</span>
        </label>
        {products.map((product) => (
          <label
            key={product.id}
            className="flex items-center gap-1.5 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={visibleProducts.has(product.id)}
              onChange={() => toggleProduct(product.id)}
              className="w-3.5 h-3.5 cursor-pointer"
              style={{ accentColor: COLORS[product.id] || '#999' }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: COLORS[product.id] || '#999' }}
            />
            <span className="text-xs text-text-primary">{product.name}</span>
          </label>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#757575' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#757575' }}
            tickLine={false}
            axisLine={false}
            label={{ value: yAxisUnit, angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#757575' } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E0E0E0',
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          {products
            .filter((product) => visibleProducts.has(product.id))
            .map((product) => (
              <Line
                key={product.id}
                type="monotone"
                dataKey={product.id}
                name={product.name}
                stroke={COLORS[product.id] || '#999'}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

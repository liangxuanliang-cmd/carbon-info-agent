import { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import SectionCard from '../components/SectionCard';
import PriceTable from './PriceTable';
import PriceTrendChart from './PriceTrendChart';
import { getLatestPrices, getTrendData } from '../data/carbonPrices';

export default function CarbonPriceSection() {
  const latestPrices = useMemo(() => getLatestPrices(), []);
  const domesticTrend = useMemo(() => getTrendData('domestic'), []);
  const internationalTrend = useMemo(() => getTrendData('international'), []);

  return (
    <SectionCard
      title={'\u78b3\u4ef7\u6c47\u603b'}
      subtitle={'\u56fd\u5185\u5916\u78b3\u6c47\u4ea7\u54c1\u4ef7\u683c\u53ca\u8d70\u52bf'}
      icon={<TrendingUp className="w-5 h-5" />}
    >
      <PriceTable data={latestPrices} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <PriceTrendChart
            data={domesticTrend}
            market="domestic"
            title={'\u56fd\u5185\u78b3\u6c47\u4ea7\u54c1\u4ef7\u683c\u8d70\u52bf\uff0830\u5929\uff09'}
            yAxisUnit={'\u5143/\u5428'}
          />
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <PriceTrendChart
            data={internationalTrend}
            market="international"
            title={'\u56fd\u9645\u78b3\u6c47\u4ea7\u54c1\u4ef7\u683c\u8d70\u52bf\uff0830\u5929\uff09'}
            yAxisUnit={'\u7f8e\u5143/\u5428'}
          />
        </div>
      </div>
    </SectionCard>
  );
}

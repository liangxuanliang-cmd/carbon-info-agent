import PriceChange from '../components/PriceChange';

interface PriceRow {
  productId: string;
  name: string;
  fullName: string;
  price: number;
  change: number;
  unit: string;
  notes: string;
  market: 'domestic' | 'international';
  priceDate: string;
}

interface PriceTableProps {
  data: PriceRow[];
}

export default function PriceTable({ data }: PriceTableProps) {
  const domesticProducts = data.filter((d) => d.market === 'domestic');
  const internationalProducts = data.filter((d) => d.market === 'international');

  const renderRows = (rows: PriceRow[]) =>
    rows.map((row) => (
      <tr key={row.productId} className="border-b border-gray-100 hover:bg-primary-light/30 transition-colors">
        <td className="py-3 px-4 text-sm font-medium text-text-primary">
          {row.fullName}
        </td>
        <td className="py-3 px-4 text-sm text-center font-semibold">
          {row.price.toFixed(2)}
        </td>
        <td className="py-3 px-4 text-sm text-center">
          <PriceChange value={row.change} />
        </td>
        <td className="py-3 px-4 text-sm text-center text-text-secondary">
          {row.unit}
        </td>
        <td className="py-3 px-4 text-sm text-center text-text-secondary">
          {row.notes}
        </td>
        <td className="py-3 px-4 text-sm text-center text-text-secondary">
          {row.priceDate}
        </td>
      </tr>
    ));

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary text-white">
            <th className="py-3 px-4 text-left text-sm font-semibold">{'碳汇类型'}</th>
            <th className="py-3 px-4 text-center text-sm font-semibold">{'最新价格'}</th>
            <th className="py-3 px-4 text-center text-sm font-semibold">{'涨跌'}</th>
            <th className="py-3 px-4 text-center text-sm font-semibold">{'单位'}</th>
            <th className="py-3 px-4 text-center text-sm font-semibold">{'备注'}</th>
            <th className="py-3 px-4 text-center text-sm font-semibold">{'价格日期'}</th>
          </tr>
        </thead>
        <tbody>
          {domesticProducts.length > 0 && (
            <>
              <tr>
                <td colSpan={6} className="py-2 px-4 bg-primary-light/50 text-xs font-semibold text-primary">
                  {'国内碳产品'}
                </td>
              </tr>
              {renderRows(domesticProducts)}
            </>
          )}
          {internationalProducts.length > 0 && (
            <>
              <tr>
                <td colSpan={6} className="py-2 px-4 bg-primary-light/50 text-xs font-semibold text-primary">
                  {'国际碳产品'}
                </td>
              </tr>
              {renderRows(internationalProducts)}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

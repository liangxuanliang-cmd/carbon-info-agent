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
      </tr>
    ));

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary text-white">
            <th className="py-3 px-4 text-left text-sm font-semibold">{'\u78b3\u6c47\u7c7b\u578b'}</th>
            <th className="py-3 px-4 text-center text-sm font-semibold">{'\u6700\u65b0\u4ef7\u683c'}</th>
            <th className="py-3 px-4 text-center text-sm font-semibold">{'\u6da8\u8dcc'}</th>
            <th className="py-3 px-4 text-center text-sm font-semibold">{'\u5355\u4f4d'}</th>
            <th className="py-3 px-4 text-center text-sm font-semibold">{'\u5907\u6ce8'}</th>
          </tr>
        </thead>
        <tbody>
          {domesticProducts.length > 0 && (
            <>
              <tr>
                <td colSpan={5} className="py-2 px-4 bg-primary-light/50 text-xs font-semibold text-primary">
                  {'\u56fd\u5185\u78b3\u4ea7\u54c1'}
                </td>
              </tr>
              {renderRows(domesticProducts)}
            </>
          )}
          {internationalProducts.length > 0 && (
            <>
              <tr>
                <td colSpan={5} className="py-2 px-4 bg-primary-light/50 text-xs font-semibold text-primary">
                  {'\u56fd\u9645\u78b3\u4ea7\u54c1'}
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

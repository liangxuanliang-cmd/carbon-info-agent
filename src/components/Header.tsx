import { Leaf } from 'lucide-react';
import dayjs from 'dayjs';

export default function Header() {
  return (
    <header className="bg-primary-dark text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Leaf className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold tracking-wide m-0">
              {'\u78b3\u666e\u60e0\u8d44\u8bafAgent'}
            </h1>
            <p className="text-sm text-green-200 m-0">
              Carbon Inclusive Information Dashboard
            </p>
          </div>
        </div>
        <div className="text-sm text-green-200">
          {dayjs().format('YYYY\u5e74MM\u6708DD\u65e5')}
        </div>
      </div>
    </header>
  );
}

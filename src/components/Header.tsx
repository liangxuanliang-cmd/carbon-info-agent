import { Building2 } from 'lucide-react';
import dayjs from 'dayjs';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-dark to-primary text-white py-5 px-6 shadow-lg border-b-4 border-gov-gold">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-2 rounded-lg">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide m-0">
              {'碳普惠资讯服务平台'}
            </h1>
            <p className="text-sm text-blue-200 m-0">
              Carbon Inclusive Information Service Platform
            </p>
          </div>
        </div>
        <div className="text-sm text-blue-100 bg-white/10 px-4 py-2 rounded-lg">
          {dayjs().format('YYYY年MM月DD日')}
        </div>
      </div>
    </header>
  );
}

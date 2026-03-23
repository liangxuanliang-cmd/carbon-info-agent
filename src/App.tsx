import { useState } from 'react';
import { FileText, TrendingUp, Calculator, Newspaper } from 'lucide-react';
import Header from './components/Header';
import PolicySection from './sections/PolicySection';
import CarbonPriceSection from './sections/CarbonPriceSection';
import CalculatorSection from './sections/CalculatorSection';
import NewsSection from './sections/NewsSection';

const TABS = [
  { key: 'policy', label: '\u653f\u7b56\u6c47\u603b', icon: <FileText className="w-4 h-4" /> },
  { key: 'price', label: '\u78b3\u4ef7\u6c47\u603b', icon: <TrendingUp className="w-4 h-4" /> },
  { key: 'calculator', label: '\u78b3\u91cf\u8ba1\u7b97\u5668', icon: <Calculator className="w-4 h-4" /> },
  { key: 'news', label: '\u6bcf\u65e5\u8d44\u8baf', icon: <Newspaper className="w-4 h-4" /> },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('policy');

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Header />

      {/* Top Tab Navigation */}
      <nav className="bg-white border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer bg-transparent ${
                  activeTab === tab.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-primary hover:border-primary/30'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full">
        {activeTab === 'policy' && <PolicySection />}
        {activeTab === 'price' && <CarbonPriceSection />}
        {activeTab === 'calculator' && <CalculatorSection />}
        {activeTab === 'news' && <NewsSection />}
      </main>

      <footer className="bg-primary-dark text-blue-200 text-center text-xs py-4 border-t border-primary">
        &copy; 2026 {'\u78b3\u666e\u60e0\u8d44\u8baf\u670d\u52a1\u5e73\u53f0'} &middot; Carbon Inclusive Information Service Platform
      </footer>
    </div>
  );
}

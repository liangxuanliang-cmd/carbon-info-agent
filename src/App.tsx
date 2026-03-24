import { useState } from 'react';
import { FileText, TrendingUp, Calculator, Newspaper, Home } from 'lucide-react';
import Header from './components/Header';
import HomeDashboard from './sections/HomeDashboard';
import PolicySection from './sections/PolicySection';
import CarbonPriceSection from './sections/CarbonPriceSection';
import CalculatorSection from './sections/CalculatorSection';
import NewsSection from './sections/NewsSection';

const TABS = [
  { key: 'home', label: '首页', icon: Home },
  { key: 'policy', label: '政策汇总', icon: FileText },
  { key: 'price', label: '碳价汇总', icon: TrendingUp },
  { key: 'calculator', label: '碳量计算器', icon: Calculator },
  { key: 'news', label: '每日资讯', icon: Newspaper },
] as const;

type TabKey = (typeof TABS)[number]['key'];



// 返回首页按钮
function BackToHome({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
    >
      <Home className="w-4 h-4" />
      返回首页
    </button>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const handleNavigate = (tab: Exclude<TabKey, 'home'>) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Header />

      {/* Top Tab Navigation - 首页时隐藏Tab栏 */}
      {activeTab !== 'home' && (
        <nav className="bg-white border-b border-border sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
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
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
              

            </div>
          </div>
        </nav>
      )}

      <main className="flex-1">
        {activeTab === 'home' && <HomeDashboard onNavigate={handleNavigate} />}
        
        {activeTab !== 'home' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* 模块页面头部 */}
            <div className="flex items-center justify-between mb-6">
              <BackToHome onClick={() => setActiveTab('home')} />
            </div>
            
            {activeTab === 'policy' && <PolicySection />}
            {activeTab === 'price' && <CarbonPriceSection />}
            {activeTab === 'calculator' && <CalculatorSection />}
            {activeTab === 'news' && <NewsSection />}
          </div>
        )}
      </main>

      {activeTab !== 'home' && (
        <footer className="bg-primary-dark text-blue-200 text-center text-xs py-4 border-t border-primary">
          &copy; 2026 碳普惠资讯服务平台 &middot; Carbon Inclusive Information Service Platform
        </footer>
      )}
    </div>
  );
}

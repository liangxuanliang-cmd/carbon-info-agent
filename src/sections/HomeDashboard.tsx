/**
 * 大屏风格首页仪表盘
 * 展示核心指标和模块导航
 */

import { useMemo } from 'react';
import { FileText, TrendingUp, Calculator, Newspaper, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { policies } from '../data/policies';
import { getLatestPrices } from '../data/carbonPrices';

interface HomeDashboardProps {
  onNavigate: (tab: 'policy' | 'price' | 'calculator' | 'news') => void;
}

// 获取今日CCER价格
function useCCERPrice() {
  return useMemo(() => {
    const prices = getLatestPrices();
    const ccer = prices.find((p) => p.productId === 'CCER');
    return ccer || { price: 0, change: 0, updateDate: '' };
  }, []);
}

// 获取统计数据
function useStatistics() {
  return useMemo(() => {
    const policyCount = policies.filter((p) => p.category === 'policy' && p.status === 'active').length;
    const methodologyCount = policies.filter((p) => p.category === 'methodology' && p.status === 'active').length;
    
    // 已落地碳普惠城市（根据数据中的省份/城市统计）
    const cities = new Set<string>();
    policies.forEach((p) => {
      if (p.province && p.province !== '全国') {
        cities.add(p.province);
      }
    });
    
    return {
      policyCount,
      methodologyCount,
      cityCount: cities.size,
    };
  }, []);
}

// 指标卡片组件
function MetricCard({
  title,
  value,
  unit,
  change,
  updateDate,
  icon: Icon,
  onClick,
}: {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  updateDate?: string;
  icon: React.ElementType;
  onClick?: () => void;
}) {
  const isPositive = change && change >= 0;
  
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 transition-all duration-300 hover:bg-white/20 hover:scale-105 cursor-pointer group`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-50 transition-opacity">
        <Icon className="w-12 h-12 text-white" />
      </div>
      
      <div className="relative z-10">
        <p className="text-white/70 text-sm font-medium mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white">{value}</span>
          {unit && <span className="text-white/60 text-lg">{unit}</span>}
        </div>
        
        {change !== undefined && (
          <div className={`flex items-center gap-1 mt-2 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{Math.abs(change).toFixed(2)}%</span>
            {updateDate && <span className="text-white/50 ml-2">{updateDate}</span>}
          </div>
        )}
      </div>
      
      {/* 装饰性光晕 */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-400/30 transition-colors" />
    </div>
  );
}

// 模块导航按钮
function ModuleButton({
  label,
  icon: Icon,
  onClick,
  color,
}: {
  label: string;
  icon: React.ElementType;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 group`}
    >
      <div className={`p-4 rounded-xl ${color} bg-opacity-20 group-hover:scale-110 transition-transform`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <span className="text-white font-medium">{label}</span>
    </button>
  );
}

export default function HomeDashboard({ onNavigate }: HomeDashboardProps) {
  const ccer = useCCERPrice();
  const stats = useStatistics();

  const modules = [
    { key: 'price' as const, label: '碳价汇总', icon: TrendingUp, color: 'bg-blue-500' },
    { key: 'policy' as const, label: '政策汇总', icon: FileText, color: 'bg-green-500' },
    { key: 'calculator' as const, label: '碳量计算器', icon: Calculator, color: 'bg-orange-500' },
    { key: 'news' as const, label: '每日资讯', icon: Newspaper, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景图片和蒙版 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-black/70" />
      
      {/* 内容区域 */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            碳普惠资讯服务平台
          </h1>
          <p className="text-white/60 text-lg">
            Carbon Inclusive Information Service Platform
          </p>
        </div>

        {/* 核心指标卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            title="今日CCER价格"
            value={ccer.price.toFixed(2)}
            unit="元/吨"
            change={ccer.change}
            updateDate={ccer.updateDate}
            icon={TrendingUp}
            onClick={() => onNavigate('price')}
          />
          <MetricCard
            title="政策数量"
            value={stats.policyCount}
            unit="项"
            icon={FileText}
            onClick={() => onNavigate('policy')}
          />
          <MetricCard
            title="方法学数量"
            value={stats.methodologyCount}
            unit="项"
            icon={Calculator}
            onClick={() => onNavigate('policy')}
          />
          <MetricCard
            title="已落地城市"
            value={stats.cityCount}
            unit="个"
            icon={Newspaper}
            onClick={() => onNavigate('policy')}
          />
        </div>

        {/* 模块导航 */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white/80 text-lg font-medium mb-6 text-center">
            功能模块
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {modules.map((module) => (
              <ModuleButton
                key={module.key}
                label={module.label}
                icon={module.icon}
                color={module.color}
                onClick={() => onNavigate(module.key)}
              />
            ))}
          </div>
        </div>

        {/* 底部信息 */}
        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm">
            数据每日更新 · 覆盖全国重点碳普惠城市
          </p>
        </div>
      </div>
    </div>
  );
}

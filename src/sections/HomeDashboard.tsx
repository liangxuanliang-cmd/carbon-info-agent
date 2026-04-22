/**
 * 大屏风格首页仪表盘
 * 展示功能模块导航
 */

import { FileText, TrendingUp, Newspaper, BarChart3, Briefcase, Wrench, Leaf } from 'lucide-react';

interface HomeDashboardProps {
  onNavigate: (tab: TabKey) => void;
}

type TabKey = 'policy' | 'price' | 'c12bi' | 'business' | 'tools' | 'aliesg' | 'news';

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
      className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 group"
    >
      <div className={`p-4 rounded-xl ${color} bg-opacity-20 group-hover:scale-110 transition-transform`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <span className="text-white font-medium">{label}</span>
    </button>
  );
}

export default function HomeDashboard({ onNavigate }: HomeDashboardProps) {
  const modules = [
    { key: 'price' as TabKey, label: '碳价汇总', icon: TrendingUp, color: 'bg-blue-500' },
    { key: 'policy' as TabKey, label: '政策汇总', icon: FileText, color: 'bg-green-500' },
    { key: 'c12bi' as TabKey, label: '数据看板', icon: BarChart3, color: 'bg-cyan-500' },
    { key: 'business' as TabKey, label: '商务AI', icon: Briefcase, color: 'bg-amber-500' },
    { key: 'tools' as TabKey, label: '商务小工具', icon: Wrench, color: 'bg-gray-500' },
    { key: 'aliesg' as TabKey, label: '阿里ESG', icon: Leaf, color: 'bg-emerald-500' },
    { key: 'news' as TabKey, label: '每日资讯', icon: Newspaper, color: 'bg-purple-500' },
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
            碳普惠BDSA智能体
          </h1>
          <p className="text-white/60 text-lg">
            Carbon Inclusive BDSA Intelligent Agent
          </p>
        </div>

        {/* 模块导航 */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white/80 text-lg font-medium mb-6 text-center">
            功能模块
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

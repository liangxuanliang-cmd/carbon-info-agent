import { useState, useMemo } from 'react';
import { Database, Megaphone, Globe2, ExternalLink, Calculator, Bus, TrainFront, Bike, Footprints, Zap, Car, Image, FileText, Video, Palette, RefreshCw, Info } from 'lucide-react';
import SectionCard from '../components/SectionCard';
import { methodologies } from '../data/emissionFactors';
import { regionParameters } from '../data/parameterDocument';
import { calculateReduction } from '../utils/calculator';
import type { Methodology } from '../types';

interface LinkItem {
  name: string;
  url: string;
}

const OFFICIAL_WEBSITES: LinkItem[] = [
  // 国家部委
  { name: '生态环境部', url: 'https://www.mee.gov.cn/' },
  // 城市生态环境局
  { name: '北京市生态环境局', url: 'https://sthjj.beijing.gov.cn/' },
  { name: '上海市生态环境局', url: 'https://sthj.sh.gov.cn/' },
  { name: '广州市生态环境局', url: 'https://sthjj.gz.gov.cn/' },
  { name: '深圳市生态环境局', url: 'https://meeb.sz.gov.cn/' },
  { name: '重庆市生态环境局', url: 'https://sthj.cq.gov.cn/' },
  { name: '成都市生态环境局', url: 'https://sthj.chengdu.gov.cn/' },
  { name: '武汉市生态环境局', url: 'https://sthj.wuhan.gov.cn/' },
  { name: '天津市生态环境局', url: 'https://sthjt.tj.gov.cn/' },
  // 省级生态环境厅
  { name: '浙江省生态环境厅', url: 'https://zjt.zj.gov.cn/' },
  { name: '江苏省生态环境厅', url: 'https://stt.jiangsu.gov.cn/' },
  { name: '山东省生态环境厅', url: 'https://sthj.shandong.gov.cn/' },
  // 行业网站
  { name: '全国碳市场', url: 'http://www.cetexn.com.cn/' },
  { name: '中国环境报', url: 'https://www.cenews.com.cn/' },
  { name: '碳排放权注册登记系统', url: 'https://www.hbex.cn/' },
  { name: '上海环境能源交易所', url: 'https://www.cneeex.com/' },
  { name: '北京绿色交易所', url: 'https://www.bceex.cn/' },
  { name: '广州碳排放权交易所', url: 'http://www.cnex.cn/' },
];

const PROMO_MATERIALS = [
  { name: 'Logo', icon: Palette, color: 'bg-blue-500', url: 'https://alidocs.dingtalk.com/i/nodes/X6GRezwJlL427v1bFr2GroogJdqbropQ?utm_scene=team_space' },
  { name: '介绍材料', icon: FileText, color: 'bg-green-500', url: 'https://alidocs.dingtalk.com/i/nodes/X6GRezwJlL427v1bFr2GroogJdqbropQ?utm_scene=team_space' },
  { name: '传播物料', icon: Image, color: 'bg-orange-500', url: 'https://alidocs.dingtalk.com/i/nodes/X6GRezwJlL427v1bFr2GroogJdqbropQ?utm_scene=team_space' },
  { name: '视频物料', icon: Video, color: 'bg-purple-500', url: 'https://alidocs.dingtalk.com/i/nodes/X6GRezwJlL427v1bFr2GroogJdqbropQ?utm_scene=team_space' },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  Bus: <Bus className="w-5 h-5" />,
  TrainFront: <TrainFront className="w-5 h-5" />,
  Bike: <Bike className="w-5 h-5" />,
  Footprints: <Footprints className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
};

function handlePromoMaterialClick(url: string) {
  window.open(url, '_blank');
}

// 碳量计算器组件
function CarbonCalculator() {
  const [selectedProvince, setSelectedProvince] = useState('北京');
  const [selectedMode, setSelectedMode] = useState('');
  const [distance, setDistance] = useState<number>(10);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentMethodology = useMemo(
    () => methodologies.find((m: Methodology) => m.province === selectedProvince),
    [selectedProvince]
  );

  const currentMode = useMemo(
    () => currentMethodology?.transportModes.find((m) => m.mode === selectedMode),
    [currentMethodology, selectedMode]
  );

  const result = useMemo(() => {
    if (!currentMode || distance <= 0) return null;
    return calculateReduction(currentMode.baselineFactor, currentMode.scenarioFactor, distance);
  }, [currentMode, distance]);

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setSelectedMode('');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // 模拟刷新，重新计算方法学数据
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <SectionCard
      title="碳量计算器"
      subtitle="基于各省市碳普惠方法学计算减排量"
      icon={<Calculator className="w-5 h-5" />}
      extra={
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? '刷新中...' : '手动刷新'}
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input area */}
        <div className="space-y-5">
          {/* Province selector */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              选择省市
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
            >
              {methodologies.map((m: Methodology) => (
                <option key={m.id} value={m.province}>
                  {m.province}
                </option>
              ))}
            </select>
            {currentMethodology && (
              <p className="text-xs text-text-secondary mt-1 m-0">
                方法学：{currentMethodology.name}
              </p>
            )}
          </div>

          {/* Transport mode selector */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              选择出行方式
            </label>
            <div className="grid grid-cols-3 gap-2">
              {currentMethodology?.transportModes.map((mode) => (
                <button
                  key={mode.mode}
                  onClick={() => setSelectedMode(mode.mode)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedMode === mode.mode
                      ? 'border-primary bg-primary-light text-primary shadow-sm'
                      : 'border-border bg-white text-text-secondary hover:border-primary/30'
                  }`}
                >
                  {ICON_MAP[mode.icon] || <Bus className="w-5 h-5" />}
                  <span className="text-xs font-medium">{mode.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Distance input */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              输入出行距离
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(Math.max(0, parseFloat(e.target.value) || 0))}
                min={0}
                step={1}
                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder="请输入距离"
              />
              <span className="text-sm text-text-secondary">公里</span>
            </div>
          </div>
        </div>

        {/* Result area */}
        <div className="flex flex-col items-center justify-center gap-4">
          {result && currentMode ? (
            <>
              <div className="w-full bg-primary-light/50 rounded-xl p-6 text-center border border-primary/20">
                <p className="text-sm text-text-secondary mb-1 m-0">预估碳减排量</p>
                <p className="text-4xl font-bold text-primary my-3">
                  {result.tons.toFixed(4)}
                  <span className="text-base font-normal text-text-secondary ml-1">
                    吨 CO₂
                  </span>
                </p>
                <p className="text-sm text-text-secondary m-0">
                  = {result.kg.toFixed(2)} 千克 CO₂
                </p>

                <div className="mt-4 pt-4 border-t border-primary/20 text-left space-y-1">
                  <p className="text-xs text-text-secondary m-0">
                    <span className="font-medium">基准排放因子：</span>
                    {currentMode.baselineFactor} kgCO₂/km
                  </p>
                  <p className="text-xs text-text-secondary m-0">
                    <span className="font-medium">场景排放因子：</span>
                    {currentMode.scenarioFactor} kgCO₂/km
                  </p>
                  <p className="text-xs text-text-secondary m-0">
                    <span className="font-medium">减排因子：</span>
                    {(currentMode.baselineFactor - currentMode.scenarioFactor).toFixed(3)} kgCO₂/km
                  </p>
                  <p className="text-xs text-text-secondary m-0">
                    <span className="font-medium">计算公式：</span>
                    ({currentMode.baselineFactor} - {currentMode.scenarioFactor}) x {distance} / 1000
                  </p>
                </div>
              </div>

              {/* 参数文档关联信息 */}
              {(() => {
                const regionParam = regionParameters.find(p => 
                  p.region === selectedProvince || 
                  (selectedProvince === '广东省' && p.region === '广东省')
                );
                if (!regionParam) return null;
                
                return (
                  <div className="w-full bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <div className="flex items-start gap-2 mb-2">
                      <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <h4 className="text-sm font-semibold text-amber-800">参数来源</h4>
                    </div>
                    <p className="text-xs text-amber-700 mb-1">
                      <span className="font-medium">方法学：</span>{regionParam.methodologyName}
                    </p>
                    <p className="text-xs text-amber-700 mb-1">
                      <span className="font-medium">发布机构：</span>{regionParam.issuingAuthority}
                    </p>
                    <p className="text-xs text-amber-700 mb-1">
                      <span className="font-medium">生效日期：</span>{regionParam.effectiveDate}
                    </p>
                    <a
                      href={regionParam.methodologyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-800 mt-1"
                    >
                      查看方法学原文
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                );
              })()}
            </>
          ) : (
            <div className="text-center text-text-secondary py-8">
              <Calculator className="w-16 h-16 mx-auto mb-3 opacity-20" />
              <p className="text-sm m-0">请选择出行方式并输入距离</p>
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
}

export default function ToolsSection() {
  return (
    <div className="space-y-6">
      {/* 碳量计算器 */}
      <CarbonCalculator />

      {/* 数据查询 */}
      <SectionCard
        title="数据查询"
        subtitle="碳普惠相关数据检索与分析"
        icon={<Database className="w-5 h-5" />}
      >
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Database className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">开发中</h3>
          <p className="text-sm text-text-secondary text-center">
            数据查询功能正在开发中，敬请期待
          </p>
        </div>
      </SectionCard>

      {/* 宣传素材 */}
      <SectionCard
        title="宣传素材"
        subtitle="碳普惠宣传材料与视觉资源"
        icon={<Megaphone className="w-5 h-5" />}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PROMO_MATERIALS.map((item) => (
            <button
              key={item.name}
              onClick={() => handlePromoMaterialClick(item.url)}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white border border-border hover:border-primary hover:shadow-md transition-all group cursor-pointer"
            >
              <div className={`p-4 rounded-xl ${item.color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-8 h-8 ${item.color.replace('bg-', 'text-')}`} />
              </div>
              <span className="text-sm font-medium text-text-primary">{item.name}</span>
            </button>
          ))}
        </div>
      </SectionCard>

      {/* 官网聚集地 */}
      <SectionCard
        title="官网聚集地"
        subtitle="生态环境部门与碳行业相关网站导航"
        icon={<Globe2 className="w-5 h-5" />}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {OFFICIAL_WEBSITES.map((site) => (
            <a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 bg-white border border-border rounded-lg hover:border-primary hover:shadow-sm transition-all group"
            >
              <Globe2 className="w-4 h-4 text-text-secondary group-hover:text-primary flex-shrink-0" />
              <span className="text-sm text-text-primary truncate">{site.name}</span>
              <ExternalLink className="w-3.5 h-3.5 text-text-secondary ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </a>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

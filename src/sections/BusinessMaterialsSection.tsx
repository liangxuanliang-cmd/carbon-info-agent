import { useState, useRef, useEffect } from 'react';
import { Briefcase, QrCode, FileText, Info, Copy, Check, Sparkles, FileSpreadsheet } from 'lucide-react';
import SectionCard from '../components/SectionCard';

interface QRCodeItem {
  city: string;
  filename: string;
}

const QR_CODES: QRCodeItem[] = [
  { city: '北京', filename: 'beijing' },
  { city: '上海', filename: 'shanghai' },
  { city: '广州', filename: 'guangzhou' },
  { city: '深圳', filename: 'shenzhen' },
  { city: '成都', filename: 'chengdu' },
  { city: '杭州', filename: 'hangzhou' },
  { city: '南京', filename: 'nanjing' },
  { city: '武汉', filename: 'wuhan' },
  { city: '济南', filename: 'jinan' },
  { city: '重庆', filename: 'chongqing' },
];

interface BDFormData {
  province: string;
  hasPlatform: string;
  drivingPV: string;
  newEnergyPV: string;
  walkingPV: string;
  cyclingPV: string;
  carbonPrice: string;
}

const DEFAULT_FORM: BDFormData = {
  province: '',
  hasPlatform: '',
  drivingPV: '',
  newEnergyPV: '',
  walkingPV: '',
  cyclingPV: '',
  carbonPrice: '',
};

const PV_SQL_MAP: Record<string, string> = {
  walkingPV: `SELECT COUNT(distinct navi_id) as pv
from gd_cdm.dwd_gd_trvl_navi_bycwlk_di
WHERE ds = 查询日期
AND vehicletype = '3'
AND SUBSTR(source_adcode,1,4) = 城市前4位adocode
;`,
  cyclingPV: `SELECT COUNT(distinct navi_id) as pv 
from gd_cdm.dwd_gd_trvl_navi_bycwlk_di
WHERE ds = 查询日期
AND vehicletype != '3'
AND SUBSTR(source_adcode,1,4) = 城市前4位adocode
;`,
  drivingPV: `SELECT  COUNT(navi_id) as pv
FROM    gd_cdm.dwd_gd_trvl_navi_drv_di
WHERE   route_index = '0'
AND     first_route_strategy  IN('高德推荐（千人十面）','高德推荐（千人十面2.0）')
AND     vehicle_type = '0'
AND     is_first_time_route = true
AND     reroute_count = '0'
AND     is_valid_navi_route = true
AND     is_valid_navi_route_include_auto = true
AND     remain_distance <= 50
AND     ds = 查询日期
AND source_adcode LIKE '城市前4位adocode%' 
AND target_adcode LIKE '城市前4位adocode%' 
;`,
  newEnergyPV: `SELECT  COUNT(navi_id) as pv
FROM    gd_cdm.dwd_gd_trvl_navi_drv_di
WHERE   vehicle_type = '2'
AND     ds = 查询日期
AND source_adcode LIKE '城市前4位adocode%' 
AND target_adcode LIKE '城市前4位adocode%' 
;`,
};

function SqlTooltip({ sql }: { sql: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative inline-flex items-center ml-1.5">
      <button
        type="button"
        onMouseEnter={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setIsVisible(true);
        }}
        onMouseLeave={() => {
          timeoutRef.current = setTimeout(() => setIsVisible(false), 200);
        }}
        className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
      >
        <span className="text-[10px] font-mono font-bold">&lt;SQL&gt;</span>
      </button>

      {isVisible && (
        <div
          className="absolute z-50 bottom-full left-0 mb-2 w-80"
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setIsVisible(true);
          }}
          onMouseLeave={() => {
            timeoutRef.current = setTimeout(() => setIsVisible(false), 200);
          }}
        >
          <div className="bg-gray-900 text-white rounded-lg shadow-xl p-3 text-xs">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-700">
              <span className="font-semibold text-gray-300">查询SQL</span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-green-400" />
                    <span className="text-green-400">已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>复制</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-gray-300 whitespace-pre-wrap break-all font-mono leading-relaxed max-h-60 overflow-y-auto">
              {sql}
            </pre>
          </div>
          <div className="w-3 h-3 bg-gray-900 rotate-45 -mt-1.5 ml-4" />
        </div>
      )}
    </div>
  );
}

function SqlLabel({ label, field }: { label: string; field: keyof BDFormData }) {
  const sql = PV_SQL_MAP[field];
  return (
    <label className="block text-xs font-medium text-text-primary mb-1.5">
      <span className="inline-flex items-center">
        {label}
        {sql && <SqlTooltip sql={sql} />}
      </span>
    </label>
  );
}

function QRCodeCard({ city, filename }: QRCodeItem) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3">
        <img
          src={`/qr-codes/${filename}.png`}
          alt={`${city}绿色出行二维码`}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="px-4 py-3 text-center">
        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
          {city}
        </span>
      </div>
    </div>
  );
}

export default function BusinessMaterialsSection() {
  const [formData, setFormData] = useState<BDFormData>(DEFAULT_FORM);
  const [showResult, setShowResult] = useState(false);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const handleChange = (field: keyof BDFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setShowResult(false);
  };

  const handleCalculate = () => {
    setShowResult(true);
  };

  const handleGeneratePPT = async () => {
    setIsGenerating('ppt');
    try {
      // 调用PPT生成skill
      const formDataStr = JSON.stringify(formData, null, 2);
      alert(`PPT生成请求已发送！

参数：${formDataStr}

提示：需要安装PPT生成skill后才能自动生成。安装口令：帮我下载并安装这个技能：https://cloudmap-skillhub.amap-inc.com/api/skills/ppt-html/download?version=1.0.0`);
    } catch (error) {
      console.error('PPT生成失败:', error);
      alert('PPT生成失败，请稍后重试');
    } finally {
      setIsGenerating(null);
    }
  };

  const handleGeneratePDD = async () => {
    setIsGenerating('pdd');
    try {
      const formDataStr = JSON.stringify(formData, null, 2);
      alert(`PDD生成请求已发送！\n\n参数：${formDataStr}\n\n提示：PDD将根据项目文档模板自动生成，包含项目背景、技术方案、实施计划等内容。`);
    } catch (error) {
      console.error('PDD生成失败:', error);
      alert('PDD生成失败，请稍后重试');
    } finally {
      setIsGenerating(null);
    }
  };

  const handleInputChange = (field: keyof BDFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleChange(field, e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Section 1: 绿色出行碳普惠BD方案 (调换位置，放在前面) */}
      <SectionCard
        title="绿色出行碳普惠BD方案"
        subtitle="输入指标生成商务方案"
        icon={<Briefcase className="w-5 h-5" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                省/市名称
              </label>
              <input
                type="text"
                value={formData.province}
                onChange={handleInputChange('province')}
                placeholder="例如：浙江省"
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                当前是否已有碳普惠平台
              </label>
              <select
                value={formData.hasPlatform}
                onChange={handleInputChange('hasPlatform')}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
              >
                <option value="">请选择</option>
                <option value="yes">是</option>
                <option value="no">否</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <SqlLabel label="AI领航日pv（次）" field="drivingPV" />
                <input
                  type="number"
                  value={formData.drivingPV}
                  onChange={handleInputChange('drivingPV')}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
                />
              </div>
              <div>
                <SqlLabel label="纯电车日pv（次）" field="newEnergyPV" />
                <input
                  type="number"
                  value={formData.newEnergyPV}
                  onChange={handleInputChange('newEnergyPV')}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <SqlLabel label="步行导航日pv（次）" field="walkingPV" />
                <input
                  type="number"
                  value={formData.walkingPV}
                  onChange={handleInputChange('walkingPV')}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
                />
              </div>
              <div>
                <SqlLabel label="骑行导航日pv（次）" field="cyclingPV" />
                <input
                  type="number"
                  value={formData.cyclingPV}
                  onChange={handleInputChange('cyclingPV')}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                碳市场价格预估（元/吨）
              </label>
              <input
                type="number"
                value={formData.carbonPrice}
                onChange={handleInputChange('carbonPrice')}
                placeholder="0"
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
              />
            </div>

            <button
              onClick={handleCalculate}
              disabled={!formData.province}
              className="w-full px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              预估计算 & 生成方案
            </button>
          </div>

          {/* Result Area */}
          <div className="space-y-4">
            {showResult ? (
              <>
                {/* 预估结果 */}
                <div className="bg-primary-light/50 rounded-xl p-6 border border-primary/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="w-5 h-5 text-primary" />
                    <h3 className="text-base font-semibold text-primary">预估结果</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-white rounded-lg p-3">
                      <span className="text-sm text-text-secondary">年均减排量预估</span>
                      <span className="text-xl font-bold text-primary">-- <span className="text-sm font-normal text-text-secondary">吨</span></span>
                    </div>
                    <div className="flex items-center justify-between bg-white rounded-lg p-3">
                      <span className="text-sm text-text-secondary">年交易规模预估</span>
                      <span className="text-xl font-bold text-primary">-- <span className="text-sm font-normal text-text-secondary">元</span></span>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary mt-3">
                    计算公式将在后期补充
                  </p>
                </div>

                {/* 生成按钮 */}
                <div className="space-y-3">
                  <button
                    onClick={handleGeneratePPT}
                    disabled={isGenerating === 'ppt'}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating === 'ppt' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        生成中...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        点击生成商务PPT
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleGeneratePDD}
                    disabled={isGenerating === 'pdd'}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover:from-green-600 hover:to-emerald-700 transition-all cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating === 'pdd' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        生成中...
                      </>
                    ) : (
                      <>
                        <FileSpreadsheet className="w-4 h-4" />
                        点击生成项目PDD
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl border border-dashed border-border">
                <FileText className="w-12 h-12 text-text-secondary opacity-20 mb-3" />
                <p className="text-sm text-text-secondary">请先填写信息并点击预估计算</p>
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      {/* Section 2: 绿色出行页面检视 (调换位置，放在后面) */}
      <SectionCard
        title="绿色出行页面检视"
        subtitle="向用户展示的绿色出行入口页面 - 使用高德地图App扫描二维码访问"
        icon={<QrCode className="w-5 h-5" />}
      >
        {/* 使用说明 */}
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <QrCode className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-800">
            <span className="font-medium">使用方法：</span>
            打开高德地图 App &gt;&gt; 首页 &gt;&gt; 扫一扫，扫描对应城市二维码即可访问绿色出行页面
          </p>
        </div>

        {/* 10个城市二维码网格 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {QR_CODES.map((qr) => (
            <QRCodeCard key={qr.filename} city={qr.city} filename={qr.filename} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

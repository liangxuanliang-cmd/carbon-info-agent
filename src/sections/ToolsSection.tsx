import { Database, Megaphone, Globe2, ExternalLink } from 'lucide-react';
import SectionCard from '../components/SectionCard';

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

function handlePromoMaterialClick() {
  window.open('https://alidocs.dingtalk.com/i/nodes/X6GRezwJlL427v1bFr2GroogJdqbropQ?utm_scene=team_space', '_blank');
}

export default function ToolsSection() {
  return (
    <div className="space-y-6">
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
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
            <Megaphone className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">碳普惠宣传素材库</h3>
          <p className="text-sm text-text-secondary mb-6 text-center max-w-md">
            点击前往钉钉文档查看宣传素材，包含海报、图文、视频等资源
          </p>
          <button
            onClick={handlePromoMaterialClick}
            className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            前往素材库
          </button>
        </div>
      </SectionCard>

      {/* 官网聚集地 */}
      <SectionCard
        title="官网聚集地"
        subtitle="生态环境部门与碳行业相关网站导航"
        icon={<Globe2 className="w-5 h-5" />}
      >
        <div className="space-y-6">
          {/* 国家部委 */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              国家部委
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {OFFICIAL_WEBSITES.filter((_, i) => i === 0).map((site) => (
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
          </div>

          {/* 城市生态环境局 */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
              城市生态环境局
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {OFFICIAL_WEBSITES.slice(1, 9).map((site) => (
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
          </div>

          {/* 省级生态环境厅 */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              省级生态环境厅
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {OFFICIAL_WEBSITES.slice(9, 12).map((site) => (
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
          </div>

          {/* 行业网站 */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" />
              碳行业网站
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {OFFICIAL_WEBSITES.slice(12).map((site) => (
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
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

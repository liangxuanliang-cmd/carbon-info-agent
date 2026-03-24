/**
 * 政策详情页爬虫
 * 从政府网站抓取真实的政策详情页URL和内容
 */

import { BaseCrawler } from './baseCrawler';

export interface PolicyDetailData {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  content?: string;
  region: string;
  level: 'national' | 'provincial' | 'city';
}

// 政策数据源配置 - 包含列表页和详情页规则
const POLICY_SOURCES = [
  {
    name: '生态环境部',
    region: '全国',
    level: 'national' as const,
    listUrl: 'https://www.mee.gov.cn/zcwj/zcjd/',
    detailUrlPattern: /https:\/\/www\.mee\.gov\.cn\/[^\s"']+\.shtml/g,
    titleSelector: /<title>([^<]+)<\/title>/,
    dateSelector: /(\d{4}-\d{2}-\d{2})/,
  },
  {
    name: '北京市生态环境局',
    region: '北京市',
    level: 'city' as const,
    listUrl: 'https://sthjj.beijing.gov.cn/bjhrb/index/xxgk69/zfxxgk43/fdzdgknr2/zcfb/',
    detailUrlPattern: /https:\/\/sthjj\.beijing\.gov\.cn\/[^\s"']+\.html/g,
    titleSelector: /<title>([^<]+)<\/title>/,
    dateSelector: /(\d{4}-\d{2}-\d{2})/,
  },
  {
    name: '上海市生态环境局',
    region: '上海市',
    level: 'city' as const,
    listUrl: 'https://sthj.sh.gov.cn/zwgk/zcwj/zcjd/',
    detailUrlPattern: /https:\/\/sthj\.sh\.gov\.cn\/[^\s"']+\.html/g,
    titleSelector: /<title>([^<]+)<\/title>/,
    dateSelector: /(\d{4}-\d{2}-\d{2})/,
  },
  {
    name: '深圳市生态环境局',
    region: '深圳市',
    level: 'city' as const,
    listUrl: 'https://meeb.sz.gov.cn/xxgk/zcfg/zcfg/hblgfxwj/',
    detailUrlPattern: /https:\/\/meeb\.sz\.gov\.cn\/[^\s"']+\.html/g,
    titleSelector: /<title>([^<]+)<\/title>/,
    dateSelector: /(\d{4}-\d{2}-\d{2})/,
  },
  {
    name: '广东省生态环境厅',
    region: '广东省',
    level: 'provincial' as const,
    listUrl: 'https://gdee.gd.gov.cn/zwgk/zcwj/zcjd/',
    detailUrlPattern: /https:\/\/gdee\.gd\.gov\.cn\/[^\s"']+\.html/g,
    titleSelector: /<title>([^<]+)<\/title>/,
    dateSelector: /(\d{4}-\d{2}-\d{2})/,
  },
];

export class PolicyDetailCrawler extends BaseCrawler<PolicyDetailData[]> {
  constructor() {
    super({
      name: 'PolicyDetail',
      baseUrl: '',
      rateLimitMs: 5000, // 更严格的限流，避免被封
      timeout: 20000,
      retries: 3,
    });
  }

  async crawl(): Promise<PolicyDetailData[]> {
    const allPolicies: PolicyDetailData[] = [];

    for (const source of POLICY_SOURCES) {
      try {
        this.log(`正在爬取 ${source.name} 的政策列表...`);
        
        // 1. 获取列表页
        const listHtml = await this.fetch(source.listUrl);
        
        // 2. 提取详情页URL
        const detailUrls = this.extractDetailUrls(listHtml, source.detailUrlPattern);
        this.log(`发现 ${detailUrls.length} 个潜在政策链接`);
        
        // 3. 访问每个详情页获取完整信息
        for (const url of detailUrls.slice(0, 5)) { // 只取前5个最新的
          try {
            const policy = await this.parsePolicyDetail(url, source);
            if (policy && this.isCarbonRelated(policy.title)) {
              allPolicies.push(policy);
              this.log(`✅ 获取政策: ${policy.title.substring(0, 50)}...`);
            }
          } catch (error) {
            this.log(`❌ 解析详情页失败: ${url}`);
          }
        }
      } catch (error) {
        this.log(`❌ ${source.name} 爬取失败: ${error}`);
      }
    }

    return this.deduplicateByUrl(allPolicies);
  }

  /**
   * 从列表页提取详情页URL
   */
  private extractDetailUrls(html: string, pattern: RegExp): string[] {
    const urls: string[] = [];
    let match;
    
    // 使用正则匹配所有详情页链接
    while ((match = pattern.exec(html)) !== null) {
      urls.push(match[0]);
    }
    
    // 去重并过滤
    return [...new Set(urls)].filter(url => 
      url.includes('202') || // 包含年份
      url.includes('t202') || // 政府网站常见格式
      url.includes('post_')   // 深圳等网站格式
    );
  }

  /**
   * 解析政策详情页
   */
  private async parsePolicyDetail(
    url: string,
    source: typeof POLICY_SOURCES[0]
  ): Promise<PolicyDetailData | null> {
    const html = await this.fetch(url);
    
    // 提取标题
    const titleMatch = html.match(source.titleSelector);
    const title = titleMatch ? this.cleanTitle(titleMatch[1]) : '';
    
    // 提取日期
    const dateMatch = html.match(source.dateSelector);
    const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
    
    if (!title || title.length < 10) {
      return null;
    }

    return {
      id: `policy-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      source: source.name,
      date,
      url,
      region: source.region,
      level: source.level,
    };
  }

  /**
   * 判断是否为碳相关政策
   */
  private isCarbonRelated(title: string): boolean {
    const keywords = ['碳', '排放', 'CCER', '碳普惠', '碳市场', '碳交易', '低碳', '减排', '温室气体'];
    return keywords.some(k => title.includes(k));
  }

  /**
   * 清理标题
   */
  private cleanTitle(title: string): string {
    return title
      .replace(/\s+/g, ' ')
      .replace(/&nbsp;/g, '')
      .replace(/-[^-]*生态环境部[^-]*$/, '') // 移除后缀
      .replace(/-[^-]*北京市[^-]*$/, '')
      .replace(/-[^-]*上海市[^-]*$/, '')
      .trim();
  }

  /**
   * 按URL去重
   */
  private deduplicateByUrl(policies: PolicyDetailData[]): PolicyDetailData[] {
    const seen = new Set<string>();
    return policies.filter(p => {
      if (seen.has(p.url)) return false;
      seen.add(p.url);
      return true;
    });
  }
}

// 导出便捷函数
export async function fetchPolicyDetails(): Promise<PolicyDetailData[]> {
  const crawler = new PolicyDetailCrawler();
  return crawler.crawl();
}

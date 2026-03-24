/**
 * 政策数据爬虫
 * 目标：生态环境部、各地生态环境局官网
 * 获取真实的碳普惠相关政策
 */

import { BaseCrawler } from './baseCrawler';

export interface PolicyData {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url: string;
  summary?: string;
  category: 'policy' | 'methodology';
}

// 真实政策数据源
const POLICY_SOURCES = [
  {
    name: '生态环境部',
    baseUrl: 'https://www.mee.gov.cn',
    listUrl: 'https://www.mee.gov.cn/zwgk/zcwj/zcjd/',
    type: 'national' as const,
  },
  {
    name: '北京市生态环境局',
    baseUrl: 'https://sthjj.beijing.gov.cn',
    listUrl: 'https://sthjj.beijing.gov.cn/zwgk/zcwj/zcjd/',
    type: 'local' as const,
  },
  {
    name: '上海市生态环境局',
    baseUrl: 'https://sthj.sh.gov.cn',
    listUrl: 'https://sthj.sh.gov.cn/zwgk/zcwj/zcjd/',
    type: 'local' as const,
  },
  {
    name: '广东省生态环境厅',
    baseUrl: 'https://gdee.gd.gov.cn',
    listUrl: 'https://gdee.gd.gov.cn/zwgk/zcwj/zcjd/',
    type: 'local' as const,
  },
];

export class PolicyCrawler extends BaseCrawler<PolicyData[]> {
  constructor() {
    super({
      name: 'Policy',
      baseUrl: '',
      rateLimitMs: 3000,
      timeout: 15000,
      retries: 2,
    });
  }

  async crawl(): Promise<PolicyData[]> {
    const allPolicies: PolicyData[] = [];
    
    for (const source of POLICY_SOURCES) {
      try {
        this.log(`正在爬取 ${source.name}...`);
        const html = await this.fetch(source.listUrl);
        const policies = this.parsePolicyList(html, source);
        allPolicies.push(...policies);
        this.log(`✅ 从 ${source.name} 获取 ${policies.length} 条政策`);
      } catch (error) {
        this.log(`❌ ${source.name} 爬取失败: ${error}`);
      }
    }
    
    // 按日期排序，取最新的
    return this.sortByDate(allPolicies).slice(0, 10);
  }

  /**
   * 解析政策列表
   */
  private parsePolicyList(html: string, source: typeof POLICY_SOURCES[0]): PolicyData[] {
    const policies: PolicyData[] = [];
    
    // 政府网站常见列表模式
    const patterns = [
      // 模式1: 标准列表项
      /<li[^>]*>.*?<a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>.*?<span[^>]*>(\d{4}[\-\/]\d{2}[\-\/]\d{2})<\/span>.*?<\/li>/gis,
      // 模式2: 表格行
      /<tr[^>]*>.*?<td[^>]*>.*?<a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>.*?<\/td>.*?<td[^>]*>(\d{4}[\-\/]\d{2}[\-\/]\d{2})<\/td>.*?<\/tr>/gis,
      // 模式3: 通用链接+日期
      /<a[^>]*href=["']([^"']+)["'][^>]*>([^<]{10,100})<\/a>[^<]*?(\d{4}[\-\/]\d{2}[\-\/]\d{2})/gi,
    ];
    
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        const url = match[1];
        const title = match[2].trim();
        const dateStr = match[3];
        
        if (this.isValidPolicy(title)) {
          policies.push({
            id: `policy-${Date.now()}-${policies.length}`,
            title: this.cleanTitle(title),
            issuer: source.name,
            date: this.normalizeDate(dateStr),
            url: this.resolveUrl(url, source.baseUrl),
            category: this.detectCategory(title),
          });
        }
      }
    }
    
    return policies;
  }

  /**
   * 验证是否为有效政策
   */
  private isValidPolicy(title: string): boolean {
    const keywords = ['碳', '减排', '环保', '绿色', '低碳', '气候', '能源', 'CCER', '碳普惠', '碳交易', '碳市场'];
    const hasKeyword = keywords.some((k) => title.includes(k));
    const isValidLength = title.length >= 15 && title.length <= 100;
    const notNoise = !title.includes('登录') && !title.includes('注册') && !title.includes('首页') && !title.includes('返回');
    
    return hasKeyword && isValidLength && notNoise;
  }

  /**
   * 清理标题
   */
  private cleanTitle(title: string): string {
    return title
      .replace(/\s+/g, ' ')
      .replace(/&nbsp;/g, '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .trim();
  }

  /**
   * 标准化日期格式
   */
  private normalizeDate(dateStr: string): string {
    const match = dateStr.match(/(\d{4})[\-\/](\d{2})[\-\/](\d{2})/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return new Date().toISOString().split('T')[0];
  }

  /**
   * 解析完整URL
   */
  private resolveUrl(url: string, baseUrl: string): string {
    if (url.startsWith('http')) return url;
    if (url.startsWith('//')) return `https:${url}`;
    if (url.startsWith('/')) return `${baseUrl}${url}`;
    return `${baseUrl}/${url}`;
  }

  /**
   * 检测政策类型
   */
  private detectCategory(title: string): 'policy' | 'methodology' {
    const methodKeywords = ['方法学', '技术规范', '核算', '计算', '指南'];
    return methodKeywords.some((k) => title.includes(k)) ? 'methodology' : 'policy';
  }

  /**
   * 按日期排序
   */
  private sortByDate(policies: PolicyData[]): PolicyData[] {
    return policies.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}

// 导出便捷函数
export async function fetchPolicies(): Promise<PolicyData[]> {
  const crawler = new PolicyCrawler();
  return crawler.crawl();
}

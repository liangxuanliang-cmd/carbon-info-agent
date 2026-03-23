/**
 * 政策数据爬虫
 * 目标：生态环境部、各地生态环境局官网
 */

import { BaseCrawler } from './baseCrawler';

export interface PolicyData {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url: string;
  summary?: string;
}

export class PolicyCrawler extends BaseCrawler<PolicyData[]> {
  private sources: Array<{ name: string; url: string; type: 'national' | 'local' }>;

  constructor() {
    super({
      name: 'Policy',
      baseUrl: '',
      rateLimitMs: 5000, // 政府网站访问频率限制更严格
      timeout: 20000,
      retries: 2,
    });

    this.sources = [
      { name: '生态环境部', url: 'https://www.mee.gov.cn/zwgk/zcwj/zcjd/', type: 'national' },
      { name: '北京市生态环境局', url: 'https://sthjj.beijing.gov.cn/zwgk/zcwj/', type: 'local' },
      { name: '上海市生态环境局', url: 'https://sthj.sh.gov.cn/zwgk/zcwj/', type: 'local' },
    ];
  }

  async crawl(): Promise<PolicyData[]> {
    const policies: PolicyData[] = [];
    
    for (const source of this.sources) {
      try {
        this.log(`正在获取 ${source.name} 的政策...`);
        const html = await this.fetch(source.url);
        const sourcePolicies = this.parsePolicies(html, source.name);
        policies.push(...sourcePolicies);
        this.log(`从 ${source.name} 获取到 ${sourcePolicies.length} 条政策`);
      } catch (error) {
        this.log(`获取 ${source.name} 失败: ${error}`);
        // 继续获取其他来源
      }
    }
    
    // 去重并排序
    const uniquePolicies = this.deduplicate(policies);
    return uniquePolicies.slice(0, 5); // 只返回最新的5条
  }

  /**
   * 解析政策列表
   */
  private parsePolicies(html: string, issuer: string): PolicyData[] {
    const policies: PolicyData[] = [];
    
    // 匹配政策链接和标题的多种模式
    const patterns = [
      // 常见政府网站列表模式
      /<a[^>]*href=["']([^"']+)["'][^>]*>([^<]*(?:碳|减排|环保|绿色)[^<]*)<\/a>/gi,
      // 带日期的模式
      /<a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>\s*<[^>]*>(\d{4}-\d{2}-\d{2})/gi,
    ];
    
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        const url = match[1];
        const title = match[2].trim();
        const date = match[3] || this.extractDate(html, match.index) || new Date().toISOString().split('T')[0];
        
        // 过滤无关内容
        if (this.isValidPolicy(title)) {
          policies.push({
            id: `policy-${Date.now()}-${policies.length}`,
            title,
            issuer,
            date,
            url: this.normalizeUrl(url),
          });
        }
      }
    }
    
    return policies;
  }

  /**
   * 验证是否为有效政策标题
   */
  private isValidPolicy(title: string): boolean {
    const keywords = ['碳', '减排', '环保', '绿色', '低碳', '气候', '能源'];
    const hasKeyword = keywords.some((k) => title.includes(k));
    const isValidLength = title.length > 10 && title.length < 100;
    const notNoise = !title.includes('登录') && !title.includes('注册') && !title.includes('首页');
    
    return hasKeyword && isValidLength && notNoise;
  }

  /**
   * 从附近文本提取日期
   */
  private extractDate(html: string, position: number): string | null {
    const context = html.substring(Math.max(0, position - 200), position);
    const dateMatch = context.match(/(\d{4}-\d{2}-\d{2})/);
    return dateMatch ? dateMatch[1] : null;
  }

  /**
   * 规范化URL
   */
  private normalizeUrl(url: string): string {
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return `${this.baseUrl}${url}`;
    return `${this.baseUrl}/${url}`;
  }

  /**
   * 去重
   */
  private deduplicate(policies: PolicyData[]): PolicyData[] {
    const seen = new Set<string>();
    return policies.filter((p) => {
      const key = `${p.title}-${p.issuer}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}

// 导出便捷函数
export async function fetchPolicies(): Promise<PolicyData[]> {
  const crawler = new PolicyCrawler();
  return crawler.crawl();
}

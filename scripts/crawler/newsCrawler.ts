/**
 * 资讯数据爬虫
 * 目标：碳市场新闻网站
 */

import { BaseCrawler } from './baseCrawler';

export interface NewsData {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  summary?: string;
}

export class NewsCrawler extends BaseCrawler<NewsData[]> {
  private sources: Array<{ name: string; url: string }>;

  constructor() {
    super({
      name: 'News',
      baseUrl: '',
      rateLimitMs: 3000,
      timeout: 15000,
      retries: 2,
    });

    this.sources = [
      { name: '中国碳交易网', url: 'https://www.tanjiaoyi.com/news/' },
      { name: '碳道', url: 'https://www.tanpaifang.com/news/' },
    ];
  }

  async crawl(): Promise<NewsData[]> {
    const news: NewsData[] = [];
    
    for (const source of this.sources) {
      try {
        this.log(`正在获取 ${source.name} 的资讯...`);
        const html = await this.fetch(source.url);
        const sourceNews = this.parseNews(html, source.name);
        news.push(...sourceNews);
        this.log(`从 ${source.name} 获取到 ${sourceNews.length} 条资讯`);
      } catch (error) {
        this.log(`获取 ${source.name} 失败: ${error}`);
      }
    }
    
    // 去重并排序
    const uniqueNews = this.deduplicate(news);
    return uniqueNews.slice(0, 5); // 只返回最新的5条
  }

  /**
   * 解析资讯列表
   */
  private parseNews(html: string, source: string): NewsData[] {
    const news: NewsData[] = [];
    
    // 匹配资讯链接和标题的多种模式
    const patterns = [
      // 标准列表模式
      /<a[^>]*href=["']([^"']+)["'][^>]*>([^<]*(?:碳|CEA|CCER|碳市场|碳普惠)[^<]*)<\/a>/gi,
      // 带日期的模式
      /<a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>.*?<[^>]*>(\d{4}[/-]\d{2}[/-]\d{2})/gi,
    ];
    
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        const url = match[1];
        const title = match[2].trim();
        const date = this.parseDate(match[3]) || new Date().toISOString().split('T')[0];
        
        if (this.isValidNews(title)) {
          news.push({
            id: `news-${Date.now()}-${news.length}`,
            title,
            source,
            date,
            url: this.normalizeUrl(url),
          });
        }
      }
    }
    
    return news;
  }

  /**
   * 验证是否为有效资讯标题
   */
  private isValidNews(title: string): boolean {
    const keywords = ['碳', 'CEA', 'CCER', '碳市场', '碳普惠', '碳交易', '减排', '低碳'];
    const hasKeyword = keywords.some((k) => title.includes(k));
    const isValidLength = title.length > 15 && title.length < 100;
    const notNoise = !title.includes('登录') && !title.includes('注册') && !title.includes('广告');
    
    return hasKeyword && isValidLength && notNoise;
  }

  /**
   * 解析日期格式
   */
  private parseDate(dateStr: string): string | null {
    if (!dateStr) return null;
    
    // 统一转换为 YYYY-MM-DD
    const match = dateStr.match(/(\d{4})[\/-](\d{2})[\/-](\d{2})/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return null;
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
  private deduplicate(news: NewsData[]): NewsData[] {
    const seen = new Set<string>();
    return news.filter((n) => {
      const key = `${n.title}-${n.source}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}

// 导出便捷函数
export async function fetchNews(): Promise<NewsData[]> {
  const crawler = new NewsCrawler();
  return crawler.crawl();
}

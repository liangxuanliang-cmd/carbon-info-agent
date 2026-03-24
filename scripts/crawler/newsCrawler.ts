/**
 * 资讯数据爬虫
 * 目标：碳市场新闻网站
 * 获取真实的碳市场新闻资讯
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

// 真实资讯数据源
const NEWS_SOURCES = [
  {
    name: '中国碳交易网',
    baseUrl: 'https://www.tanjiaoyi.com',
    listUrl: 'https://www.tanjiaoyi.com/news/',
  },
  {
    name: '碳道',
    baseUrl: 'https://www.tanpaifang.com',
    listUrl: 'https://www.tanpaifang.com/news/',
  },
  {
    name: '上海环境能源交易所',
    baseUrl: 'https://www.cneeex.com',
    listUrl: 'https://www.cneeex.com/news/',
  },
  {
    name: '北京绿色交易所',
    baseUrl: 'https://www.bjet.com.cn',
    listUrl: 'https://www.bjet.com.cn/news/',
  },
];

export class NewsCrawler extends BaseCrawler<NewsData[]> {
  constructor() {
    super({
      name: 'News',
      baseUrl: '',
      rateLimitMs: 2000,
      timeout: 15000,
      retries: 2,
    });
  }

  async crawl(): Promise<NewsData[]> {
    const allNews: NewsData[] = [];
    
    for (const source of NEWS_SOURCES) {
      try {
        this.log(`正在爬取 ${source.name}...`);
        const html = await this.fetch(source.listUrl);
        const news = this.parseNewsList(html, source);
        allNews.push(...news);
        this.log(`✅ 从 ${source.name} 获取 ${news.length} 条资讯`);
      } catch (error) {
        this.log(`❌ ${source.name} 爬取失败: ${error}`);
      }
    }
    
    // 按日期排序，取最新的
    return this.sortByDate(allNews).slice(0, 10);
  }

  /**
   * 解析资讯列表
   */
  private parseNewsList(html: string, source: typeof NEWS_SOURCES[0]): NewsData[] {
    const news: NewsData[] = [];
    
    // 常见新闻列表模式
    const patterns = [
      // 模式1: 标准列表项
      /<li[^>]*>.*?<a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>.*?<span[^>]*>(\d{4}[\-\/]\d{2}[\-\/]\d{2})<\/span>.*?<\/li>/gis,
      // 模式2: 文章卡片
      /<div[^>]*class=["'][^"']*(?:news|article|item)[^"']*["'][^>]*>.*?<a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>.*?<span[^>]*>(\d{4}[\-\/]\d{2}[\-\/]\d{2})<\/span>.*?<\/div>/gis,
      // 模式3: 通用链接+日期
      /<a[^>]*href=["']([^"']+)["'][^>]*>([^<]{15,100})<\/a>[^<]*?(\d{4}[\-\/]\d{2}[\-\/]\d{2})/gi,
    ];
    
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        const url = match[1];
        const title = match[2].trim();
        const dateStr = match[3];
        
        if (this.isValidNews(title)) {
          news.push({
            id: `news-${Date.now()}-${news.length}`,
            title: this.cleanTitle(title),
            source: source.name,
            date: this.normalizeDate(dateStr),
            url: this.resolveUrl(url, source.baseUrl),
          });
        }
      }
    }
    
    return news;
  }

  /**
   * 验证是否为有效资讯
   */
  private isValidNews(title: string): boolean {
    const keywords = ['碳', 'CEA', 'CCER', '碳市场', '碳普惠', '碳交易', '减排', '低碳', '碳价', '碳排放'];
    const hasKeyword = keywords.some((k) => title.includes(k));
    const isValidLength = title.length >= 15 && title.length <= 120;
    const notNoise = !title.includes('登录') && !title.includes('注册') && !title.includes('广告') && !title.includes('返回首页');
    
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
   * 按日期排序
   */
  private sortByDate(news: NewsData[]): NewsData[] {
    return news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}

// 导出便捷函数
export async function fetchNews(): Promise<NewsData[]> {
  const crawler = new NewsCrawler();
  return crawler.crawl();
}

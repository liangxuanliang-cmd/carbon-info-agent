/**
 * 资讯详情页爬虫
 * 从碳市场新闻网站抓取真实的文章详情页URL
 */

import { BaseCrawler } from './baseCrawler';

export interface NewsDetailData {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  summary?: string;
}

// 资讯数据源配置
const NEWS_SOURCES = [
  {
    name: '中国碳交易网',
    baseUrl: 'https://www.tanjiaoyi.com',
    listUrl: 'https://www.tanjiaoyi.com/news/',
    // 匹配文章链接: /news/20240315/xxx.html
    articlePattern: /\/news\/\d{8}\/[a-z0-9_-]+\.html/g,
  },
  {
    name: '碳道',
    baseUrl: 'https://www.tanpaifang.com',
    listUrl: 'https://www.tanpaifang.com/news/',
    articlePattern: /\/news\/\d{8}\/[a-z0-9_-]+\.html/g,
  },
  {
    name: '上海环境能源交易所',
    baseUrl: 'https://www.cneeex.com',
    listUrl: 'https://www.cneeex.com/news/',
    articlePattern: /\/news\/\d{8}\/[a-z0-9_-]+\.html/g,
  },
  {
    name: '北京绿色交易所',
    baseUrl: 'https://www.bjet.com.cn',
    listUrl: 'https://www.bjet.com.cn/news/',
    articlePattern: /\/news\/\d{8}\/[a-z0-9_-]+\.html/g,
  },
];

export class NewsDetailCrawler extends BaseCrawler<NewsDetailData[]> {
  constructor() {
    super({
      name: 'NewsDetail',
      baseUrl: '',
      rateLimitMs: 3000,
      timeout: 15000,
      retries: 2,
    });
  }

  async crawl(): Promise<NewsDetailData[]> {
    const allNews: NewsDetailData[] = [];

    for (const source of NEWS_SOURCES) {
      try {
        this.log(`正在爬取 ${source.name}...`);
        
        // 1. 获取列表页
        const listHtml = await this.fetch(source.listUrl);
        
        // 2. 提取文章URL
        const articleUrls = this.extractArticleUrls(listHtml, source);
        this.log(`发现 ${articleUrls.length} 篇文章`);
        
        // 3. 解析每篇文章
        for (const url of articleUrls.slice(0, 3)) { // 每个来源取前3篇
          try {
            const news = await this.parseArticleDetail(url, source);
            if (news && this.isCarbonRelated(news.title)) {
              allNews.push(news);
              this.log(`✅ 获取资讯: ${news.title.substring(0, 40)}...`);
            }
          } catch (error) {
            this.log(`❌ 解析文章失败: ${url}`);
          }
        }
      } catch (error) {
        this.log(`❌ ${source.name} 爬取失败: ${error}`);
      }
    }

    return this.sortByDate(allNews).slice(0, 10);
  }

  /**
   * 提取文章URL
   */
  private extractArticleUrls(
    html: string,
    source: typeof NEWS_SOURCES[0]
  ): string[] {
    const urls: string[] = [];
    let match;

    // 使用正则匹配文章链接
    while ((match = source.articlePattern.exec(html)) !== null) {
      const fullUrl = match[0].startsWith('http') 
        ? match[0] 
        : `${source.baseUrl}${match[0]}`;
      urls.push(fullUrl);
    }

    return [...new Set(urls)];
  }

  /**
   * 解析文章详情
   */
  private async parseArticleDetail(
    url: string,
    source: typeof NEWS_SOURCES[0]
  ): Promise<NewsDetailData | null> {
    const html = await this.fetch(url);

    // 提取标题
    const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i) || 
                       html.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? this.cleanText(titleMatch[1]) : '';

    // 提取日期
    const dateMatch = html.match(/(\d{4}-\d{2}-\d{2})/) ||
                      html.match(/(\d{4}年\d{2}月\d{2}日)/);
    const date = dateMatch ? this.normalizeDate(dateMatch[1]) : new Date().toISOString().split('T')[0];

    // 提取摘要（从正文前200字）
    const contentMatch = html.match(/<div[^>]*class=["']content["'][^>]*>([\s\S]{100,500})<\/div>/i);
    const summary = contentMatch 
      ? this.cleanText(contentMatch[1]).substring(0, 200) + '...'
      : title;

    if (!title || title.length < 10) {
      return null;
    }

    return {
      id: `news-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      source: source.name,
      date,
      url,
      summary,
    };
  }

  /**
   * 判断是否为碳相关资讯
   */
  private isCarbonRelated(title: string): boolean {
    const keywords = ['碳', 'CEA', 'CCER', '碳市场', '碳普惠', '碳交易', '碳价', '碳排放', '低碳'];
    return keywords.some(k => title.includes(k));
  }

  /**
   * 清理文本
   */
  private cleanText(text: string): string {
    return text
      .replace(/<[^>]+>/g, '') // 移除HTML标签
      .replace(/\s+/g, ' ')
      .replace(/&nbsp;/g, '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .trim();
  }

  /**
   * 标准化日期
   */
  private normalizeDate(dateStr: string): string {
    const match = dateStr.match(/(\d{4})[年\-/](\d{2})[月\-/](\d{2})/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return new Date().toISOString().split('T')[0];
  }

  /**
   * 按日期排序
   */
  private sortByDate(news: NewsDetailData[]): NewsDetailData[] {
    return news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}

// 导出便捷函数
export async function fetchNewsDetails(): Promise<NewsDetailData[]> {
  const crawler = new NewsDetailCrawler();
  return crawler.crawl();
}

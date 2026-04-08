/**
 * 资讯爬虫 - 基于搜狗新闻搜索
 * 搜狗新闻返回服务端渲染 HTML，无需执行 JavaScript 即可解析
 */

import { BaseCrawler } from './baseCrawler';

export interface NewsDetailData {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  summary?: string;
  tags: string[];
}

/**
 * 搜索关键词配置 - 多组关键词覆盖碳市场各领域
 */
const NEWS_SEARCH_QUERIES = [
  { query: '碳市场 碳交易', tags: ['碳市场', '碳交易'] },
  { query: '碳普惠 方法学', tags: ['碳普惠'] },
  { query: 'CCER 自愿减排', tags: ['CCER'] },
  { query: '全国碳排放权交易', tags: ['全国碳市场'] },
  { query: '碳价 碳配额 行情', tags: ['碳价行情'] },
  { query: '碳中和 低碳 政策', tags: ['碳中和', '低碳'] },
  { query: '碳普惠 低碳出行', tags: ['碳普惠', '低碳出行'] },
  { query: '碳排放 温室气体 减排', tags: ['碳排放', '减排'] },
];

/**
 * 碳相关关键词 - 用于过滤搜索结果
 */
const CARBON_KEYWORDS = [
  '碳', 'CEA', 'CCER', '碳市场', '碳普惠', '碳交易',
  '碳价', '碳排放', '低碳', '碳中和', '碳配额', '碳汇',
  '减排', '温室气体', '碳达峰',
];

export class NewsDetailCrawler extends BaseCrawler<NewsDetailData[]> {
  constructor() {
    super({
      name: 'SogouNews',
      baseUrl: 'https://news.sogou.com',
      rateLimitMs: 3000,
      timeout: 15000,
      retries: 2,
    });
  }

  async crawl(): Promise<NewsDetailData[]> {
    const allNews: NewsDetailData[] = [];

    for (const item of NEWS_SEARCH_QUERIES) {
      try {
        this.log(`搜索: "${item.query}"`);
        const articles = await this.searchSogouNews(item.query, item.tags);
        this.log(`  获取 ${articles.length} 条结果`);
        allNews.push(...articles);
      } catch (error) {
        this.log(`  搜索失败: ${error instanceof Error ? error.message : error}`);
      }
    }

    // 去重、排序、取前 20 条
    const result = this.deduplicateAndSort(allNews).slice(0, 20);
    this.log(`\n共获取 ${result.length} 条不重复资讯`);
    return result;
  }

  /**
   * 搜狗新闻搜索
   */
  private async searchSogouNews(query: string, tags: string[]): Promise<NewsDetailData[]> {
    const searchUrl = `https://news.sogou.com/news?query=${encodeURIComponent(query)}&sort=1`;
    const html = await this.fetch(searchUrl);
    return this.parseSogouResults(html, tags);
  }

  /**
   * 解析搜狗新闻搜索结果页面
   * 搜狗新闻的 HTML 结构：<h3><a href="URL">TITLE</a></h3>
   * 来源和日期通常在 h3 后面的文本中
   */
  private parseSogouResults(html: string, tags: string[]): NewsDetailData[] {
    const articles: NewsDetailData[] = [];

    // 搜狗新闻搜索结果主要模式：h3 > a 链接
    // 模式1: <h3><a href="URL" ...>TITLE</a></h3>
    const h3Pattern = /<h3[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h3>/gi;
    let match;

    while ((match = h3Pattern.exec(html)) !== null) {
      const rawUrl = match[1];
      const rawTitle = match[2];
      const title = this.cleanText(rawTitle);
      const url = this.resolveUrl(rawUrl);

      if (
        title.length >= 8 &&
        title.length <= 200 &&
        this.isCarbonRelated(title) &&
        this.isValidNewsUrl(url)
      ) {
        // 从 h3 后面的内容中提取来源和日期
        const contextAfterH3 = html.substring(match.index + match[0].length, match.index + match[0].length + 1000);
        const source = this.extractSourceFromContext(contextAfterH3, url);
        const date = this.extractDateFromContext(contextAfterH3);

        articles.push({
          id: `news-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          title,
          source,
          date,
          url,
          tags,
        });
      }
    }

    // 备选模式：更宽泛的 a 标签匹配（如果 h3 模式没找到结果）
    if (articles.length === 0) {
      const linkPattern = /<a[^>]*href="(https?:\/\/[^"]+)"[^>]*title="([^"]{8,200})"[^>]*>/gi;
      while ((match = linkPattern.exec(html)) !== null) {
        const url = match[1];
        const title = this.cleanText(match[2]);
        if (
          this.isCarbonRelated(title) &&
          this.isValidNewsUrl(url)
        ) {
          const contextAfter = html.substring(match.index + match[0].length, match.index + match[0].length + 500);
          articles.push({
            id: `news-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
            title,
            source: this.extractSourceFromContext(contextAfter, url),
            date: this.extractDateFromContext(contextAfter),
            url,
            tags,
          });
        }
      }
    }

    return articles;
  }

  /**
   * 判断是否为碳相关资讯
   */
  private isCarbonRelated(title: string): boolean {
    return CARBON_KEYWORDS.some((k) => title.includes(k));
  }

  /**
   * 从搜索结果上下文中提取来源
   */
  private extractSourceFromContext(context: string, articleUrl: string): string {
    // 搜狗新闻结果中来源通常在特定标签内
    const sourcePatterns = [
      // 模式：<span class="...">来源名</span>
      /<span[^>]*class="[^"]*(?:news-from|author|source)[^"]*"[^>]*>([^<]{2,30})<\/span>/i,
      // 模式：直接文本 "来源：XXX"
      /来源[：:]\s*([^\s<]{2,20})/,
      // 模式：短文本 span
      /<span[^>]*>([^<]{2,15})\s*\d{4}/,
    ];

    for (const pattern of sourcePatterns) {
      const match = context.match(pattern);
      if (match) {
        const source = match[1].trim().replace(/&nbsp;/g, '').replace(/\s+/g, '');
        if (source.length >= 2 && source.length <= 20) {
          return source;
        }
      }
    }

    return this.extractSourceFromUrl(articleUrl);
  }

  /**
   * 从 URL 推断来源
   */
  private extractSourceFromUrl(url: string): string {
    const domainMap: Record<string, string> = {
      'mee.gov.cn': '生态环境部',
      'gov.cn': '政府网站',
      'people.com.cn': '人民网',
      'xinhuanet.com': '新华网',
      'chinanews.com': '中国新闻网',
      'bjnews.com.cn': '新京报',
      'thepaper.cn': '澎湃新闻',
      'caixin.com': '财新网',
      'cnstock.com': '中国证券网',
      'stcn.com': '证券时报',
      'tanjiaoyi.com': '中国碳交易网',
      'tanpaifang.com': '碳道',
      'ccn.ac.cn': '中国碳中和网',
      'cneeex.com': '上海环交所',
      'bjet.com.cn': '北京绿交所',
      'cets.org.cn': '广州碳交所',
      'hbets.cn': '湖北碳交中心',
      'sina.com.cn': '新浪',
      '163.com': '网易',
      'sohu.com': '搜狐',
      'qq.com': '腾讯',
      'ifeng.com': '凤凰网',
    };

    try {
      const hostname = new URL(url).hostname;
      for (const [domain, name] of Object.entries(domainMap)) {
        if (hostname.includes(domain)) return name;
      }
      const parts = hostname.split('.');
      return parts.length >= 2 ? parts.slice(-2).join('.') : hostname;
    } catch {
      return '网络媒体';
    }
  }

  /**
   * 从搜索结果上下文中提取日期
   */
  private extractDateFromContext(context: string): string {
    const today = new Date();

    const datePatterns = [
      // YYYY-MM-DD 或 YYYY/MM/DD
      /(\d{4})[-/](\d{1,2})[-/](\d{1,2})/,
      // YYYY年MM月DD日
      /(\d{4})年(\d{1,2})月(\d{1,2})日/,
      // X分钟前 / X小时前
      /(\d+)\s*分钟前/,
      /(\d+)\s*小时前/,
      // 今天 / 昨天
      /今天/,
      /昨天/,
    ];

    for (const pattern of datePatterns) {
      const match = context.match(pattern);
      if (match) {
        if (match[0].includes('分钟前') || match[0].includes('小时前') || match[0].includes('今天')) {
          return today.toISOString().split('T')[0];
        }
        if (match[0].includes('昨天')) {
          const yesterday = new Date(today.getTime() - 86400000);
          return yesterday.toISOString().split('T')[0];
        }
        if (match[1] && match[2] && match[3]) {
          const year = parseInt(match[1]);
          if (year >= 2020 && year <= 2030) {
            const month = match[2].padStart(2, '0');
            const day = match[3].padStart(2, '0');
            return `${match[1]}-${month}-${day}`;
          }
        }
      }
    }

    return today.toISOString().split('T')[0];
  }

  /**
   * 检查 URL 是否为有效新闻链接
   */
  private isValidNewsUrl(url: string): boolean {
    if (!url || url.length < 10) return false;
    const excludePatterns = [
      'javascript:',
      'sogou.com',
      '#',
      'void(0)',
      'login',
      'register',
      'passport.',
      'account.',
    ];
    return url.startsWith('http') && !excludePatterns.some((p) => url.includes(p));
  }

  /**
   * 解析 URL（处理相对路径和协议相对 URL）
   */
  private resolveUrl(url: string): string {
    if (url.startsWith('http')) return url;
    if (url.startsWith('//')) return `https:${url}`;
    return url;
  }

  /**
   * 清理 HTML 文本
   */
  private cleanText(text: string): string {
    return text
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * 去重并按日期排序
   */
  private deduplicateAndSort(news: NewsDetailData[]): NewsDetailData[] {
    const seen = new Map<string, NewsDetailData>();

    for (const item of news) {
      // 按标题去重（去除空格和标点后比较）
      const key = item.title.replace(/[\s，。、；：""''（）【】！？·…—\-,.\[\]()!?]/g, '');
      if (!seen.has(key)) {
        seen.set(key, item);
      } else {
        // 已存在同标题的，合并 tags
        const existing = seen.get(key)!;
        const mergedTags = [...new Set([...existing.tags, ...item.tags])];
        seen.set(key, { ...existing, tags: mergedTags });
      }
    }

    return [...seen.values()].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }
}

// 导出便捷函数
export async function fetchNewsDetails(): Promise<NewsDetailData[]> {
  const crawler = new NewsDetailCrawler();
  return crawler.crawl();
}

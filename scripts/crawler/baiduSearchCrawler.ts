/**
 * 百度搜索碳价数据爬虫
 * 通过百度搜索获取最新碳价信息
 */

import { BaseCrawler } from './baseCrawler';

export interface CarbonPriceFromSearch {
  productId: string;
  name: string;
  price: number;
  change: number;
  date: string;
  source: string;
}

export class BaiduSearchCrawler extends BaseCrawler<CarbonPriceFromSearch[]> {
  private searchQueries: Array<{ productId: string; name: string; query: string }>;

  constructor() {
    super({
      name: 'BaiduSearch',
      baseUrl: 'https://www.baidu.com',
      rateLimitMs: 2000,
      timeout: 10000,
      retries: 2,
    });

    this.searchQueries = [
      { productId: 'CEA', name: '全国碳市场CEA', query: '全国碳市场CEA价格 今日' },
      { productId: 'CCER', name: 'CCER', query: 'CCER价格 今日 全国温室气体自愿减排' },
      { productId: 'BEA', name: '北京碳配额BEA', query: '北京碳市场BEA价格 今日' },
      { productId: 'SHEA', name: '上海碳配额SHEA', query: '上海碳市场SHEA价格 今日' },
      { productId: 'GDEA', name: '广东碳配额GDEA', query: '广东碳市场GDEA价格 今日' },
      { productId: 'HBEA', name: '湖北碳配额HBEA', query: '湖北碳市场HBEA价格 今日' },
    ];
  }

  async crawl(): Promise<CarbonPriceFromSearch[]> {
    const results: CarbonPriceFromSearch[] = [];
    
    for (const item of this.searchQueries) {
      try {
        this.log(`正在搜索 ${item.name} 价格...`);
        const searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(item.query)}`;
        const html = await this.fetch(searchUrl);
        const priceData = this.parsePriceFromSearch(html, item);
        
        if (priceData) {
          results.push(priceData);
          this.log(`✅ ${item.name}: ${priceData.price}元/吨 (${priceData.change}%)`);
        } else {
          this.log(`⚠️ 未能解析 ${item.name} 价格`);
        }
      } catch (error) {
        this.log(`❌ 搜索 ${item.name} 失败: ${error}`);
      }
    }
    
    return results;
  }

  /**
   * 从搜索结果页面解析价格
   */
  private parsePriceFromSearch(
    html: string,
    item: { productId: string; name: string; query: string }
  ): CarbonPriceFromSearch | null {
    // 尝试多种价格匹配模式
    const pricePatterns = [
      // 模式1: 价格+涨跌幅
      /(\d+\.?\d*)\s*元[\/吨]*.*?([+-]?\d+\.?\d*)%/i,
      // 模式2: 收盘价
      /收盘价[：:]\s*(\d+\.?\d+).*?([+-]?\d+\.?\d*)%/i,
      // 模式3: 最新价
      /最新价[：:]\s*(\d+\.?\d+).*?([+-]?\d+\.?\d*)%/i,
      // 模式4: 数字+元/吨
      /(\d+\.?\d+)\s*元\/吨/i,
    ];

    for (const pattern of pricePatterns) {
      const match = html.match(pattern);
      if (match) {
        const price = parseFloat(match[1]);
        const change = match[2] ? parseFloat(match[2]) : 0;
        
        if (price > 10 && price < 200) { // 合理价格范围
          return {
            productId: item.productId,
            name: item.name,
            price,
            change,
            date: new Date().toISOString().split('T')[0],
            source: '百度搜索',
          };
        }
      }
    }

    return null;
  }
}

// 导出便捷函数
export async function fetchCarbonPriceFromBaidu(): Promise<CarbonPriceFromSearch[]> {
  const crawler = new BaiduSearchCrawler();
  return crawler.crawl();
}

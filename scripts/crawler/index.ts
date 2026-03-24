/**
 * 爬虫模块入口
 * 统一导出所有爬虫功能
 */

export { BaseCrawler, type CrawlerOptions } from './baseCrawler';
export { CarbonPriceCrawler, fetchCarbonPrice, type CarbonPriceData } from './carbonPriceCrawler';
export { PolicyCrawler, fetchPolicies, type PolicyData } from './policyCrawler';
export { NewsCrawler, fetchNews, type NewsData } from './newsCrawler';
export { BaiduSearchCrawler, fetchCarbonPriceFromBaidu, type CarbonPriceFromSearch } from './baiduSearchCrawler';

import { fetchCarbonPriceFromBaidu } from './baiduSearchCrawler';
import { fetchPolicies } from './policyCrawler';
import { fetchNews } from './newsCrawler';

export interface CrawlResult {
  carbonPrices: Awaited<ReturnType<typeof fetchCarbonPriceFromBaidu>>;
  policies: Awaited<ReturnType<typeof fetchPolicies>>;
  news: Awaited<ReturnType<typeof fetchNews>>;
  timestamp: string;
}

/**
 * 执行所有爬虫任务
 */
export async function crawlAll(): Promise<CrawlResult> {
  console.log('🕷️ 启动爬虫数据采集...\n');
  
  const startTime = Date.now();
  
  // 并行执行所有爬虫任务
  const [carbonPrices, policies, news] = await Promise.allSettled([
    fetchCarbonPriceFromBaidu().catch((e) => {
      console.error('碳价搜索失败:', e.message);
      return [];
    }),
    fetchPolicies().catch((e) => {
      console.error('政策爬虫失败:', e.message);
      return [];
    }),
    fetchNews().catch((e) => {
      console.error('资讯爬虫失败:', e.message);
      return [];
    }),
  ]);
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log(`\n✅ 爬虫任务完成，耗时 ${duration}秒\n`);
  
  return {
    carbonPrices: carbonPrices.status === 'fulfilled' ? carbonPrices.value : [],
    policies: policies.status === 'fulfilled' ? policies.value : [],
    news: news.status === 'fulfilled' ? news.value : [],
    timestamp: new Date().toISOString(),
  };
}

/**
 * 爬虫模块入口
 * 统一导出所有爬虫功能
 */

export { BaseCrawler, type CrawlerOptions } from './baseCrawler';
export { CarbonPriceCrawler, fetchCarbonPrice, type CarbonPriceData } from './carbonPriceCrawler';
export { PolicyCrawler, fetchPolicies, type PolicyData } from './policyCrawler';
export { NewsCrawler, fetchNews, type NewsData } from './newsCrawler';
export { BaiduSearchCrawler, fetchCarbonPriceFromBaidu, type CarbonPriceFromSearch } from './baiduSearchCrawler';
export { PolicyDetailCrawler, fetchPolicyDetails, type PolicyDetailData } from './policyDetailCrawler';
export { NewsDetailCrawler, fetchNewsDetails, type NewsDetailData } from './newsDetailCrawler';

import { fetchCarbonPriceFromBaidu } from './baiduSearchCrawler';
import { fetchPolicyDetails } from './policyDetailCrawler';
import { fetchNewsDetails } from './newsDetailCrawler';

export interface CrawlResult {
  carbonPrices: Awaited<ReturnType<typeof fetchCarbonPriceFromBaidu>>;
  policies: Awaited<ReturnType<typeof fetchPolicyDetails>>;
  news: Awaited<ReturnType<typeof fetchNewsDetails>>;
  timestamp: string;
}

/**
 * 执行所有爬虫任务 - 使用详情页爬虫获取真实URL
 */
export async function crawlAll(): Promise<CrawlResult> {
  console.log('🕷️ 启动详情页爬虫数据采集...\n');
  
  const startTime = Date.now();
  
  // 并行执行所有爬虫任务
  const [carbonPrices, policies, news] = await Promise.allSettled([
    fetchCarbonPriceFromBaidu().catch((e) => {
      console.error('碳价搜索失败:', e.message);
      return [];
    }),
    fetchPolicyDetails().catch((e) => {
      console.error('政策详情页爬虫失败:', e.message);
      return [];
    }),
    fetchNewsDetails().catch((e) => {
      console.error('资讯详情页爬虫失败:', e.message);
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

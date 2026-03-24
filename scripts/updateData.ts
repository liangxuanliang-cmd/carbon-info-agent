/**
 * 数据更新脚本
 * 1. 通过爬虫获取最新政策和资讯
 * 2. 更新项目数据文件（包含真实URL）
 * 3. 提交Git更新
 */

import { writeFileSync } from 'fs';
import { resolve } from 'path';
import dayjs from 'dayjs';
import { fetchPolicies, type PolicyData } from './crawler/policyCrawler';
import { fetchNews, type NewsData } from './crawler/newsCrawler';
import { fetchCarbonPriceFromBaidu, type CarbonPriceFromSearch } from './crawler/baiduSearchCrawler';

// 项目根目录
const PROJECT_ROOT = resolve(import.meta.dirname, '..');

/**
 * 更新政策数据文件 - 使用真实爬虫数据
 */
async function updatePoliciesFile() {
  console.log('📋 正在更新政策数据...');
  
  try {
    const policies = await fetchPolicies();
    
    if (policies.length === 0) {
      console.log('⚠️ 未获取到政策数据，保持原文件');
      return;
    }
    
    // 生成 TypeScript 文件内容
    const fileContent = `import type { Policy } from '../types';

// 自动生成的政策数据 - 更新时间: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}
export const policies: Policy[] = [
${policies.map((p, i) => `  {
    id: 'policy-${Date.now()}-${i}',
    title: '${p.title.replace(/'/g, "\\'")}',
    regionType: '${p.issuer.includes('生态环境部') ? 'national' : 'province'}',
    province: '${p.issuer.replace(/生态环境[厅局]|省|市/g, '').trim()}',
    category: '${p.category}',
    status: 'active',
    publishDate: '${p.date}',
    issuingAuthority: '${p.issuer}',
    summary: '${p.title.replace(/'/g, "\\'")}',
    sourceUrl: '${p.url}',
  },`).join('\n')}
];
`;

    const filePath = resolve(PROJECT_ROOT, 'src/data/policies.ts');
    writeFileSync(filePath, fileContent, 'utf-8');
    
    console.log(`✅ 政策数据已更新: ${policies.length} 条`);
    policies.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.title} (${p.issuer})`);
      console.log(`      链接: ${p.url}`);
    });
  } catch (error) {
    console.error('❌ 政策数据更新失败:', error);
  }
}

/**
 * 更新资讯数据文件 - 使用真实爬虫数据
 */
async function updateNewsFile() {
  console.log('\n📰 正在更新资讯数据...');
  
  try {
    const news = await fetchNews();
    
    if (news.length === 0) {
      console.log('⚠️ 未获取到资讯数据，保持原文件');
      return;
    }
    
    // 生成 TypeScript 文件内容
    const fileContent = `import type { NewsItem } from '../types';
import dayjs from 'dayjs';

// 自动生成的资讯数据 - 更新时间: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}
export const news: NewsItem[] = [
${news.map((n, i) => `  {
    id: 'news-${Date.now()}-${i}',
    title: '${n.title.replace(/'/g, "\\'")}',
    summary: '${n.title.replace(/'/g, "\\'")}',
    source: '${n.source}',
    publishDate: '${n.date}',
    url: '${n.url}',
    tags: ['碳市场'],
  },`).join('\n')}
];

// 获取最近的新闻
export const getLatestNews = (count: number = 5) => {
  return news.slice(0, count);
};
`;

    const filePath = resolve(PROJECT_ROOT, 'src/data/news.ts');
    writeFileSync(filePath, fileContent, 'utf-8');
    
    console.log(`✅ 资讯数据已更新: ${news.length} 条`);
    news.forEach((n, i) => {
      console.log(`   ${i + 1}. ${n.title}`);
      console.log(`      来源: ${n.source} | 链接: ${n.url}`);
    });
  } catch (error) {
    console.error('❌ 资讯数据更新失败:', error);
  }
}

/**
 * 更新碳价数据文件 - 使用百度搜索
 */
async function updateCarbonPricesFile() {
  console.log('💹 正在搜索碳价数据...');
  
  try {
    const prices = await fetchCarbonPriceFromBaidu();
    
    if (prices.length === 0) {
      console.log('⚠️ 未获取到碳价数据，保持原文件');
      return;
    }
    
    // 生成 TypeScript 文件内容
    const fileContent = `import type { PriceRecord } from '../types';
import { CARBON_PRODUCTS_META } from '../utils/constants';
import dayjs from 'dayjs';

// 自动生成的碳价数据 - 更新时间: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}
// 数据来源: 百度搜索

// 最新碳价数据
export const latestPrices = [
${prices.map((p) => `  {
    productId: '${p.productId}',
    name: '${p.name}',
    price: ${p.price},
    change: ${p.change},
    date: '${p.date}',
    source: '${p.source}',
  },`).join('\n')}
];

// 获取指定产品的最新价格
export const getPriceByProductId = (productId: string) => {
  return latestPrices.find((p) => p.productId === productId);
};

// 获取所有最新价格
export const getAllLatestPrices = () => latestPrices;
`;

    const filePath = resolve(PROJECT_ROOT, 'src/data/carbonPricesLatest.ts');
    writeFileSync(filePath, fileContent, 'utf-8');
    
    console.log(`✅ 碳价数据已更新: ${prices.length} 条`);
    prices.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.name}: ${p.price}元/吨 (${p.change}%)`);
    });
  } catch (error) {
    console.error('❌ 碳价数据更新失败:', error);
  }
}

/**
 * 主更新函数
 */
export async function updateProjectData() {
  console.log('🚀 开始更新项目数据...\n');
  console.log(`⏰ 执行时间: ${new Date().toLocaleString('zh-CN')}\n`);
  
  // 并行更新所有数据
  await Promise.all([
    updateCarbonPricesFile(),
    updatePoliciesFile(),
    updateNewsFile(),
  ]);
  
  console.log('\n✅ 数据更新流程完成');
}

// 如果直接运行
if (import.meta.main) {
  updateProjectData().catch((error) => {
    console.error('❌ 数据更新失败:', error);
    process.exit(1);
  });
}

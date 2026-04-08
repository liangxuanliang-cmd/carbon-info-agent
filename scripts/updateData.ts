/**
 * 数据更新脚本
 * 1. 通过爬虫获取最新政策和资讯
 * 2. 更新项目数据文件（包含真实URL）
 * 3. 提交Git更新
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import dayjs from 'dayjs';
import { fetchPolicyDetails, type PolicyDetailData } from './crawler/policyDetailCrawler';
import { fetchNewsDetails, type NewsDetailData } from './crawler/newsDetailCrawler';
import { fetchCarbonPriceFromBaidu, type CarbonPriceFromSearch } from './crawler/baiduSearchCrawler';

// 项目根目录
const PROJECT_ROOT = resolve(import.meta.dirname, '..');

/**
 * 转义字符串中的特殊字符，用于生成 TypeScript 字符串字面量
 */
function escapeForTS(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ');
}

/**
 * 将爬虫的 level 字段映射为 Policy 类型的 regionType
 */
function mapRegionType(level: string): string {
  const map: Record<string, string> = {
    national: 'national',
    provincial: 'province',
    city: 'city',
  };
  return map[level] || 'national';
}

/**
 * 更新政策数据文件 - 增量合并模式
 * 保留现有手工维护的政策和方法学数据，仅追加爬虫发现的新政策
 */
async function updatePoliciesFile() {
  console.log('📋 正在更新政策数据（增量模式）...');

  const filePath = resolve(PROJECT_ROOT, 'src/data/policies.ts');

  try {
    // 1. 读取现有文件，提取已有 URL 和标题用于去重
    if (!existsSync(filePath)) {
      console.log('⚠️ policies.ts 不存在，跳过政策更新');
      return;
    }

    const existingContent = readFileSync(filePath, 'utf-8');

    const existingUrls = new Set<string>();
    const urlRegex = /sourceUrl:\s*'([^']+)'/g;
    let urlMatch;
    while ((urlMatch = urlRegex.exec(existingContent)) !== null) {
      existingUrls.add(urlMatch[1]);
    }

    const existingTitles = new Set<string>();
    const titleRegex = /title:\s*'([^']+)'/g;
    let titleMatch;
    while ((titleMatch = titleRegex.exec(existingContent)) !== null) {
      existingTitles.add(titleMatch[1]);
    }

    console.log(`   现有政策/方法学: ${existingUrls.size} 条`);

    // 2. 爬取新政策
    const crawled: PolicyDetailData[] = await fetchPolicyDetails();

    if (crawled.length === 0) {
      console.log('⚠️ 爬虫未返回数据，保持原文件不变');
      return;
    }

    console.log(`   爬虫获取: ${crawled.length} 条`);

    // 3. 过滤已存在的（按 URL 和标题双重去重）
    const newPolicies = crawled.filter(
      (p) => !existingUrls.has(p.url) && !existingTitles.has(escapeForTS(p.title)),
    );

    if (newPolicies.length === 0) {
      console.log(`✅ 爬取到 ${crawled.length} 条政策，均已存在，无需更新`);
      return;
    }

    // 4. 生成新条目代码
    const dateStr = dayjs().format('YYYYMMDD');
    const newEntries = newPolicies
      .map(
        (p, i) => `  {
    id: 'crawl-${dateStr}-${String(i + 1).padStart(3, '0')}',
    title: '${escapeForTS(p.title)}',
    regionType: '${mapRegionType(p.level)}',
    province: '${escapeForTS(p.region)}',
    category: 'policy',
    status: 'active',
    publishDate: '${p.date}',
    issuingAuthority: '${escapeForTS(p.source)}',
    summary: '${escapeForTS(p.title)}',
    sourceUrl: '${p.url}',
  }`,
      )
      .join(',\n');

    // 5. 在文件末尾 ]; 前插入新条目（保留所有现有数据）
    const sectionComment = `  // ===== 每日爬虫自动发现 (${dayjs().format('YYYY-MM-DD')}) =====`;
    const updatedContent = existingContent.replace(
      /\n];\s*$/,
      `\n${sectionComment}\n${newEntries},\n];\n`,
    );

    writeFileSync(filePath, updatedContent, 'utf-8');

    console.log(`✅ 新增 ${newPolicies.length} 条政策:`);
    newPolicies.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.title} (${p.source})`);
      console.log(`      链接: ${p.url}`);
    });
  } catch (error) {
    console.error('❌ 政策数据更新失败:', error);
  }
}

/**
 * 更新资讯数据文件 - 增量合并模式
 * 保留现有手工资讯，仅追加搜索引擎发现的新资讯
 */
async function updateNewsFile() {
  console.log('\n📰 正在更新资讯数据（增量模式）...');

  const filePath = resolve(PROJECT_ROOT, 'src/data/news.ts');

  try {
    // 1. 读取现有文件，提取已有 URL 和标题用于去重
    if (!existsSync(filePath)) {
      console.log('⚠️ news.ts 不存在，跳过资讯更新');
      return;
    }

    const existingContent = readFileSync(filePath, 'utf-8');

    const existingUrls = new Set<string>();
    const urlRegex = /url:\s*'([^']+)'/g;
    let urlMatch;
    while ((urlMatch = urlRegex.exec(existingContent)) !== null) {
      existingUrls.add(urlMatch[1]);
    }

    const existingTitles = new Set<string>();
    const titleRegex = /title:\s*'([^']+)'/g;
    let titleMatch;
    while ((titleMatch = titleRegex.exec(existingContent)) !== null) {
      existingTitles.add(titleMatch[1]);
    }

    console.log(`   现有资讯: ${existingUrls.size} 条`);

    // 2. 搜索新资讯
    const crawled: NewsDetailData[] = await fetchNewsDetails();

    if (crawled.length === 0) {
      console.log('⚠️ 搜索未返回数据，保持原文件不变');
      return;
    }

    console.log(`   搜索获取: ${crawled.length} 条`);

    // 3. 过滤已存在的（按 URL 和标题双重去重）
    const newNews = crawled.filter(
      (n) => !existingUrls.has(n.url) && !existingTitles.has(escapeForTS(n.title)),
    );

    if (newNews.length === 0) {
      console.log(`✅ 搜索到 ${crawled.length} 条资讯，均已存在，无需更新`);
      return;
    }

    // 4. 生成新条目代码
    const dateStr = dayjs().format('YYYYMMDD');
    const newEntries = newNews
      .map(
        (n, i) => `  {
    id: 'search-${dateStr}-${String(i + 1).padStart(3, '0')}',
    title: '${escapeForTS(n.title)}',
    summary: '${escapeForTS(n.summary || n.title)}',
    source: '${escapeForTS(n.source)}',
    publishDate: '${n.date}',
    url: '${n.url}',
    tags: [${n.tags.map((t) => `'${escapeForTS(t)}'`).join(', ')}],
  }`,
      )
      .join(',\n');

    // 5. 在 ]; 前插入新条目
    const sectionComment = `  // ===== 每日搜索自动发现 (${dayjs().format('YYYY-MM-DD')}) =====`;
    const updatedContent = existingContent.replace(
      /\n];\s*$/m,
      `\n${sectionComment}\n${newEntries},\n];\n`,
    );

    // 保留文件末尾的辅助函数
    const helperFunctions = existingContent.match(/\n\/\/ 获取最近的新闻[\s\S]*$/);
    let finalContent = updatedContent;
    if (helperFunctions && !updatedContent.includes('getLatestNews')) {
      finalContent = updatedContent.trimEnd() + '\n' + helperFunctions[0];
    }

    writeFileSync(filePath, finalContent, 'utf-8');

    console.log(`✅ 新增 ${newNews.length} 条资讯:`);
    newNews.forEach((n, i) => {
      console.log(`   ${i + 1}. ${n.title} (${n.source})`);
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
const isDirectRun =
  process.argv[1]?.includes('updateData') || (import.meta as Record<string, unknown>).main === true;
if (isDirectRun) {
  updateProjectData().catch((error) => {
    console.error('❌ 数据更新失败:', error);
    process.exit(1);
  });
}

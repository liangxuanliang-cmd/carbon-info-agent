/**
 * 爬虫测试脚本
 * 测试详情页爬虫是否能正常抓取真实URL
 */

import { fetchPolicyDetails } from './crawler/policyDetailCrawler';
import { fetchNewsDetails } from './crawler/newsDetailCrawler';

async function testCrawlers() {
  console.log('🧪 开始测试详情页爬虫...\n');
  
  // 测试政策爬虫
  console.log('📋 测试政策详情页爬虫...');
  try {
    const policies = await fetchPolicyDetails();
    console.log(`✅ 政策爬虫成功，获取 ${policies.length} 条政策`);
    if (policies.length > 0) {
      console.log('\n前3条政策预览:');
      policies.slice(0, 3).forEach((p, i) => {
        console.log(`  ${i + 1}. ${p.title}`);
        console.log(`     链接: ${p.url}`);
        console.log(`     日期: ${p.date}`);
        console.log(`     来源: ${p.source}\n`);
      });
    }
  } catch (error) {
    console.error('❌ 政策爬虫失败:', error);
  }
  
  // 测试资讯爬虫
  console.log('\n📰 测试资讯详情页爬虫...');
  try {
    const news = await fetchNewsDetails();
    console.log(`✅ 资讯爬虫成功，获取 ${news.length} 条资讯`);
    if (news.length > 0) {
      console.log('\n前3条资讯预览:');
      news.slice(0, 3).forEach((n, i) => {
        console.log(`  ${i + 1}. ${n.title}`);
        console.log(`     链接: ${n.url}`);
        console.log(`     日期: ${n.date}`);
        console.log(`     来源: ${n.source}\n`);
      });
    }
  } catch (error) {
    console.error('❌ 资讯爬虫失败:', error);
  }
  
  console.log('\n🎉 测试完成');
}

// 运行测试
testCrawlers().catch(console.error);

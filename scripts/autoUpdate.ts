/**
 * 自动更新主入口脚本
 * 协调整个数据更新和简报发送流程
 * 
 * 执行顺序：
 * 1. 通过浏览器搜索获取最新数据
 * 2. 更新项目数据文件（src/data/*）
 * 3. 提交Git更新
 * 4. 生成并发送每日简报到钉钉
 */

import { updateProjectData } from './updateData';
import { sendDailyReport } from './sendDingTalk';

/**
 * 主执行函数
 */
async function main() {
  console.log('🚀 启动碳普惠资讯Agent自动更新流程...\n');
  console.log(`⏰ 执行时间: ${new Date().toLocaleString('zh-CN')}\n`);

  try {
    // 阶段1: 获取最新数据并更新项目
    console.log('📥 阶段1: 获取最新数据并更新项目...');
    const data = await updateProjectData();
    
    // 阶段2: 提交Git更新（GitHub Actions会自动提交）
    console.log('📦 阶段2: 数据已更新到项目文件\n');
    
    // 阶段3: 生成并发送每日简报
    console.log('📨 阶段3: 生成并发送每日简报...');
    const sendSuccess = await sendDailyReport();
    
    if (!sendSuccess) {
      console.error('⚠️ 简报发送失败');
    }

    console.log('\n✅ 自动更新流程完成！');
    console.log('\n📊 今日数据摘要:');
    console.log(`   • CEA碳价: ${data.carbonPrices.cea.price}元/吨 (${data.carbonPrices.cea.change}%)`);
    console.log(`   • 新增资讯: ${data.news.length}条`);
    console.log(`   • 新增政策: ${data.policies.length}条`);
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ 自动更新流程失败:', error);
    process.exit(1);
  }
}

// 执行主函数
main();

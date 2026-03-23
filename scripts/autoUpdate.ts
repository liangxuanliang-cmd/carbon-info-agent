/**
 * 自动更新主入口脚本
 * 协调整个数据更新和简报发送流程
 */

import { sendDailyReport } from './sendDingTalk';

/**
 * 主执行函数
 */
async function main() {
  console.log('🚀 启动碳普惠资讯Agent自动更新流程...\n');
  console.log(`⏰ 执行时间: ${new Date().toLocaleString('zh-CN')}\n`);

  try {
    // 阶段1: 发送每日简报到钉钉
    console.log('📨 阶段1: 发送每日简报到钉钉...');
    const sendSuccess = await sendDailyReport();
    
    if (!sendSuccess) {
      console.error('⚠️ 简报发送失败，但继续执行其他任务');
    }

    console.log('\n✅ 自动更新流程完成！');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ 自动更新流程失败:', error);
    process.exit(1);
  }
}

// 执行主函数
main();

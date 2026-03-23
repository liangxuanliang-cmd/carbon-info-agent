/**
 * 钉钉Webhook发送脚本
 */

import { generateDingTalkMessage } from './generateDailyReport';

// 钉钉Webhook配置
const DINGTALK_WEBHOOK = process.env.DINGTALK_WEBHOOK || 
  'https://oapi.dingtalk.com/robot/send?access_token=cb950352a0d3ee903dab85a17b512ee7e556f0c95336cc2d92920fb08e693492';

/**
 * 发送消息到钉钉群
 */
export async function sendToDingTalk(message: object): Promise<boolean> {
  try {
    console.log('正在发送钉钉消息...');
    console.log('Webhook:', DINGTALK_WEBHOOK.substring(0, 60) + '...');
    
    const response = await fetch(DINGTALK_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.errcode !== 0) {
      throw new Error(`钉钉API错误: ${result.errmsg} (code: ${result.errcode})`);
    }

    console.log('✅ 钉钉消息发送成功！');
    return true;
  } catch (error) {
    console.error('❌ 钉钉消息发送失败:', error);
    return false;
  }
}

/**
 * 发送每日简报
 */
export async function sendDailyReport(): Promise<boolean> {
  const message = generateDingTalkMessage();
  console.log('\n========== 生成的简报内容 ==========\n');
  console.log(message.markdown.text);
  console.log('\n====================================\n');
  
  return await sendToDingTalk(message);
}

// 如果直接运行此脚本
sendDailyReport().then((success) => {
  process.exit(success ? 0 : 1);
});

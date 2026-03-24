/**
 * 每日简报生成脚本（精简版）
 * 仅包含有价格变化的碳价、新发布政策/方法学、新资讯
 */

import dayjs from 'dayjs';

// 部署后的网站链接
const WEBSITE_URL = process.env.WEBSITE_URL || 'https://carbonhub.netlify.app';

// 碳价数据 - 仅显示有变化的
interface CarbonPrice {
  name: string;
  price: number;
  change: number;
  unit: string;
}

// 模拟今日有价格变化的碳汇商品
const changedCarbonPrices: CarbonPrice[] = [
  { name: 'CEA', price: 87.74, change: -0.05, unit: '元/吨' },
  { name: 'CCER', price: 80.60, change: 0.12, unit: '元/吨' },
];

// 新发布政策和方法学
const newPolicies = [
  { name: '北京市碳普惠管理办法（试行）', type: '政策', issuer: '北京市生态环境局' },
  { name: '上海市碳普惠方法学（低碳出行）', type: '方法学', issuer: '上海市生态环境局' },
];

// 新碳交易资讯
const newNews = [
  { title: '全国碳市场CEA价格跌破88元关口', source: '全国碳市场信息网' },
  { title: 'CCER市场活跃度持续提升', source: '碳交易网' },
];

/**
 * 生成钉钉Markdown格式的简报（精简版）
 */
export function generateDingTalkReport(): string {
  const today = dayjs().format('MM月DD日');
  
  // 碳价变动部分
  let priceSection = '';
  if (changedCarbonPrices.length > 0) {
    priceSection = changedCarbonPrices.map((p) => {
      const emoji = p.change >= 0 ? '📈' : '📉';
      const changeText = p.change >= 0 ? `+${p.change}%` : `${p.change}%`;
      return `**${p.name}**: ${p.price}${p.unit} (${changeText}) ${emoji}`;
    }).join('\n');
  } else {
    priceSection = '今日碳价无显著变化';
  }

  // 政策部分
  let policySection = '';
  if (newPolicies.length > 0) {
    policySection = newPolicies.map((p, i) => 
      `${i + 1}. **[${p.type}]** ${p.name} | ${p.issuer}`
    ).join('\n');
  } else {
    policySection = '今日无新发布政策或方法学';
  }

  // 资讯部分
  let newsSection = '';
  if (newNews.length > 0) {
    newsSection = newNews.map((n, i) => 
      `${i + 1}. ${n.title}`
    ).join('\n');
  } else {
    newsSection = '今日无新资讯';
  }

  // 网站链接部分（部署后显示）
  const websiteSection = WEBSITE_URL 
    ? `\n📱 **[查看详细内容](${WEBSITE_URL})**\n`
    : '';

  const report = `## 📊 碳普惠日报 ${today}

**💹 价格变动**
${priceSection}

**📋 新发布政策/方法学**
${policySection}

**📰 新资讯**
${newsSection}
${websiteSection}
---
⏰ ${dayjs().format('HH:mm')}更新`;

  return report;
}

/**
 * 生成简报的JSON格式（用于钉钉API）
 */
export function generateDingTalkMessage() {
  const markdownContent = generateDingTalkReport();
  
  return {
    msgtype: 'markdown',
    markdown: {
      title: `碳普惠日报 ${dayjs().format('MM月DD日')}`,
      text: markdownContent,
    },
    at: {
      isAtAll: false,
    },
  };
}

// 如果直接运行此脚本
if (import.meta.main) {
  console.log(generateDingTalkReport());
}

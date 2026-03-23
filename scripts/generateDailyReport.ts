/**
 * 每日简报生成脚本
 * 基于搜索获取的数据生成格式化的钉钉消息
 */

import dayjs from 'dayjs';

// 今日碳价数据（从浏览器搜索获取）
const todayCarbonPrice = {
  cea: {
    price: 87.74,
    change: -0.05,
    date: '2026-03-24',
  },
  ccer: {
    buyPrice: 70.40,
    sellPrice: 84.80,
    midPrice: 80.60,
    date: '2026-03-24',
  },
};

// 最新政策
const latestPolicies = [
  { name: '北京市碳普惠管理办法（试行）', issuer: '北京市生态环境局' },
  { name: '上海市碳普惠管理办法', issuer: '上海市生态环境局' },
  { name: '武汉市碳普惠管理办法', issuer: '武汉市生态环境局' },
];

// 最新资讯
const latestNews = [
  { title: '全国碳市场3月24日收跌0.05%，报87.74元/吨', source: '全国碳市场信息网' },
  { title: '零碳概念大规模纳入国家级行动计划', source: '政策发布' },
  { title: '碳普惠成为"十五五"时期全民减碳重要抓手', source: '行业分析' },
];

/**
 * 生成钉钉Markdown格式的简报
 */
export function generateDingTalkReport(): string {
  const today = dayjs().format('YYYY年MM月DD日');
  const weekday = dayjs().format('dddd');
  
  // 判断涨跌颜色（钉钉不支持彩色，使用emoji）
  const ceaChangeEmoji = todayCarbonPrice.cea.change >= 0 ? '📈' : '📉';
  const ceaChangeText = todayCarbonPrice.cea.change >= 0 
    ? `+${todayCarbonPrice.cea.change}%` 
    : `${todayCarbonPrice.cea.change}%`;

  const report = `## 📊 碳普惠资讯日报 - ${today} ${weekday}

---

### 💹 碳价动态

**全国碳市场（CEA）**
• 收盘价：**${todayCarbonPrice.cea.price}元/吨** ${ceaChangeEmoji}
• 涨跌幅：**${ceaChangeText}**

**CCER核证自愿减排**
• 买入价：${todayCarbonPrice.ccer.buyPrice}元/吨
• 卖出价：${todayCarbonPrice.ccer.sellPrice}元/吨
• 中间价：${todayCarbonPrice.ccer.midPrice}元/吨

---

### 📋 最新政策

${latestPolicies.map((p, i) => `${i + 1}. **${p.name}**\n   发布机构：${p.issuer}`).join('\n\n')}

---

### 📰 资讯精选

${latestNews.map((n, i) => `${i + 1}. ${n.title}\n   📎 ${n.source}`).join('\n\n')}

---

### 🌱 减排小贴士

**北京 - 公交出行10公里**
≈ 减排 **1.25kg CO₂** 🚌

---

⏰ 数据更新时间：${dayjs().format('HH:mm')}
🤖 碳普惠资讯Agent自动生成
`;

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
      title: `碳普惠资讯日报 - ${dayjs().format('MM月DD日')}`,
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

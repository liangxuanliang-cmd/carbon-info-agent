// 自动生成的碳价数据 - 更新时间: 2026-04-11 22:00:23
// 数据来源: 百度搜索

// 最新碳价数据
export const latestPrices = [
  {
    productId: 'CEA',
    name: '全国碳市场CEA',
    price: 79.5,
    change: 0,
    date: '2026-04-11',
    source: '百度搜索',
  },
  {
    productId: 'CCER',
    name: 'CCER',
    price: 98,
    change: 0,
    date: '2026-04-11',
    source: '百度搜索',
  },
  {
    productId: 'BEA',
    name: '北京碳配额BEA',
    price: 80,
    change: 0,
    date: '2026-04-11',
    source: '百度搜索',
  },
];

// 获取指定产品的最新价格
export const getPriceByProductId = (productId: string) => {
  return latestPrices.find((p) => p.productId === productId);
};

// 获取所有最新价格
export const getAllLatestPrices = () => latestPrices;

import type { PriceRecord } from '../types';
import { CARBON_PRODUCTS_META } from '../utils/constants';
import dayjs from 'dayjs';

// 自动生成的碳价数据 - 更新时间: 2026-11-12 02:05:24
// 数据来源: 百度搜索

// 最新碳价数据
export const latestPrices = [
  {
    productId: 'HBEA',
    name: '湖北碳配额HBEA',
    price: 94.7,
    change: 0,
    date: '2026-11-12',
    source: '百度搜索',
  },
];

// 获取指定产品的最新价格
export const getPriceByProductId = (productId: string) => {
  return latestPrices.find((p) => p.productId === productId);
};

// 获取所有最新价格
export const getAllLatestPrices = () => latestPrices;

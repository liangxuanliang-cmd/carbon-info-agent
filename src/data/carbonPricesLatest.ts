import type { PriceRecord } from '../types';
import { CARBON_PRODUCTS_META } from '../utils/constants';
import dayjs from 'dayjs';

// 自动生成的碳价数据 - 更新时间: 2026-10-06 01:37:35
// 数据来源: 百度搜索

// 最新碳价数据
export const latestPrices = [
  {
    productId: 'CEA',
    name: '全国碳市场CEA',
    price: 94.98,
    change: 0,
    date: '2026-10-06',
    source: '百度搜索',
  },
  {
    productId: 'CCER',
    name: 'CCER',
    price: 68,
    change: 0,
    date: '2026-10-06',
    source: '百度搜索',
  },
  {
    productId: 'BEA',
    name: '北京碳配额BEA',
    price: 94.96,
    change: 0,
    date: '2026-10-06',
    source: '百度搜索',
  },
  {
    productId: 'SHEA',
    name: '上海碳配额SHEA',
    price: 57.4,
    change: 0,
    date: '2026-10-06',
    source: '百度搜索',
  },
  {
    productId: 'GDEA',
    name: '广东碳配额GDEA',
    price: 81,
    change: 0,
    date: '2026-10-06',
    source: '百度搜索',
  },
  {
    productId: 'HBEA',
    name: '湖北碳配额HBEA',
    price: 48.69,
    change: 0,
    date: '2026-10-06',
    source: '百度搜索',
  },
];

// 获取指定产品的最新价格
export const getPriceByProductId = (productId: string) => {
  return latestPrices.find((p) => p.productId === productId);
};

// 获取所有最新价格
export const getAllLatestPrices = () => latestPrices;

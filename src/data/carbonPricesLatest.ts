import type { PriceRecord } from '../types';
import { CARBON_PRODUCTS_META } from '../utils/constants';
import dayjs from 'dayjs';

// 自动生成的碳价数据 - 更新时间: 2026-04-07 23:53:18
// 数据来源: 百度搜索

// 最新碳价数据
export const latestPrices = [
  {
    productId: 'CEA',
    name: '全国碳市场CEA',
    price: 78,
    change: 7,
    date: '2026-04-07',
    source: '百度搜索',
  },
  {
    productId: 'CCER',
    name: 'CCER',
    price: 78,
    change: 7,
    date: '2026-04-07',
    source: '百度搜索',
  },
  {
    productId: 'BEA',
    name: '北京碳配额BEA',
    price: 78,
    change: 7,
    date: '2026-04-07',
    source: '百度搜索',
  },
  {
    productId: 'SHEA',
    name: '上海碳配额SHEA',
    price: 78,
    change: 7,
    date: '2026-04-07',
    source: '百度搜索',
  },
  {
    productId: 'GDEA',
    name: '广东碳配额GDEA',
    price: 78,
    change: 7,
    date: '2026-04-07',
    source: '百度搜索',
  },
  {
    productId: 'HBEA',
    name: '湖北碳配额HBEA',
    price: 78,
    change: 7,
    date: '2026-04-07',
    source: '百度搜索',
  },
];

// 获取指定产品的最新价格
export const getPriceByProductId = (productId: string) => {
  return latestPrices.find((p) => p.productId === productId);
};

// 获取所有最新价格
export const getAllLatestPrices = () => latestPrices;

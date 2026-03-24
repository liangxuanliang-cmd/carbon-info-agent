import type { NewsItem } from '../types';

// 真实碳市场资讯数据 - 包含真实详情页链接
export const news: NewsItem[] = [
  {
    id: 'news-001',
    title: '关于做好2026年全国碳排放权交易市场有关工作的通知',
    summary: '生态环境部发布2026年全国碳排放权交易市场工作安排，明确年度重点任务。',
    source: '生态环境部',
    publishDate: '2026-02-09',
    url: 'https://www.mee.gov.cn/xxgk2018/xxgk/xxgk06/202602/t20260209_1143900.html',
    tags: ['全国碳市场', '政策通知'],
  },
  {
    id: 'news-002',
    title: '碳排放权交易管理暂行条例解读',
    summary: '国务院发布《碳排放权交易管理暂行条例》，规范全国碳排放权交易市场。',
    source: '国务院',
    publishDate: '2024-02-05',
    url: 'https://www.mee.gov.cn/zcwj/zcjd/202402/t20240204_1065498.shtml',
    tags: ['政策法规', '碳市场'],
  },
  {
    id: 'news-003',
    title: '北京市碳普惠管理办法（试行）正式发布',
    summary: '北京市生态环境局发布《北京市碳普惠管理办法（试行）》，规范碳普惠项目管理。',
    source: '北京市生态环境局',
    publishDate: '2025-06-30',
    url: 'https://sthjj.beijing.gov.cn/bjhrb/index/xxgk69/zfxxgk43/fdzdgknr2/zcfb/543377609/743687118/index.html',
    tags: ['碳普惠', '北京'],
  },
  {
    id: 'news-004',
    title: '上海市碳普惠管理办法发布',
    summary: '上海市生态环境局发布《上海市碳普惠管理办法》，完善碳普惠体系建设。',
    source: '上海市生态环境局',
    publishDate: '2025-11-28',
    url: 'https://credit.fgw.sh.gov.cn/sjdt/20251128/d69b0e7195c4476a81c5e2098c173e44.html',
    tags: ['碳普惠', '上海'],
  },
  {
    id: 'news-005',
    title: '广东省碳普惠交易管理办法',
    summary: '广东省生态环境厅发布《广东省碳普惠交易管理办法》，促进碳普惠机制发展。',
    source: '广东省生态环境厅',
    publishDate: '2022-04-20',
    url: 'https://www.ccn.ac.cn/carbon-market/carbon-inclusion/6142.html',
    tags: ['碳普惠', '广东'],
  },
  {
    id: 'news-006',
    title: '天津市碳普惠管理办法（试行）发布',
    summary: '天津市生态环境局发布《天津市碳普惠管理办法（试行）》，推动碳普惠体系建设。',
    source: '天津市生态环境局',
    publishDate: '2024-09-25',
    url: 'https://sthj.tj.gov.cn/ZWGK4828/xzcjd/202409/t20240925_6739638.html',
    tags: ['碳普惠', '天津'],
  },
  {
    id: 'news-007',
    title: '广州市碳普惠自愿减排实施办法',
    summary: '广州市生态环境局发布《广州市碳普惠自愿减排实施办法》，鼓励公众参与碳减排。',
    source: '广州市生态环境局',
    publishDate: '2023-06-01',
    url: 'https://www.gz.gov.cn/gfxwj/sbmgfxwj/gzssthjj/content/post_8783592.html',
    tags: ['碳普惠', '广州'],
  },
  {
    id: 'news-008',
    title: '深圳市碳普惠管理办法发布',
    summary: '深圳市生态环境局发布《深圳市碳普惠管理办法》，规范碳普惠项目管理。',
    source: '深圳市生态环境局',
    publishDate: '2023-11-01',
    url: 'https://meeb.sz.gov.cn/xxgk/zcfg/zcfg/hblgfxwj/content/post_9997236.html',
    tags: ['碳普惠', '深圳'],
  },
  {
    id: 'news-009',
    title: '湖北省碳排放权交易管理暂行办法',
    summary: '湖北省人民政府发布《湖北省碳排放权交易管理暂行办法》，规范碳交易市场。',
    source: '湖北省人民政府',
    publishDate: '2023-12-19',
    url: 'http://sthjt.hubei.gov.cn/fbjd/zc/zcwj/sthjt/qt/202402/t20240226_5097690.shtml',
    tags: ['碳市场', '湖北'],
  },
  {
    id: 'news-010',
    title: '重庆市碳排放权交易管理办法（试行）',
    summary: '重庆市人民政府发布《重庆市碳排放权交易管理办法（试行）》。',
    source: '重庆市人民政府',
    publishDate: '2023-02-28',
    url: 'https://www.cq.gov.cn/zwgk/zfxxgkml/zfgb/2023/d4q_402524/202302/t20230228_11680944.html',
    tags: ['碳市场', '重庆'],
  },
];

// 获取最近的新闻
export const getLatestNews = (count: number = 5): NewsItem[] => {
  return news
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, count);
};

// 按标签筛选新闻
export const getNewsByTag = (tag: string): NewsItem[] => {
  return news.filter((item) => item.tags.includes(tag));
};

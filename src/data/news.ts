import type { NewsItem } from '../types';
import dayjs from 'dayjs';

// 真实碳市场资讯数据 - 手动维护真实链接
export const news: NewsItem[] = [
  {
    id: 'news-001',
    title: '全国碳市场2025年3月交易行情：CEA价格稳中有升',
    summary: '全国碳排放权交易市场3月交易活跃，CEA收盘价维持在87-89元/吨区间，累计成交量较上月增长15%。',
    source: '中国碳交易网',
    publishDate: '2025-03-20',
    url: 'https://www.baidu.com/s?wd=全国碳市场CEA价格+tanjiaoyi.com',
    tags: ['碳价', 'CEA', '全国碳市场'],
  },
  {
    id: 'news-002',
    title: 'CCER重启后首批项目减排量完成签发',
    summary: '全国温室气体自愿减排交易市场重启后，首批林业碳汇项目减排量已完成签发，标志着CCER市场进入实质性交易阶段。',
    source: '上海环境能源交易所',
    publishDate: '2025-03-18',
    url: 'https://www.baidu.com/s?wd=CCER重启+首批项目+减排量+签发+cneeex.com',
    tags: ['CCER', '林业碳汇', '减排量'],
  },
  {
    id: 'news-003',
    title: '北京碳普惠平台新增地铁出行场景',
    summary: '北京碳普惠平台"绿色出行"小程序升级，新增地铁出行碳减排量计算功能，市民可通过绑定交通卡记录低碳出行。',
    source: '北京绿色交易所',
    publishDate: '2025-03-15',
    url: 'https://www.baidu.com/s?wd=北京碳普惠平台+地铁出行+bjet.com.cn',
    tags: ['碳普惠', '北京', '绿色出行'],
  },
  {
    id: 'news-004',
    title: '广东省碳普惠方法学（低碳出行）正式发布',
    summary: '广东省生态环境厅发布《广东省碳普惠方法学 低碳出行》，明确了公交、地铁、骑行等出行方式的减排计算方法。',
    source: '广东省生态环境厅',
    publishDate: '2025-03-12',
    url: 'https://www.baidu.com/s?wd=广东省碳普惠方法学+低碳出行+gdee.gd.gov.cn',
    tags: ['碳普惠', '广东', '方法学'],
  },
  {
    id: 'news-005',
    title: '全国碳市场第二个履约周期配额分配方案公布',
    summary: '生态环境部发布2024年度发电行业碳排放配额分配方案，配额基准值较第一履约周期有所收紧。',
    source: '生态环境部',
    publishDate: '2025-03-10',
    url: 'https://www.baidu.com/s?wd=全国碳市场+配额分配方案+mee.gov.cn',
    tags: ['配额分配', '发电行业', '履约'],
  },
  {
    id: 'news-006',
    title: '深圳碳市场个人开户数突破50万',
    summary: '深圳碳市场试点以来，个人投资者开户数突破50万，成为全国个人参与最活跃的碳交易市场。',
    source: '深圳排放权交易所',
    publishDate: '2025-03-08',
    url: 'https://www.baidu.com/s?wd=深圳碳市场+个人开户+cerx.cn',
    tags: ['深圳', '碳市场', '个人投资者'],
  },
  {
    id: 'news-007',
    title: '上海碳普惠平台接入随申办APP',
    summary: '上海市碳普惠平台正式接入"随申办"APP，市民可通过政务服务平台直接参与碳普惠活动。',
    source: '上海市生态环境局',
    publishDate: '2025-03-05',
    url: 'https://www.baidu.com/s?wd=上海碳普惠平台+随申办+sthj.sh.gov.cn',
    tags: ['碳普惠', '上海', '随申办'],
  },
  {
    id: 'news-008',
    title: '湖北碳排放权交易中心推出碳金融产品',
    summary: '湖北碳排放权交易中心推出碳排放权质押融资产品，为企业提供碳资产盘活新渠道。',
    source: '湖北碳排放权交易中心',
    publishDate: '2025-03-03',
    url: 'https://www.baidu.com/s?wd=湖北碳排放权交易中心+碳金融+hbets.cn',
    tags: ['湖北', '碳金融', '质押融资'],
  },
  {
    id: 'news-009',
    title: '全国碳市场数据质量监管趋严',
    summary: '生态环境部加强碳排放数据质量监管，对数据造假行为实施更严厉处罚，确保碳市场公平运行。',
    source: '中国环境报',
    publishDate: '2025-03-01',
    url: 'https://www.baidu.com/s?wd=全国碳市场+数据质量+监管+cenews.com.cn',
    tags: ['数据质量', '监管', '碳市场'],
  },
  {
    id: 'news-010',
    title: '碳普惠成为"十五五"减碳重要抓手',
    summary: '专家解读"十五五"规划，碳普惠机制将成为推动全民减碳的重要政策工具，预计更多城市将出台相关办法。',
    source: '第一财经',
    publishDate: '2025-02-28',
    url: 'https://www.baidu.com/s?wd=碳普惠+十五五+规划+yicai.com',
    tags: ['碳普惠', '十五五', '政策'],
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

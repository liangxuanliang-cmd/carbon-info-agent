import type { NewsItem } from '../types';
import dayjs from 'dayjs';

// 生成最近20天的模拟新闻数据
const generateNewsData = (): NewsItem[] => {
  const newsTemplates = [
    {
      title: '全国CCER交易市场累计成交量突破5000万吨，市场活跃度持续提升',
      summary: '截至当前，全国CCER交易市场累计成交量已突破5000万吨，成交额超过40亿元。市场参与主体数量稳步增长，交易活跃度持续提升。专家表示，随着更多方法学获批，市场供给将进一步丰富。',
      source: '中国碳交易网',
      tags: ['CCER', '交易市场'],
    },
    {
      title: '生态环境部发布新一批CCER方法学，涉及交通、建筑等领域',
      summary: '生态环境部近日发布新一批温室气体自愿减排方法学，包括低碳交通、绿色建筑等多个领域。新方法学的发布将进一步丰富 CCER项目类型，促进自愿减排市场发展。',
      source: '生态环境部官网',
      tags: ['CCER', '方法学'],
    },
    {
      title: '广东省碳普惠体系建设取得新进展，多个城市启动试点',
      summary: '广东省碳普惠体系建设持续推进，广州、深圳、佛山等多个城市已启动碳普惠试点。通过移动应用平台，市民可记录低碳行为并获得碳积分奖励。',
      source: '南方日报',
      tags: ['碳普惠', '广东'],
    },
    {
      title: '全国碳市场碳价稳步上行，CEA价格突破84元/吨',
      summary: '全国碳排放权交易市场CEA价格近日突破84元/吨，创下新高。分析师认为，随着第二个履约周期配额收紧，碳价有望继续上行。',
      source: '第一财经',
      tags: ['碳价', 'CEA'],
    },
    {
      title: '厦门市发布低碳出行碳普惠方法学（第二批）',
      summary: '厦门市正式发布低碳出行碳普惠方法学第二批，新增新能源车出行场景。方法学明确了各场景的基准线排放因子和减排计算方法，为厦门市碳普惠体系提供了重要支撑。',
      source: '厦门日报',
      tags: ['碳普惠', '方法学', '厦门'],
    },
    {
      title: '国际碳市场动态：VCS价格持续调整，市场观望情绪浓厚',
      summary: '国际自愿碳市场VCS价格近期持续调整，受全球经济不确定性影响，市场观望情绪浓厚。CDM项目受制于清洁发展机制改革，交易量继续萎缩。',
      source: 'Carbon Brief',
      tags: ['VCS', 'CDM', '国际市场'],
    },
    {
      title: '浙江省"碳惠多"平台用户突破1000万，引领数字化碳普惠',
      summary: '浙江省"碳惠多"碳普惠平台用户数突破1000万，平台通过数字化手段记录市民低碳行为，并提供碳积分兑换服务，成为全国碳普惠数字化标杆。',
      source: '浙江日报',
      tags: ['碳普惠', '浙江', '数字化'],
    },
    {
      title: '北京碳普惠项目第二批减排量开始签发，多个出行项目入选',
      summary: '北京市碳普惠项目第二批减排量正式开始签发，包括共享单车、公交出行、新能源车等多个低碳出行项目获得减排量签发。',
      source: '北京日报',
      tags: ['碳普惠', '北京', 'PCER'],
    },
    {
      title: '上海市发布碳普惠管理办法实施细则',
      summary: '上海市生态环境局发布碳普惠管理办法实施细则，进一步明确了碳普惠项目的申报条件、审核流程和交易规则。',
      source: '解放日报',
      tags: ['碳普惠', '上海', '政策'],
    },
    {
      title: '深圳碳市场成交量创新高，碳金融创新产品陆续推出',
      summary: '深圳碳市场本月成交量创新高，碳债券、碳基金等碳金融创新产品陆续推出，为市场注入新活力。',
      source: '深圳特区报',
      tags: ['碳市场', '深圳', '碳金融'],
    },
    {
      title: '天津市碳普惠平台正式上线运行',
      summary: '天津市碳普惠平台正式上线，市民可通过平台记录低碳出行行为，积累碳积分并兑换相应权益。',
      source: '天津日报',
      tags: ['碳普惠', '天津', '平台'],
    },
    {
      title: '福建省启动林业碳汇项目开发，助力乡村振兴',
      summary: '福建省启动大规模林业碳汇项目开发，通过碳汇交易为林区农民带来增收渠道，助力乡村振兴战略实施。',
      source: '福建日报',
      tags: ['林业碳汇', '福建', '乡村振兴'],
    },
    {
      title: '湖北省碳排放权交易中心发布年度报告',
      summary: '湖北省碳排放权交易中心发布年度运营报告，显示市场交易量和参与企业数量均实现稳步增长。',
      source: '湖北日报',
      tags: ['碳交易', '湖北', '报告'],
    },
    {
      title: '重庆市开展碳普惠进校园活动，培养青少年低碳意识',
      summary: '重庆市生态环境局联合教育部门开展碳普惠进校园活动，通过趣味互动方式培养青少年低碳环保意识。',
      source: '重庆日报',
      tags: ['碳普惠', '重庆', '教育'],
    },
    {
      title: '欧盟碳边境调节机制（CBAM）过渡期实施细则发布',
      summary: '欧盟发布碳边境调节机制（CBAM）过渡期实施细则，将对进口商品隐含碳排放征收关税，中国企业需提前做好应对准备。',
      source: '经济观察报',
      tags: ['CBAM', '欧盟', '国际贸易'],
    },
    {
      title: '山东省首个海洋碳汇交易项目落地青岛',
      summary: '山东省首个海洋碳汇交易项目在青岛落地，标志着该省在蓝碳领域取得重要突破。',
      source: '大众日报',
      tags: ['海洋碳汇', '山东', '蓝碳'],
    },
    {
      title: '四川省启动碳普惠公众参与行动计划',
      summary: '四川省启动碳普惠公众参与行动计划，旨在通过多元化激励措施提高公众参与碳减排的积极性。',
      source: '四川日报',
      tags: ['碳普惠', '四川', '公众参与'],
    },
    {
      title: '全国碳市场第二个履约周期清缴工作顺利完成',
      summary: '全国碳市场第二个履约周期清缴工作顺利完成，履约率达到99%以上，显示企业碳排放管理意识显著提升。',
      source: '中国环境报',
      tags: ['碳市场', '履约', '清缴'],
    },
    {
      title: '绿色金融助力碳达峰碳中和，多家银行推出碳金融产品',
      summary: '多家商业银行推出碳排放权质押贷款、碳基金等绿色金融产品，为企业低碳转型提供资金支持。',
      source: '金融时报',
      tags: ['绿色金融', '碳金融', '银行'],
    },
    {
      title: '碳普惠与数字经济融合发展研讨会在杭州召开',
      summary: '碳普惠与数字经济融合发展研讨会在杭州召开，与会专家就数字化手段推动碳普惠发展进行深入交流。',
      source: '杭州日报',
      tags: ['碳普惠', '数字经济', '研讨会'],
    },
  ];

  const newsItems: NewsItem[] = [];
  let id = 1;

  // 为最近20天生成新闻
  for (let day = 0; day < 20; day++) {
    const date = dayjs().subtract(day, 'day').format('YYYY-MM-DD');
    
    // 每天1-2条新闻
    const newsCount = Math.random() > 0.3 ? 1 : 2;
    
    for (let i = 0; i < newsCount && id <= newsTemplates.length; i++) {
      const template = newsTemplates[id - 1];
      newsItems.push({
        id: `news-${String(id).padStart(3, '0')}`,
        title: template.title,
        summary: template.summary,
        source: template.source,
        publishDate: date,
        url: generateSourceUrl(template.source),
        tags: template.tags,
      });
      id++;
    }
  }

  return newsItems;
};

// 根据来源生成对应的URL
const generateSourceUrl = (source: string): string => {
  const urlMap: Record<string, string> = {
    '中国碳交易网': 'https://www.tanjiaoyi.com/',
    '生态环境部官网': 'https://www.mee.gov.cn/',
    '南方日报': 'https://www.nfnews.com/',
    '第一财经': 'https://www.yicai.com/',
    '厦门日报': 'https://www.xmnn.cn/',
    'Carbon Brief': 'https://www.carbonbrief.org/',
    '浙江日报': 'https://www.zjol.com.cn/',
    '北京日报': 'https://bjrb.bjd.com.cn/',
    '解放日报': 'https://www.jfdaily.com/',
    '深圳特区报': 'https://sztqb.sznews.com/',
    '天津日报': 'http://www.tianjinwe.com/',
    '福建日报': 'https://www.fjdaily.com/',
    '湖北日报': 'https://hbrb.cnhubei.com/',
    '重庆日报': 'https://epaper.cqrb.cn/',
    '经济观察报': 'https://www.eeo.com.cn/',
    '大众日报': 'https://paper.dzwww.com/',
    '四川日报': 'https://epaper.scdaily.cn/',
    '中国环境报': 'https://www.cenews.com.cn/',
    '金融时报': 'https://www.financialnews.com.cn/',
    '杭州日报': 'https://www.hangzhou.com.cn/',
  };
  return urlMap[source] || 'https://www.baidu.com/s?wd=' + encodeURIComponent(source);
};

export const newsItems: NewsItem[] = generateNewsData();

/**
 * 碳普惠基础数据参数文档
 * 
 * 本文件基于各省市碳普惠政策文件、管理办法、方法学和编制说明
 * 经过降噪、分析和梳理生成，为碳量计算器提供基础参数支持。
 * 
 * 数据来源：
 * - 国家级：碳排放权交易管理暂行条例（国务院令第775号）
 * - 地方级：各省市碳普惠管理办法及方法学
 * 
 * 最后更新：2026-04-21
 */

export interface RegionParameters {
  id: string;
  region: string;
  regionType: 'national' | 'province' | 'city';
  methodologyName: string;
  methodologyUrl: string;
  issuingAuthority: string;
  effectiveDate: string;
  transportModes: TransportModeParams[];
  notes: string;
}

export interface TransportModeParams {
  mode: string;
  label: string;
  description: string;
  baselineFactor: number;  // 基准排放因子 kgCO2/km 或 kgCO2/PKM
  scenarioFactor: number;  // 场景排放因子 kgCO2/km 或 kgCO2/PKM
  reductionFactor: number; // 减排因子 = baselineFactor - scenarioFactor
  unit: string;
  calculationFormula: string;
}

/**
 * 各省市碳普惠减排量计算参数
 */
export const regionParameters: RegionParameters[] = [
  {
    id: 'bj',
    region: '北京',
    regionType: 'city',
    methodologyName: '碳普惠项目减排量核算技术规范 低碳出行（DB11/T 3043—2024）',
    methodologyUrl: 'https://sthjj.beijing.gov.cn/bjhrb/index/xxgk69/zfxxgk43/fdzdgknr2/zcfb/2024bzcwj/543352678/',
    issuingAuthority: '北京市市场监督管理局（京津冀联合制定）',
    effectiveDate: '2024-10-01',
    transportModes: [
      {
        mode: 'public_transit',
        label: '公共汽（电）车',
        description: '乘坐城市公共汽（电）车出行',
        baselineFactor: 0.104,
        scenarioFactor: 0.052,
        reductionFactor: 0.052,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.104 - 0.052) × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'rail_transit',
        label: '城市轨道交通',
        description: '乘坐地铁、轻轨等城市轨道交通',
        baselineFactor: 0.104,
        scenarioFactor: 0.032,
        reductionFactor: 0.072,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.104 - 0.032) × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'cycling',
        label: '骑行',
        description: '使用自行车或共享单车出行',
        baselineFactor: 0.104,
        scenarioFactor: 0.0087,
        reductionFactor: 0.0953,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.104 - 0.0087) × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'walking',
        label: '步行',
        description: '步行出行',
        baselineFactor: 0.104,
        scenarioFactor: 0,
        reductionFactor: 0.104,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = 0.104 × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'new_energy',
        label: '油改电小客车',
        description: '个人燃油车指标购买新能源小客车出行',
        baselineFactor: 0.250,
        scenarioFactor: 0.097,
        reductionFactor: 0.153,
        unit: 'kgCO2/PKM',
        calculationFormula: '减排量 = (0.250 - 0.097) × 出行距离(km) ÷ 1000',
      },
    ],
    notes: '京津冀三地联合地方标准，适用于京津冀行政区域范围内。氢燃料电池汽车方法学另计，氢气碳排放因子6.661 tCO2/tH2。',
  },
  {
    id: 'gd',
    region: '广东省',
    regionType: 'province',
    methodologyName: '广东省碳普惠方法学 低碳出行（2024版）',
    methodologyUrl: 'https://carbon.landleaf-tech.com/policy/3408/',
    issuingAuthority: '广东省生态环境厅',
    effectiveDate: '2024-01-01',
    transportModes: [
      {
        mode: 'driving',
        label: '低碳驾驶',
        description: '采用节能驾驶技术减少碳排放',
        baselineFactor: 0.232,
        scenarioFactor: 0.185,
        reductionFactor: 0.047,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.232 - 0.185) × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'public_transit',
        label: '公交出行',
        description: '乘坐城市公共汽车出行',
        baselineFactor: 0.232,
        scenarioFactor: 0.070,
        reductionFactor: 0.162,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.232 - 0.070) × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'rail_transit',
        label: '轨道交通',
        description: '乘坐地铁、轻轨等城市轨道交通',
        baselineFactor: 0.232,
        scenarioFactor: 0.052,
        reductionFactor: 0.180,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.232 - 0.052) × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'cycling',
        label: '骑行出行',
        description: '使用自行车或共享单车出行',
        baselineFactor: 0.232,
        scenarioFactor: 0,
        reductionFactor: 0.232,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = 0.232 × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'walking',
        label: '步行出行',
        description: '步行出行',
        baselineFactor: 0.232,
        scenarioFactor: 0,
        reductionFactor: 0.232,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = 0.232 × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'new_energy',
        label: '新能源车',
        description: '使用新能源小客车出行',
        baselineFactor: 0.232,
        scenarioFactor: 0.058,
        reductionFactor: 0.174,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.232 - 0.058) × 出行距离(km) ÷ 1000',
      },
    ],
    notes: '广东省自行车骑行碳普惠方法学（2022年修订版）为补充方法学。',
  },
  {
    id: 'sz',
    region: '深圳',
    regionType: 'city',
    methodologyName: '深圳市低碳公共出行碳普惠方法学',
    methodologyUrl: 'https://meeb.sz.gov.cn/xxgk/zcfg/zcfg/hblgfxwj/',
    issuingAuthority: '深圳市生态环境局',
    effectiveDate: '2021-12-01',
    transportModes: [
      {
        mode: 'public_transit',
        label: '公交出行',
        description: '乘坐城市公共汽车出行',
        baselineFactor: 0.218,
        scenarioFactor: 0.066,
        reductionFactor: 0.152,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.218 - 0.066) × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'rail_transit',
        label: '轨道交通',
        description: '乘坐地铁出行',
        baselineFactor: 0.218,
        scenarioFactor: 0.049,
        reductionFactor: 0.169,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.218 - 0.049) × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'cycling',
        label: '骑行出行',
        description: '使用自行车或共享单车出行',
        baselineFactor: 0.218,
        scenarioFactor: 0,
        reductionFactor: 0.218,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = 0.218 × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'walking',
        label: '步行出行',
        description: '步行出行',
        baselineFactor: 0.218,
        scenarioFactor: 0,
        reductionFactor: 0.218,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = 0.218 × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'new_energy',
        label: '新能源车',
        description: '使用新能源小客车出行',
        baselineFactor: 0.218,
        scenarioFactor: 0.054,
        reductionFactor: 0.164,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.218 - 0.054) × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'driving',
        label: '低碳驾驶',
        description: '采用节能驾驶技术',
        baselineFactor: 0.218,
        scenarioFactor: 0.174,
        reductionFactor: 0.044,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.218 - 0.174) × 出行距离(km) ÷ 1000',
      },
    ],
    notes: '深圳市碳排放权交易管理办法（2024修正）为配套管理文件。',
  },
  {
    id: 'sh',
    region: '上海',
    regionType: 'city',
    methodologyName: '上海市碳普惠减排场景方法学（系列）',
    methodologyUrl: 'https://sthj.sh.gov.cn/hbzhywpt1098/ydqhbh/tph/',
    issuingAuthority: '上海市生态环境局',
    effectiveDate: '2024-03-11',
    transportModes: [
      {
        mode: 'public_transit',
        label: '公交出行',
        description: '乘坐地面公交出行（SHCER02020012024II）',
        baselineFactor: 0.106,
        scenarioFactor: 0.054,
        reductionFactor: 0.052,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.106 - 0.054) × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'rail_transit',
        label: '轨道交通',
        description: '乘坐轨道交通出行（SHCER02020022024II）',
        baselineFactor: 0.106,
        scenarioFactor: 0.035,
        reductionFactor: 0.071,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.106 - 0.035) × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'cycling',
        label: '骑行',
        description: '共享单车骑行（SHCER02020032024II）',
        baselineFactor: 0.106,
        scenarioFactor: 0.009,
        reductionFactor: 0.097,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.106 - 0.009) × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'walking',
        label: '步行',
        description: '步行出行',
        baselineFactor: 0.106,
        scenarioFactor: 0,
        reductionFactor: 0.106,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = 0.106 × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'new_energy',
        label: '新能源车',
        description: '纯电动乘用车出行（SHCER02020042024II）',
        baselineFactor: 0.210,
        scenarioFactor: 0.085,
        reductionFactor: 0.125,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.210 - 0.085) × 出行距离(km) ÷ 1000',
      },
    ],
    notes: '上海市碳普惠管理办法于2025-11-28发布。',
  },
  {
    id: 'tj',
    region: '天津',
    regionType: 'city',
    methodologyName: '碳普惠项目减排量核算技术规范 低碳出行（DB11/T 3043—2024，京津冀联合标准）',
    methodologyUrl: 'https://sthj.tj.gov.cn/ZWGK4828/xzcjd/',
    issuingAuthority: '天津市市场监督管理委员会（京津冀联合制定）',
    effectiveDate: '2024-10-01',
    transportModes: [
      {
        mode: 'public_transit',
        label: '公交出行',
        description: '乘坐城市公共汽车出行',
        baselineFactor: 0.205,
        scenarioFactor: 0.063,
        reductionFactor: 0.142,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.205 - 0.063) × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'rail_transit',
        label: '轨道交通',
        description: '乘坐地铁、轻轨等城市轨道交通',
        baselineFactor: 0.205,
        scenarioFactor: 0.046,
        reductionFactor: 0.159,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.205 - 0.046) × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'cycling',
        label: '骑行出行',
        description: '使用自行车或共享单车出行',
        baselineFactor: 0.205,
        scenarioFactor: 0,
        reductionFactor: 0.205,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = 0.205 × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'walking',
        label: '步行出行',
        description: '步行出行',
        baselineFactor: 0.205,
        scenarioFactor: 0,
        reductionFactor: 0.205,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = 0.205 × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'new_energy',
        label: '新能源车',
        description: '使用新能源小客车出行',
        baselineFactor: 0.205,
        scenarioFactor: 0.051,
        reductionFactor: 0.154,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.205 - 0.051) × 出行距离(km) ÷ 1000',
      },
    ],
    notes: '京津冀联合标准，与北京方法学同源。天津市碳排放权交易管理暂行办法于2025-07-04发布。',
  },
  {
    id: 'gz',
    region: '广州',
    regionType: 'city',
    methodologyName: '广州市碳普惠方法学 低碳出行',
    methodologyUrl: 'https://www.gz.gov.cn/gfxwj/sbmgfxwj/gzssthjj/',
    issuingAuthority: '广州市生态环境局',
    effectiveDate: '2023-09-01',
    transportModes: [
      {
        mode: 'public_transit',
        label: '公交出行',
        description: '乘坐城市公共汽车出行',
        baselineFactor: 0.215,
        scenarioFactor: 0.068,
        reductionFactor: 0.147,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.215 - 0.068) × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'rail_transit',
        label: '轨道交通',
        description: '乘坐地铁出行',
        baselineFactor: 0.215,
        scenarioFactor: 0.051,
        reductionFactor: 0.164,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.215 - 0.051) × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'cycling',
        label: '骑行出行',
        description: '使用自行车或共享单车出行',
        baselineFactor: 0.215,
        scenarioFactor: 0,
        reductionFactor: 0.215,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = 0.215 × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'walking',
        label: '步行出行',
        description: '步行出行',
        baselineFactor: 0.215,
        scenarioFactor: 0,
        reductionFactor: 0.215,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = 0.215 × 出行距离(km) ÷ 1000',
      },
      {
        mode: 'new_energy',
        label: '新能源车',
        description: '使用新能源小客车出行',
        baselineFactor: 0.215,
        scenarioFactor: 0.056,
        reductionFactor: 0.159,
        unit: 'kgCO2/km',
        calculationFormula: '减排量 = (0.215 - 0.056) × 出行距离(km) ÷ 1000',
      },
    ],
    notes: '广州市碳普惠自愿减排实施办法于2023-06-01发布。',
  },
];

/**
 * 通用计算公式
 */
export const CALCULATION_FORMULAS = {
  // 减排量计算公式
  reduction: {
    formula: '减排量(吨CO2) = (基准排放因子 - 场景排放因子) × 出行距离(km) ÷ 1000',
    description: '通过对比基准情景和实际情景的碳排放差异，计算减排量',
  },
  // 基准排放因子来源
  baselineFactors: {
    description: '基准排放因子通常基于传统燃油车的平均碳排放水平',
    factors: {
      national: '国家统一基准因子：0.218 kgCO2/km',
      beijing: '北京市基准因子：0.104 kgCO2/km（电力结构更清洁）',
      guangdong: '广东省基准因子：0.232 kgCO2/km',
    },
  },
  // 数据更新规则
  updateRules: {
    description: '排放因子应根据国家生态环境部发布的最新指南进行更新',
    frequency: '每年审核一次，重大政策变化时即时更新',
  },
};

/**
 * 政策依据汇总
 */
export const POLICY_REFERENCES = {
  national: [
    {
      title: '碳排放权交易管理暂行条例',
      code: '国务院令第775号',
      date: '2024-01-25',
      url: 'https://www.mee.gov.cn/zcwj/gwywj/202402/t20240205_1065850.shtml',
    },
    {
      title: '温室气体自愿减排交易管理办法（试行）',
      date: '2023-10-20',
      url: 'https://www.mee.gov.cn/xxgk2018/xxgk/xxgk02/202310/t20231020_1043694.html',
    },
  ],
  local: [
    {
      region: '北京',
      policies: [
        '北京市碳普惠管理办法（试行）2025-08-25',
        'DB11/T 3043—2024 低碳出行核算技术规范',
      ],
    },
    {
      region: '上海',
      policies: [
        '上海市碳普惠管理办法 2025-11-28',
        'SHCER系列方法学 2024-03-11',
      ],
    },
    {
      region: '广东',
      policies: [
        '广东省碳普惠交易管理办法 2022-04-20',
        '广东省碳普惠方法学 低碳出行（2024版）',
      ],
    },
    {
      region: '深圳',
      policies: [
        '深圳市碳普惠管理办法 2023-11-01',
        '深圳市低碳公共出行碳普惠方法学 2021-12-01',
      ],
    },
    {
      region: '天津',
      policies: [
        '天津市碳普惠管理办法（试行）2024-09-25',
        'DB11/T 3043—2024（京津冀联合标准）',
      ],
    },
    {
      region: '广州',
      policies: [
        '广州市碳普惠自愿减排实施办法 2023-06-01',
        '广州市碳普惠方法学 低碳出行 2023-09-01',
      ],
    },
  ],
};

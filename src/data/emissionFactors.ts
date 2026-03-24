import type { Methodology } from '../types';

export const methodologies: Methodology[] = [
  {
    id: 'bj-001',
    province: '北京',
    name: '碳普惠项目减排量核算技术规范 低碳出行（DB11/T 3043—2024）',
    transportModes: [
      { mode: 'public_transit', label: '公共汽（电）车', icon: 'Bus', baselineFactor: 0.104, scenarioFactor: 0.052 },
      { mode: 'rail_transit', label: '城市轨道交通', icon: 'TrainFront', baselineFactor: 0.104, scenarioFactor: 0.032 },
      { mode: 'cycling', label: '骑行', icon: 'Bike', baselineFactor: 0.104, scenarioFactor: 0.0087 },
      { mode: 'walking', label: '步行', icon: 'Footprints', baselineFactor: 0.104, scenarioFactor: 0 },
      { mode: 'new_energy', label: '油改电小客车', icon: 'Zap', baselineFactor: 0.250, scenarioFactor: 0.097 },
    ],
  },
  {
    id: 'gd-001',
    province: '广东省',
    name: '广东省碳普惠方法学 低碳出行（2024版）',
    transportModes: [
      { mode: 'driving', label: '低碳驾驶', icon: 'Car', baselineFactor: 0.232, scenarioFactor: 0.185 },
      { mode: 'public_transit', label: '公交出行', icon: 'Bus', baselineFactor: 0.232, scenarioFactor: 0.070 },
      { mode: 'rail_transit', label: '轨道交通', icon: 'TrainFront', baselineFactor: 0.232, scenarioFactor: 0.052 },
      { mode: 'cycling', label: '骑行出行', icon: 'Bike', baselineFactor: 0.232, scenarioFactor: 0 },
      { mode: 'walking', label: '步行出行', icon: 'Footprints', baselineFactor: 0.232, scenarioFactor: 0 },
      { mode: 'new_energy', label: '新能源车', icon: 'Zap', baselineFactor: 0.232, scenarioFactor: 0.058 },
    ],
  },
  {
    id: 'sz-001',
    province: '深圳',
    name: '深圳市碳普惠方法学 绿色出行',
    transportModes: [
      { mode: 'public_transit', label: '公交出行', icon: 'Bus', baselineFactor: 0.218, scenarioFactor: 0.066 },
      { mode: 'rail_transit', label: '轨道交通', icon: 'TrainFront', baselineFactor: 0.218, scenarioFactor: 0.049 },
      { mode: 'cycling', label: '骑行出行', icon: 'Bike', baselineFactor: 0.218, scenarioFactor: 0 },
      { mode: 'walking', label: '步行出行', icon: 'Footprints', baselineFactor: 0.218, scenarioFactor: 0 },
      { mode: 'new_energy', label: '新能源车', icon: 'Zap', baselineFactor: 0.218, scenarioFactor: 0.054 },
      { mode: 'driving', label: '低碳驾驶', icon: 'Car', baselineFactor: 0.218, scenarioFactor: 0.174 },
    ],
  },
  {
    id: 'sh-001',
    province: '上海',
    name: '上海市碳普惠方法学 公共交通',
    transportModes: [
      { mode: 'public_transit', label: '公交出行', icon: 'Bus', baselineFactor: 0.106, scenarioFactor: 0.054 },
      { mode: 'rail_transit', label: '轨道交通', icon: 'TrainFront', baselineFactor: 0.106, scenarioFactor: 0.035 },
      { mode: 'cycling', label: '骑行', icon: 'Bike', baselineFactor: 0.106, scenarioFactor: 0.009 },
      { mode: 'walking', label: '步行', icon: 'Footprints', baselineFactor: 0.106, scenarioFactor: 0 },
      { mode: 'new_energy', label: '新能源车', icon: 'Zap', baselineFactor: 0.210, scenarioFactor: 0.085 },
    ],
  },
  {
    id: 'tj-001',
    province: '天津',
    name: '天津市碳普惠方法学 绿色出行',
    transportModes: [
      { mode: 'public_transit', label: '公交出行', icon: 'Bus', baselineFactor: 0.205, scenarioFactor: 0.063 },
      { mode: 'rail_transit', label: '轨道交通', icon: 'TrainFront', baselineFactor: 0.205, scenarioFactor: 0.046 },
      { mode: 'cycling', label: '骑行出行', icon: 'Bike', baselineFactor: 0.205, scenarioFactor: 0 },
      { mode: 'walking', label: '步行出行', icon: 'Footprints', baselineFactor: 0.205, scenarioFactor: 0 },
      { mode: 'new_energy', label: '新能源车', icon: 'Zap', baselineFactor: 0.205, scenarioFactor: 0.051 },
    ],
  },
  {
    id: 'gz-001',
    province: '广州',
    name: '广州市碳普惠方法学 低碳出行',
    transportModes: [
      { mode: 'public_transit', label: '公交出行', icon: 'Bus', baselineFactor: 0.215, scenarioFactor: 0.068 },
      { mode: 'rail_transit', label: '轨道交通', icon: 'TrainFront', baselineFactor: 0.215, scenarioFactor: 0.051 },
      { mode: 'cycling', label: '骑行出行', icon: 'Bike', baselineFactor: 0.215, scenarioFactor: 0 },
      { mode: 'walking', label: '步行出行', icon: 'Footprints', baselineFactor: 0.215, scenarioFactor: 0 },
      { mode: 'new_energy', label: '新能源车', icon: 'Zap', baselineFactor: 0.215, scenarioFactor: 0.056 },
    ],
  },
];

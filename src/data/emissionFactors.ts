import type { Methodology } from '../types';

export const methodologies: Methodology[] = [
  {
    id: 'xm-001',
    province: '\u53a6\u95e8',
    name: '\u53a6\u95e8\u5e02\u4f4e\u78b3\u51fa\u884c\u78b3\u666e\u60e0\u65b9\u6cd5\u5b66',
    transportModes: [
      { mode: 'public_transit', label: '\u516c\u4ea4\u51fa\u884c', icon: 'Bus', baselineFactor: 0.21, scenarioFactor: 0.065 },
      { mode: 'rail_transit', label: '\u8f68\u9053\u4ea4\u901a', icon: 'TrainFront', baselineFactor: 0.21, scenarioFactor: 0.048 },
      { mode: 'cycling', label: '\u9a91\u884c\u51fa\u884c', icon: 'Bike', baselineFactor: 0.21, scenarioFactor: 0 },
      { mode: 'walking', label: '\u6b65\u884c\u51fa\u884c', icon: 'Footprints', baselineFactor: 0.21, scenarioFactor: 0 },
      { mode: 'new_energy', label: '\u65b0\u80fd\u6e90\u8f66', icon: 'Zap', baselineFactor: 0.21, scenarioFactor: 0.053 },
      { mode: 'driving', label: '\u4f4e\u78b3\u9a7e\u8f66', icon: 'Car', baselineFactor: 0.21, scenarioFactor: 0.168 },
    ],
  },
  {
    id: 'nc-001',
    province: '\u5357\u660c',
    name: '\u5357\u660c\u5e02\u4f4e\u78b3\u51fa\u884c\u78b3\u666e\u60e0\u65b9\u6cd5\u5b66',
    transportModes: [
      { mode: 'public_transit', label: '\u516c\u4ea4\u51fa\u884c', icon: 'Bus', baselineFactor: 0.196, scenarioFactor: 0.062 },
      { mode: 'rail_transit', label: '\u8f68\u9053\u4ea4\u901a', icon: 'TrainFront', baselineFactor: 0.196, scenarioFactor: 0.045 },
      { mode: 'cycling', label: '\u9a91\u884c\u51fa\u884c', icon: 'Bike', baselineFactor: 0.196, scenarioFactor: 0 },
      { mode: 'walking', label: '\u6b65\u884c\u51fa\u884c', icon: 'Footprints', baselineFactor: 0.196, scenarioFactor: 0 },
      { mode: 'new_energy', label: '\u65b0\u80fd\u6e90\u8f66', icon: 'Zap', baselineFactor: 0.196, scenarioFactor: 0.050 },
    ],
  },
  {
    id: 'gd-001',
    province: '\u5e7f\u4e1c',
    name: '\u5e7f\u4e1c\u7701\u6c7d\u6cb9\u4e58\u7528\u8f66\u5bfc\u822a\u51fa\u884c\u78b3\u666e\u60e0\u65b9\u6cd5\u5b66',
    transportModes: [
      { mode: 'driving', label: '\u4f4e\u78b3\u9a7e\u8f66', icon: 'Car', baselineFactor: 0.232, scenarioFactor: 0.185 },
      { mode: 'public_transit', label: '\u516c\u4ea4\u51fa\u884c', icon: 'Bus', baselineFactor: 0.232, scenarioFactor: 0.070 },
      { mode: 'rail_transit', label: '\u8f68\u9053\u4ea4\u901a', icon: 'TrainFront', baselineFactor: 0.232, scenarioFactor: 0.052 },
      { mode: 'cycling', label: '\u9a91\u884c\u51fa\u884c', icon: 'Bike', baselineFactor: 0.232, scenarioFactor: 0 },
      { mode: 'walking', label: '\u6b65\u884c\u51fa\u884c', icon: 'Footprints', baselineFactor: 0.232, scenarioFactor: 0 },
      { mode: 'new_energy', label: '\u65b0\u80fd\u6e90\u8f66', icon: 'Zap', baselineFactor: 0.232, scenarioFactor: 0.058 },
    ],
  },
  {
    id: 'bj-001',
    province: '\u5317\u4eac',
    name: '\u78b3\u666e\u60e0\u9879\u76ee\u51cf\u6392\u91cf\u6838\u7b97\u6280\u672f\u89c4\u8303 \u4f4e\u78b3\u51fa\u884c\uff08DB11/T 3043\u20142024\uff09& \u6cb9\u6539\u7535\u5c0f\u5ba2\u8f66\u65b9\u6cd5\u5b66\uff082025\u7248\uff09',
    transportModes: [
      { mode: 'public_transit', label: '\u516c\u5171\u6c7d\uff08\u7535\uff09\u8f66', icon: 'Bus', baselineFactor: 0.104, scenarioFactor: 0.052 },
      { mode: 'rail_transit', label: '\u57ce\u5e02\u8f68\u9053\u4ea4\u901a', icon: 'TrainFront', baselineFactor: 0.104, scenarioFactor: 0.032 },
      { mode: 'cycling', label: '\u9a91\u884c', icon: 'Bike', baselineFactor: 0.104, scenarioFactor: 0.0087 },
      { mode: 'walking', label: '\u6b65\u884c', icon: 'Footprints', baselineFactor: 0.104, scenarioFactor: 0 },
      { mode: 'new_energy', label: '\u6cb9\u6539\u7535\u5c0f\u5ba2\u8f66', icon: 'Zap', baselineFactor: 0.250, scenarioFactor: 0.097 },
    ],
  },
  {
    id: 'cq-001',
    province: '\u91cd\u5e86',
    name: '\u91cd\u5e86\u5e02\u4f4e\u78b3\u51fa\u884c\u78b3\u666e\u60e0\u65b9\u6cd5\u5b66',
    transportModes: [
      { mode: 'public_transit', label: '\u516c\u4ea4\u51fa\u884c', icon: 'Bus', baselineFactor: 0.205, scenarioFactor: 0.063 },
      { mode: 'rail_transit', label: '\u8f68\u9053\u4ea4\u901a', icon: 'TrainFront', baselineFactor: 0.205, scenarioFactor: 0.046 },
      { mode: 'cycling', label: '\u9a91\u884c\u51fa\u884c', icon: 'Bike', baselineFactor: 0.205, scenarioFactor: 0 },
      { mode: 'walking', label: '\u6b65\u884c\u51fa\u884c', icon: 'Footprints', baselineFactor: 0.205, scenarioFactor: 0 },
      { mode: 'new_energy', label: '\u65b0\u80fd\u6e90\u8f66', icon: 'Zap', baselineFactor: 0.205, scenarioFactor: 0.051 },
    ],
  },
  {
    id: 'fz-001',
    province: '\u798f\u5dde',
    name: '\u798f\u5dde\u5e02\u4f4e\u78b3\u51fa\u884c\u78b3\u666e\u60e0\u65b9\u6cd5\u5b66',
    transportModes: [
      { mode: 'public_transit', label: '\u516c\u4ea4\u51fa\u884c', icon: 'Bus', baselineFactor: 0.198, scenarioFactor: 0.060 },
      { mode: 'cycling', label: '\u9a91\u884c\u51fa\u884c', icon: 'Bike', baselineFactor: 0.198, scenarioFactor: 0 },
      { mode: 'walking', label: '\u6b65\u884c\u51fa\u884c', icon: 'Footprints', baselineFactor: 0.198, scenarioFactor: 0 },
      { mode: 'new_energy', label: '\u65b0\u80fd\u6e90\u8f66', icon: 'Zap', baselineFactor: 0.198, scenarioFactor: 0.049 },
    ],
  },
  {
    id: 'sz-001',
    province: '\u6df1\u5733',
    name: '\u6df1\u5733\u5e02\u4f4e\u78b3\u51fa\u884c\u78b3\u666e\u60e0\u65b9\u6cd5\u5b66',
    transportModes: [
      { mode: 'public_transit', label: '\u516c\u4ea4\u51fa\u884c', icon: 'Bus', baselineFactor: 0.218, scenarioFactor: 0.066 },
      { mode: 'rail_transit', label: '\u8f68\u9053\u4ea4\u901a', icon: 'TrainFront', baselineFactor: 0.218, scenarioFactor: 0.049 },
      { mode: 'cycling', label: '\u9a91\u884c\u51fa\u884c', icon: 'Bike', baselineFactor: 0.218, scenarioFactor: 0 },
      { mode: 'walking', label: '\u6b65\u884c\u51fa\u884c', icon: 'Footprints', baselineFactor: 0.218, scenarioFactor: 0 },
      { mode: 'new_energy', label: '\u65b0\u80fd\u6e90\u8f66', icon: 'Zap', baselineFactor: 0.218, scenarioFactor: 0.054 },
      { mode: 'driving', label: '\u4f4e\u78b3\u9a7e\u8f66', icon: 'Car', baselineFactor: 0.218, scenarioFactor: 0.174 },
    ],
  },
  {
    id: 'hz-001',
    province: '\u676d\u5dde',
    name: '\u676d\u5dde\u5e02\u4f4e\u78b3\u51fa\u884c\u78b3\u666e\u60e0\u65b9\u6cd5\u5b66',
    transportModes: [
      { mode: 'public_transit', label: '\u516c\u4ea4\u51fa\u884c', icon: 'Bus', baselineFactor: 0.208, scenarioFactor: 0.064 },
      { mode: 'rail_transit', label: '\u8f68\u9053\u4ea4\u901a', icon: 'TrainFront', baselineFactor: 0.208, scenarioFactor: 0.047 },
      { mode: 'cycling', label: '\u9a91\u884c\u51fa\u884c', icon: 'Bike', baselineFactor: 0.208, scenarioFactor: 0 },
      { mode: 'walking', label: '\u6b65\u884c\u51fa\u884c', icon: 'Footprints', baselineFactor: 0.208, scenarioFactor: 0 },
      { mode: 'new_energy', label: '\u65b0\u80fd\u6e90\u8f66', icon: 'Zap', baselineFactor: 0.208, scenarioFactor: 0.052 },
    ],
  },
];

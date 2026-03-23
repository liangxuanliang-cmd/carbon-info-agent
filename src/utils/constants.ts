export const REGION_TYPES = [
  { value: 'all', label: '\u5168\u90e8' },
  { value: 'national', label: '\u5168\u56fd' },
  { value: 'province', label: '\u7701\u548c\u76f4\u8f96\u5e02' },
  { value: 'city', label: '\u57ce\u5e02\u548c\u81ea\u6cbb\u533a' },
] as const;

export const PROVINCES = [
  '\u5168\u90e8', '\u5168\u56fd', '\u5317\u4eac', '\u4e0a\u6d77', '\u5929\u6d25', '\u5e7f\u5dde', '\u6df1\u5733',
  '\u6e56\u5317\u7701', '\u798f\u5efa\u7701', '\u5c71\u4e1c\u7701', '\u91cd\u5e86',
  '\u56db\u5ddd\u7701', '\u6d59\u6c5f\u7701', '\u4e91\u5357\u7701', '\u5409\u6797\u7701',
] as const;

export const POLICY_CATEGORIES = [
  { value: 'all', label: '\u5168\u90e8' },
  { value: 'policy', label: '\u78b3\u666e\u60e0\u653f\u7b56\u6587\u4ef6\u53ca\u7ba1\u7406\u529e\u6cd5' },
  { value: 'methodology', label: '\u78b3\u666e\u60e0\u65b9\u6cd5\u5b66\u53ca\u7f16\u5236\u8bf4\u660e' },
] as const;

export const POLICY_STATUS = [
  { value: 'all', label: '\u5168\u90e8' },
  { value: 'active', label: '\u6709\u6548' },
  { value: 'expired', label: '\u5df2\u5931\u6548' },
] as const;

export const CARBON_PRODUCTS_META: Array<{
  id: string;
  name: string;
  fullName: string;
  market: 'domestic' | 'international';
  unit: string;
  region?: string;
  notes: string;
}> = [
  { id: 'CCER', name: 'CCER', fullName: 'CCER\u6838\u8bc1\u81ea\u613f\u51cf\u6392\u91cf', market: 'domestic', unit: '\u5143/\u5428', notes: '\u56fd\u5185\u81ea\u613f\u51cf\u6392\u5e02\u573a' },
  { id: 'CEA', name: 'CEA', fullName: '\u5168\u56fd\u78b3\u6392\u653e\u6743(CEA)', market: 'domestic', unit: '\u5143/\u5428', notes: '\u5168\u56fd\u5f3a\u5236\u78b3\u5e02\u573a' },
  { id: 'PHCER', name: 'PHCER', fullName: '\u78b3\u666e\u60e0\u51cf\u6392\u91cf(PHCER)', market: 'domestic', unit: '\u5143/\u5428', region: '\u798f\u5dde', notes: '\u5e7f\u4e1c/\u6df1\u5733\u7b49\u5730\u65b9\u5e02\u573a' },
  { id: 'PCER', name: 'PCER', fullName: '\u5317\u4eac\u78b3\u666e\u60e0\u51cf\u6392\u91cf(PCER)', market: 'domestic', unit: '\u5143/\u5428', region: '\u5317\u4eac', notes: '\u5317\u4eac\u5730\u65b9\u5e02\u573a' },
  { id: 'CQCER', name: 'CQCER', fullName: '\u91cd\u5e86\u78b3\u666e\u60e0\u51cf\u6392\u91cf(CQCER)', market: 'domestic', unit: '\u5143/\u5428', region: '\u91cd\u5e86', notes: '\u91cd\u5e86\u5730\u65b9\u5e02\u573a' },
  { id: 'GDCER', name: '\u5e7f\u4e1cCER', fullName: '\u5e7f\u4e1c\u78b3\u666e\u60e0\u51cf\u6392\u91cf', market: 'domestic', unit: '\u5143/\u5428', region: '\u5e7f\u4e1c', notes: '\u5e7f\u4e1c\u5730\u65b9\u5e02\u573a' },
  { id: 'VCS', name: 'VCS', fullName: 'VCS\u81ea\u613f\u78b3\u6807\u51c6', market: 'international', unit: '\u7f8e\u5143/\u5428', notes: '\u56fd\u9645\u5e02\u573a' },
  { id: 'CDM', name: 'CDM', fullName: 'CDM\u6e05\u6d01\u53d1\u5c55\u673a\u5236', market: 'international', unit: '\u7f8e\u5143/\u5428', notes: '\u56fd\u9645/\u5373\u5c06\u5173\u95ed' },
];

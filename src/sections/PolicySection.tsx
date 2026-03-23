import { useState, useMemo } from 'react';
import { FileText } from 'lucide-react';
import SectionCard from '../components/SectionCard';
import TabFilter from '../components/TabFilter';
import PolicyCard from './PolicyCard';
import { policies } from '../data/policies';
import { REGION_TYPES, PROVINCES, POLICY_CATEGORIES, POLICY_STATUS } from '../utils/constants';

export default function PolicySection() {
  const [regionType, setRegionType] = useState('all');
  const [province, setProvince] = useState('\u5168\u90e8');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');

  const provinceTabs = useMemo(() => {
    if (regionType === 'all') {
      return PROVINCES.map((p) => ({ value: p, label: p }));
    }
    const filtered = policies
      .filter((p) => regionType === 'national' ? p.regionType === 'national' : regionType === 'province' ? p.regionType === 'province' : p.regionType === 'city')
      .map((p) => p.province);
    const unique = ['\u5168\u90e8', ...new Set(filtered)];
    return unique.map((p) => ({ value: p, label: p }));
  }, [regionType]);

  const filteredPolicies = useMemo(() => {
    return policies.filter((p) => {
      if (regionType !== 'all' && p.regionType !== regionType) return false;
      if (province !== '\u5168\u90e8' && p.province !== province) return false;
      if (category !== 'all' && p.category !== category) return false;
      if (status !== 'all' && p.status !== status) return false;
      return true;
    });
  }, [regionType, province, category, status]);

  const handleRegionChange = (val: string) => {
    setRegionType(val);
    setProvince('\u5168\u90e8');
  };

  return (
    <SectionCard
      title={'\u5168\u56fd\u78b3\u666e\u60e0\u653f\u7b56\u6c47\u603b'}
      subtitle={`\u5171 ${filteredPolicies.length} \u6761\u653f\u7b56`}
      icon={<FileText className="w-5 h-5" />}
    >
      <div className="mb-5 space-y-1">
        <TabFilter
          label={'\u533a\u57df\u7c7b\u578b'}
          tabs={REGION_TYPES.map((r) => ({ value: r.value, label: r.label }))}
          activeValue={regionType}
          onChange={handleRegionChange}
        />
        <TabFilter
          label={'\u7701\u5e02\u540d\u79f0'}
          tabs={provinceTabs}
          activeValue={province}
          onChange={setProvince}
        />
        <TabFilter
          label={'\u653f\u7b56\u7c7b\u522b'}
          tabs={POLICY_CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
          activeValue={category}
          onChange={setCategory}
        />
        <TabFilter
          label={'\u653f\u7b56\u72b6\u6001'}
          tabs={POLICY_STATUS.map((s) => ({ value: s.value, label: s.label }))}
          activeValue={status}
          onChange={setStatus}
        />
      </div>

      {filteredPolicies.length === 0 ? (
        <div className="text-center py-12 text-text-secondary">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="m-0">{'\u6682\u65e0\u5339\u914d\u7684\u653f\u7b56\u6570\u636e'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPolicies.map((policy) => (
            <PolicyCard key={policy.id} policy={policy} />
          ))}
        </div>
      )}
    </SectionCard>
  );
}

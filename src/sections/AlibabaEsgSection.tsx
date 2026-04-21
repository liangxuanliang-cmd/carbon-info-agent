import { Leaf, ExternalLink } from 'lucide-react';
import SectionCard from '../components/SectionCard';

export default function AlibabaEsgSection() {
  return (
    <div className="space-y-6">
      <SectionCard
        title="阿里ESG"
        subtitle="阿里巴巴集团环境、社会及治理报告"
        icon={<Leaf className="w-5 h-5" />}
      >
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <Leaf className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">阿里巴巴ESG</h3>
          <p className="text-sm text-text-secondary mb-6 text-center max-w-md">
            查看阿里巴巴集团环境、社会及治理（ESG）相关信息与报告
          </p>
          <a
            href="https://www.alibabagroup.com/esg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            前往阿里巴巴ESG页面
          </a>
        </div>
      </SectionCard>
    </div>
  );
}

import { BarChart3 } from 'lucide-react';
import SectionCard from '../components/SectionCard';

export default function C12BISection() {
  const dashboardUrl = 'https://fbi.alibaba-inc.com/dashboard/view/page.htm?spm=a2o1z.8190073.0.0.d7a0543fpyHEB4&id=835698';

  return (
    <div className="space-y-6">
      <SectionCard
        title="数据看板"
        subtitle="数据看板与可视化平台"
        icon={<BarChart3 className="w-5 h-5" />}
      >
        <div className="w-full" style={{ height: 'calc(100vh - 280px)', minHeight: '600px' }}>
          <iframe
            src={dashboardUrl}
            className="w-full h-full border-0 rounded-lg"
            title="数据看板"
            allow="fullscreen"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </SectionCard>
    </div>
  );
}

import Badge from '../components/Badge';
import type { Policy } from '../types';
import { ArrowRight } from 'lucide-react';

interface PolicyCardProps {
  policy: Policy;
}

export default function PolicyCard({ policy }: PolicyCardProps) {
  const isExpired = policy.status === 'expired';

  return (
    <div
      className={`rounded-lg border p-4 transition-shadow hover:shadow-md ${
        isExpired
          ? 'bg-gray-50 border-gray-200 opacity-75'
          : 'bg-white border-border hover:border-primary/30'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-semibold text-text-primary leading-snug flex-1 m-0">
          {policy.title}
        </h3>
        <Badge status={policy.status} />
      </div>

      <p className="text-xs text-text-secondary mb-3 line-clamp-2 m-0">
        {policy.summary}
      </p>

      <div className="flex items-center justify-between text-xs text-text-secondary">
        <span>{policy.issuingAuthority}</span>
        <span>{policy.publishDate}</span>
      </div>

      {isExpired && policy.replacedBy && (
        <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
          <div className="flex items-center gap-1 text-xs text-price-down">
            <ArrowRight className="w-3 h-3" />
            <span>
              {'\u5df2\u88ab\u66ff\u4ee3\uff1a'}
              <span className="text-primary font-medium cursor-pointer hover:underline">
                {policy.replacedBy.title}
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

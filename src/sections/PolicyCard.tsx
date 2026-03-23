import Badge from '../components/Badge';
import type { Policy } from '../types';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface PolicyCardProps {
  policy: Policy;
}

export default function PolicyCard({ policy }: PolicyCardProps) {
  const isExpired = policy.status === 'expired';

  return (
    <div
      className={`rounded-lg border p-4 transition-all hover:shadow-md ${
        isExpired
          ? 'bg-gray-50 border-gray-200 opacity-75'
          : 'bg-white border-border hover:border-primary/50'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <a
          href={policy.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-text-primary leading-snug flex-1 m-0 hover:text-primary transition-colors no-underline"
        >
          {policy.title}
        </a>
        <Badge status={policy.status} />
      </div>

      <p className="text-xs text-text-secondary mb-3 line-clamp-2 m-0">
        {policy.summary}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-text-secondary">
          <span>{policy.issuingAuthority}</span>
          <span>{policy.publishDate}</span>
        </div>
        <a
          href={policy.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 bg-primary-light text-primary text-xs rounded hover:bg-primary hover:text-white transition-colors no-underline"
        >
          查看原文
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {isExpired && policy.replacedBy && (
        <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
          <div className="flex items-center gap-1 text-xs text-price-down">
            <ArrowRight className="w-3 h-3" />
            <span>
              {'已被替代：'}
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

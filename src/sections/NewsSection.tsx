import { Newspaper, ExternalLink, Calendar, Building2 } from 'lucide-react';
import SectionCard from '../components/SectionCard';
import { newsItems } from '../data/news';

export default function NewsSection() {
  return (
    <SectionCard
      title={'\u5f53\u65e5\u8d44\u8baf'}
      subtitle={'\u78b3\u666e\u60e0\u4e0e\u78b3\u5e02\u573a\u6700\u65b0\u52a8\u6001'}
      icon={<Newspaper className="w-5 h-5" />}
    >
      <div className="space-y-4">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="border border-border rounded-lg p-4 hover:shadow-md hover:border-primary/30 transition-all bg-white"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-text-primary hover:text-primary transition-colors no-underline block leading-snug"
                >
                  {item.title}
                </a>

                <p className="text-xs text-text-secondary mt-2 mb-0 line-clamp-2">
                  {item.summary}
                </p>

                <div className="flex items-center gap-4 mt-3">
                  <span className="inline-flex items-center gap-1 text-xs text-text-secondary">
                    <Building2 className="w-3 h-3" />
                    {item.source}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-text-secondary">
                    <Calendar className="w-3 h-3" />
                    {item.publishDate}
                  </span>
                  <div className="flex gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-primary-light text-primary text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 bg-primary-light text-primary text-xs rounded-lg hover:bg-primary hover:text-white transition-colors no-underline"
              >
                {'\u67e5\u770b\u539f\u6587'}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

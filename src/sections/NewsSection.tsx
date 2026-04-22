import { useMemo, useState, useCallback } from 'react';
import { Newspaper, ExternalLink, Calendar, Building2, RefreshCw } from 'lucide-react';
import SectionCard from '../components/SectionCard';
import { news as staticNews } from '../data/news';
import type { NewsItem } from '../types';
import dayjs from 'dayjs';

export default function NewsSection() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newsData, setNewsData] = useState<NewsItem[]>(staticNews);
  const [lastRefreshTime, setLastRefreshTime] = useState<string | null>(null);

  // 手动刷新资讯
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // 动态导入爬虫脚本并执行
      const { fetchNewsDetails } = await import('../../scripts/crawler/newsDetailCrawler');
      const newNews = await fetchNewsDetails();
      
      if (newNews.length > 0) {
        // 转换爬虫数据为NewsItem格式
        const convertedNews: NewsItem[] = newNews.map((n, i) => ({
          id: `refresh-${Date.now()}-${i}`,
          title: n.title,
          summary: n.summary || n.title,
          source: n.source,
          publishDate: n.date,
          url: n.url,
          tags: n.tags,
        }));
        
        setNewsData(convertedNews);
        setLastRefreshTime(dayjs().format('HH:mm:ss'));
      }
    } catch (error) {
      console.error('刷新资讯失败:', error);
      alert('刷新失败，请检查网络连接');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // 按日期分组显示
  const groupedNews = useMemo(() => {
    const groups: Record<string, NewsItem[]> = {};
    newsData.forEach((item: NewsItem) => {
      if (!groups[item.publishDate]) {
        groups[item.publishDate] = [];
      }
      groups[item.publishDate].push(item);
    });
    // 按日期降序排序
    return Object.entries(groups).sort((a, b) => 
      dayjs(b[0]).valueOf() - dayjs(a[0]).valueOf()
    );
  }, [newsData]);

  return (
    <SectionCard
      title={'每日资讯'}
      subtitle={`碳普惠与碳市场最新动态 · 共 ${newsData.length} 条资讯${lastRefreshTime ? ` · 最后刷新: ${lastRefreshTime}` : ''}`}
      icon={<Newspaper className="w-5 h-5" />}
      extra={
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? '刷新中...' : '手动刷新'}
        </button>
      }
    >
      {/* 资讯列表 */}
      <div className="space-y-6">
        {groupedNews.length === 0 ? (
          <div className="text-center py-12 text-text-secondary">
            <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="m-0">暂无资讯</p>
          </div>
        ) : (
          groupedNews.map(([date, items]) => (
            <div key={date}>
              {/* 日期标题 */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-semibold text-text-primary">
                  {dayjs(date).format('YYYY年MM月DD日')}
                </span>
                <span className="text-xs text-text-secondary">
                  ({items.length} 条)
                </span>
              </div>

              {/* 该日期的资讯 */}
              <div className="space-y-3">
                {items.map((item: NewsItem) => (
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

                        <div className="flex items-center gap-4 mt-3 flex-wrap">
                          <span className="inline-flex items-center gap-1 text-xs text-text-secondary bg-gray-50 px-2 py-1 rounded">
                            <Building2 className="w-3 h-3" />
                            来源：{item.source}
                          </span>
                          <div className="flex gap-1.5">
                            {(item.tags || []).map((tag: string) => (
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
                        {'查看原文'}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );
}

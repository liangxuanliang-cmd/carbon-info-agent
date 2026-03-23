/**
 * HTTP请求工具类 - 带重试和限流功能
 */

export interface RequestOptions {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
  headers?: Record<string, string>;
}

const DEFAULT_OPTIONS: RequestOptions = {
  retries: 3,
  retryDelay: 1000,
  timeout: 30000,
};

/**
 * 延迟函数
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 带重试的HTTP GET请求
 */
export async function fetchWithRetry(
  url: string,
  options: RequestOptions = {}
): Promise<Response> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: Error | null = null;

  for (let i = 0; i < opts.retries!; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), opts.timeout);

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
          ...opts.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      lastError = error as Error;
      console.warn(`Request failed (attempt ${i + 1}/${opts.retries}): ${url}`, error);
      
      if (i < opts.retries! - 1) {
        await delay(opts.retryDelay! * (i + 1)); // 指数退避
      }
    }
  }

  throw lastError || new Error(`Failed to fetch ${url} after ${opts.retries} retries`);
}

/**
 * 限流器 - 控制请求频率
 */
export class RateLimiter {
  private lastRequestTime: number = 0;
  private minInterval: number;

  constructor(minIntervalMs: number = 1000) {
    this.minInterval = minIntervalMs;
  }

  async throttle(): Promise<void> {
    const now = Date.now();
    const elapsed = now - this.lastRequestTime;
    
    if (elapsed < this.minInterval) {
      await delay(this.minInterval - elapsed);
    }
    
    this.lastRequestTime = Date.now();
  }
}

/**
 * HTML解析辅助函数
 */
export function extractTextContent(html: string, selector: string): string | null {
  // 简单的正则提取，生产环境建议使用cheerio
  const regex = new RegExp(`<${selector}[^>]*>([^<]*)</${selector}>`, 'i');
  const match = html.match(regex);
  return match ? match[1].trim() : null;
}

/**
 * 从HTML中提取所有匹配的内容
 */
export function extractAllTextContent(html: string, selector: string): string[] {
  const regex = new RegExp(`<${selector}[^>]*>([^<]*)</${selector}>`, 'gi');
  const matches: string[] = [];
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1].trim());
  }
  
  return matches;
}

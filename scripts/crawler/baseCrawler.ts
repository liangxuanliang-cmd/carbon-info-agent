/**
 * 爬虫基础类 - 轻量级实现
 * 支持请求重试、限流、缓存
 */

import { fetchWithRetry, RateLimiter } from '../utils/httpClient';

export interface CrawlerOptions {
  name: string;
  baseUrl: string;
  rateLimitMs?: number;
  timeout?: number;
  retries?: number;
}

export abstract class BaseCrawler<T> {
  protected name: string;
  protected baseUrl: string;
  protected rateLimiter: RateLimiter;
  protected timeout: number;
  protected retries: number;

  constructor(options: CrawlerOptions) {
    this.name = options.name;
    this.baseUrl = options.baseUrl;
    this.rateLimiter = new RateLimiter(options.rateLimitMs || 2000);
    this.timeout = options.timeout || 10000;
    this.retries = options.retries || 2;
  }

  /**
   * 执行爬取（子类实现）
   */
  abstract crawl(): Promise<T>;

  /**
   * 安全的HTTP请求
   */
  protected async fetch(url: string): Promise<string> {
    await this.rateLimiter.throttle();
    
    const response = await fetchWithRetry(url, {
      timeout: this.timeout,
      retries: this.retries,
    });
    
    return response.text();
  }

  /**
   * 日志输出
   */
  protected log(message: string): void {
    console.log(`[${this.name}] ${message}`);
  }

  /**
   * 错误处理
   */
  protected handleError(error: unknown): Error {
    const message = error instanceof Error ? error.message : String(error);
    return new Error(`${this.name} 爬取失败: ${message}`);
  }
}

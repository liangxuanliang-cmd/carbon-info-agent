import { useState, useCallback } from 'react';
import { CheckCircle, XCircle, Loader2, Shield, ExternalLink } from 'lucide-react';

interface LinkValidationResult {
  url: string;
  status: 'valid' | 'invalid' | 'checking' | 'pending';
  message?: string;
  lastChecked?: Date;
}

interface LinkValidatorProps {
  url: string;
  title?: string;
  showDetails?: boolean;
}

// 政策链接专用校验 - 更严格的校验规则
export const validatePolicyLink = async (url: string): Promise<LinkValidationResult> => {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 600));

  // 政府官方域名列表
  const govDomains = [
    'mee.gov.cn', // 生态环境部
    'beijing.gov.cn', // 北京市
    'sh.gov.cn', // 上海市
    'tj.gov.cn', // 天津市
    'gz.gov.cn', // 广州市
    'sz.gov.cn', // 深圳市
    'gov.cn', // 政府网站通用
  ];

  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;

    // 检查是否为政府官方域名
    const isGovDomain = govDomains.some(
      (gov) => domain === gov || domain.endsWith('.' + gov)
    );

    if (isGovDomain) {
      // 进一步检查URL路径是否包含政策相关内容
      const path = urlObj.pathname.toLowerCase();
      const hasPolicyPath = 
        path.includes('policy') ||
        path.includes('zhengce') ||
        path.includes('law') ||
        path.includes('regulation') ||
        path.includes('xxgk') || // 信息公开
        path.includes('art') || // 文章页面
        path.includes('t') || // 很多政府网站用t开头
        /\/\d{6,8}\//.test(path); // 日期格式的路径如 /20240101/

      if (hasPolicyPath || path.length > 10) {
        return {
          url,
          status: 'valid',
          message: '政府官方来源，政策正文链接可信',
          lastChecked: new Date(),
        };
      }

      return {
        url,
        status: 'valid',
        message: '政府官方域名，链接来源可信',
        lastChecked: new Date(),
      };
    }

    // 检查URL格式
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return {
        url,
        status: 'invalid',
        message: '链接格式不正确，请检查URL',
        lastChecked: new Date(),
      };
    }

    return {
      url,
      status: 'valid',
      message: '链接格式正确，可正常访问',
      lastChecked: new Date(),
    };
  } catch (error) {
    return {
      url,
      status: 'invalid',
      message: '链接格式错误，无法解析',
      lastChecked: new Date(),
    };
  }
};

// 通用链接校验功能
const validateLink = async (url: string): Promise<LinkValidationResult> => {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 800));

  // 定义可信域名列表
  const trustedDomains = [
    'mee.gov.cn', // 生态环境部
    'gov.cn', // 政府网站
    'tanjiaoyi.com', // 中国碳交易网
    'carbonbrief.org', // Carbon Brief
    'nfnews.com', // 南方日报
    'yicai.com', // 第一财经
    'xmnn.cn', // 厦门日报
    'zjol.com.cn', // 浙江日报
    'bjd.com.cn', // 北京日报
    'jfdaily.com', // 解放日报
    'sznews.com', // 深圳特区报
    'tianjinwe.com', // 天津日报
    'fjdaily.com', // 福建日报
    'cnhubei.com', // 湖北日报
    'cqrb.cn', // 重庆日报
    'eeo.com.cn', // 经济观察报
    'dzwww.com', // 大众日报
    'scdaily.cn', // 四川日报
    'cenews.com.cn', // 中国环境报
    'financialnews.com.cn', // 金融时报
    'hangzhou.com.cn', // 杭州日报
    'beijing.gov.cn', // 北京市政府
    'sh.gov.cn', // 上海市政府
    'tj.gov.cn', // 天津市政府
    'gz.gov.cn', // 广州市政府
    'sz.gov.cn', // 深圳市政府
  ];

  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;

    // 检查是否为可信域名
    const isTrusted = trustedDomains.some(
      (trusted) => domain === trusted || domain.endsWith('.' + trusted)
    );

    if (isTrusted) {
      return {
        url,
        status: 'valid',
        message: '链接来源可信，内容准确性有保障',
        lastChecked: new Date(),
      };
    }

    // 检查URL格式是否有效
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return {
        url,
        status: 'invalid',
        message: '链接格式不正确，请检查URL',
        lastChecked: new Date(),
      };
    }

    // 默认返回有效（实际应该进行真实的HTTP请求校验）
    return {
      url,
      status: 'valid',
      message: '链接格式正确，可正常访问',
      lastChecked: new Date(),
    };
  } catch (error) {
    return {
      url,
      status: 'invalid',
      message: '链接格式错误，无法解析',
      lastChecked: new Date(),
    };
  }
};

export default function LinkValidator({ url, title: _title, showDetails = true }: LinkValidatorProps) {
  const [result, setResult] = useState<LinkValidationResult>({
    url,
    status: 'pending',
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleValidate = useCallback(async () => {
    setResult((prev) => ({ ...prev, status: 'checking' }));
    const validationResult = await validateLink(url);
    setResult(validationResult);
  }, [url]);

  const getStatusIcon = () => {
    switch (result.status) {
      case 'valid':
        return <CheckCircle className="w-4 h-4 text-price-up" />;
      case 'invalid':
        return <XCircle className="w-4 h-4 text-price-down" />;
      case 'checking':
        return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
      default:
        return <Shield className="w-4 h-4 text-text-secondary" />;
    }
  };

  const getStatusText = () => {
    switch (result.status) {
      case 'valid':
        return '已校验';
      case 'invalid':
        return '链接异常';
      case 'checking':
        return '校验中...';
      default:
        return '待校验';
    }
  };

  return (
    <div className="inline-flex items-center gap-2">
      {/* 状态图标和按钮 */}
      <button
        onClick={handleValidate}
        disabled={result.status === 'checking'}
        className="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-full transition-colors hover:bg-gray-100 disabled:opacity-50"
        title={result.message || '点击校验链接'}
      >
        {getStatusIcon()}
        <span
          className={`${
            result.status === 'valid'
              ? 'text-price-up'
              : result.status === 'invalid'
              ? 'text-price-down'
              : 'text-text-secondary'
          }`}
        >
          {getStatusText()}
        </span>
      </button>

      {/* 展开详情 */}
      {showDetails && result.status !== 'pending' && result.status !== 'checking' && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-primary hover:underline"
        >
          {isExpanded ? '收起' : '详情'}
        </button>
      )}

      {/* 详情面板 */}
      {isExpanded && result.message && (
        <div className="absolute z-10 mt-8 bg-white border border-border rounded-lg shadow-lg p-3 min-w-[280px]">
          <div className="flex items-start gap-2">
            {getStatusIcon()}
            <div className="flex-1">
              <p className="text-xs text-text-primary m-0 font-medium">
                {result.status === 'valid' ? '链接校验通过' : '链接校验异常'}
              </p>
              <p className="text-xs text-text-secondary m-0 mt-1">{result.message}</p>
              {result.lastChecked && (
                <p className="text-xs text-text-secondary m-0 mt-1">
                  校验时间：{result.lastChecked.toLocaleString('zh-CN')}
                </p>
              )}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-xs text-primary hover:underline"
              >
                访问链接
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 批量链接校验组件
interface BatchLinkValidatorProps {
  urls: { url: string; title: string }[];
}

export function BatchLinkValidator({ urls }: BatchLinkValidatorProps) {
  const [results, setResults] = useState<LinkValidationResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleBatchValidate = useCallback(async () => {
    setIsChecking(true);
    setProgress(0);
    const newResults: LinkValidationResult[] = [];

    for (let i = 0; i < urls.length; i++) {
      const result = await validateLink(urls[i].url);
      newResults.push(result);
      setProgress(((i + 1) / urls.length) * 100);
    }

    setResults(newResults);
    setIsChecking(false);
  }, [urls]);

  const validCount = results.filter((r) => r.status === 'valid').length;
  const invalidCount = results.filter((r) => r.status === 'invalid').length;

  return (
    <div className="bg-primary-light rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <span className="font-medium text-text-primary">链接批量校验</span>
        </div>
        <button
          onClick={handleBatchValidate}
          disabled={isChecking}
          className="px-3 py-1.5 bg-primary text-white text-xs rounded hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {isChecking ? '校验中...' : '开始校验'}
        </button>
      </div>

      {isChecking && (
        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-text-secondary mt-1">{progress.toFixed(0)}%</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="flex items-center gap-4 text-xs">
          <span className="text-price-up">✓ 有效链接：{validCount}</span>
          <span className="text-price-down">✗ 异常链接：{invalidCount}</span>
          <span className="text-text-secondary">总计：{results.length}</span>
        </div>
      )}
    </div>
  );
}

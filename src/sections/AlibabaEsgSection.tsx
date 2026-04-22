import { Leaf, ExternalLink, Globe, Users, Award, Target, TrendingUp, Shield } from 'lucide-react';
import SectionCard from '../components/SectionCard';

const ESGHighlights = [
  {
    icon: Globe,
    title: '全球承诺',
    description: '承诺到2030年实现自身运营碳中和，覆盖范围1和范围2的温室气体排放',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Users,
    title: '社会责任',
    description: '通过数字化技术赋能中小企业，创造超过6000万个就业机会',
    color: 'from-green-500 to-emerald-400',
  },
  {
    icon: Award,
    title: '治理卓越',
    description: '建立完善的ESG治理架构，董事会层面设立可持续发展委员会',
    color: 'from-amber-500 to-orange-400',
  },
  {
    icon: Target,
    title: '碳达峰行动',
    description: '推动供应链上下游协同减碳，助力实现国家双碳目标',
    color: 'from-red-500 to-pink-400',
  },
  {
    icon: TrendingUp,
    title: '绿色金融',
    description: '创新绿色金融产品，支持低碳技术研发和清洁能源项目',
    color: 'from-purple-500 to-violet-400',
  },
  {
    icon: Shield,
    title: '数据安全',
    description: '通过ISO 27001认证，建立全面的数据隐私保护体系',
    color: 'from-teal-500 to-cyan-400',
  },
];

const ESGMetrics = [
  { label: '范围1+2减排目标', value: '100%', unit: '2030年碳中和' },
  { label: '绿色数据中心', value: '100%', unit: '清洁能源使用' },
  { label: '公益投入', value: '数亿元', unit: '年度投入规模' },
];

export default function AlibabaEsgSection() {
  return (
    <div className="space-y-6">
      {/* ESG愿景卡片 */}
      <SectionCard
        title="阿里巴巴ESG"
        subtitle="环境、社会及治理可持续发展报告"
        icon={<Leaf className="w-5 h-5" />}
      >
        {/* 顶部愿景区域 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-8 mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white m-0">让天下没有难做的生意</h3>
                <p className="text-white/70 text-sm m-0">With sustainability as our core value</p>
              </div>
            </div>
            <p className="text-white/90 text-base leading-relaxed mb-6">
              阿里巴巴集团始终将可持续发展作为核心价值观，通过技术创新和生态协同，
              推动商业与社会、环境的和谐共生，致力于成为一家活102年的好公司。
            </p>

            {/* 关键指标 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ESGMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center"
                >
                  <p className="text-white/70 text-xs mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <p className="text-white/60 text-xs">{metric.unit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ESG核心领域 */}
        <h4 className="text-base font-semibold text-text-primary mb-4">ESG核心领域</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {ESGHighlights.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-xl border border-border bg-white p-5 hover:shadow-lg hover:border-primary/30 transition-all"
            >
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${item.color}`} />
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-10 flex-shrink-0`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-text-primary mb-2">{item.title}</h5>
                  <p className="text-xs text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 行动按钮 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://www.alibabagroup.com/esg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
          >
            <Globe className="w-4 h-4" />
            查看完整ESG报告
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.alibabagroup.com/cn/global/home"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary rounded-xl text-sm font-medium hover:bg-primary hover:text-white transition-all"
          >
            访问阿里巴巴集团官网
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </SectionCard>
    </div>
  );
}

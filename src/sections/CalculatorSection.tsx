import { useState, useMemo } from 'react';
import { Calculator, Bus, TrainFront, Bike, Footprints, Zap, Car } from 'lucide-react';
import SectionCard from '../components/SectionCard';
import { methodologies } from '../data/emissionFactors';
import { calculateReduction } from '../utils/calculator';

const ICON_MAP: Record<string, React.ReactNode> = {
  Bus: <Bus className="w-5 h-5" />,
  TrainFront: <TrainFront className="w-5 h-5" />,
  Bike: <Bike className="w-5 h-5" />,
  Footprints: <Footprints className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
};

export default function CalculatorSection() {
  const [selectedProvince, setSelectedProvince] = useState('北京');
  const [selectedMode, setSelectedMode] = useState('');
  const [distance, setDistance] = useState<number>(10);

  const currentMethodology = useMemo(
    () => methodologies.find((m) => m.province === selectedProvince),
    [selectedProvince]
  );

  const currentMode = useMemo(
    () => currentMethodology?.transportModes.find((m) => m.mode === selectedMode),
    [currentMethodology, selectedMode]
  );

  const result = useMemo(() => {
    if (!currentMode || distance <= 0) return null;
    return calculateReduction(currentMode.baselineFactor, currentMode.scenarioFactor, distance);
  }, [currentMode, distance]);

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setSelectedMode('');
  };

  return (
    <SectionCard
      title={'减排量计算器'}
      subtitle={'基于各省市碳普惠方法学计算减排量'}
      icon={<Calculator className="w-5 h-5" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input area */}
        <div className="space-y-5">
          {/* Province selector */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {'\u9009\u62e9\u7701\u5e02'}
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
            >
              {methodologies.map((m) => (
                <option key={m.id} value={m.province}>
                  {m.province}
                </option>
              ))}
            </select>
            {currentMethodology && (
              <p className="text-xs text-text-secondary mt-1 m-0">
                {'\u65b9\u6cd5\u5b66\uff1a'}{currentMethodology.name}
              </p>
            )}
          </div>

          {/* Transport mode selector */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {'\u9009\u62e9\u51fa\u884c\u65b9\u5f0f'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {currentMethodology?.transportModes.map((mode) => (
                <button
                  key={mode.mode}
                  onClick={() => setSelectedMode(mode.mode)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedMode === mode.mode
                      ? 'border-primary bg-primary-light text-primary shadow-sm'
                      : 'border-border bg-white text-text-secondary hover:border-primary/30'
                  }`}
                >
                  {ICON_MAP[mode.icon] || <Bus className="w-5 h-5" />}
                  <span className="text-xs font-medium">{mode.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Distance input */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {'\u8f93\u5165\u51fa\u884c\u8ddd\u79bb'}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(Math.max(0, parseFloat(e.target.value) || 0))}
                min={0}
                step={1}
                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder={'\u8bf7\u8f93\u5165\u8ddd\u79bb'}
              />
              <span className="text-sm text-text-secondary">{'\u516c\u91cc'}</span>
            </div>
          </div>
        </div>

        {/* Result area */}
        <div className="flex items-center justify-center">
          {result && currentMode ? (
            <div className="w-full bg-primary-light/50 rounded-xl p-6 text-center border border-primary/20">
              <p className="text-sm text-text-secondary mb-1 m-0">{'\u9884\u4f30\u78b3\u51cf\u6392\u91cf'}</p>
              <p className="text-4xl font-bold text-primary my-3">
                {result.tons.toFixed(4)}
                <span className="text-base font-normal text-text-secondary ml-1">
                  {'\u5428 CO\u2082'}
                </span>
              </p>
              <p className="text-sm text-text-secondary m-0">
                = {result.kg.toFixed(2)} {'\u5343\u514b CO\u2082'}
              </p>

              <div className="mt-4 pt-4 border-t border-primary/20 text-left space-y-1">
                <p className="text-xs text-text-secondary m-0">
                  <span className="font-medium">{'\u57fa\u51c6\u6392\u653e\u56e0\u5b50\uff1a'}</span>
                  {currentMode.baselineFactor} kgCO{'\u2082'}/km
                </p>
                <p className="text-xs text-text-secondary m-0">
                  <span className="font-medium">{'\u573a\u666f\u6392\u653e\u56e0\u5b50\uff1a'}</span>
                  {currentMode.scenarioFactor} kgCO{'\u2082'}/km
                </p>
                <p className="text-xs text-text-secondary m-0">
                  <span className="font-medium">{'\u51cf\u6392\u56e0\u5b50\uff1a'}</span>
                  {(currentMode.baselineFactor - currentMode.scenarioFactor).toFixed(3)} kgCO{'\u2082'}/km
                </p>
                <p className="text-xs text-text-secondary m-0">
                  <span className="font-medium">{'\u8ba1\u7b97\u516c\u5f0f\uff1a'}</span>
                  ({currentMode.baselineFactor} - {currentMode.scenarioFactor}) x {distance} / 1000
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-text-secondary py-8">
              <Calculator className="w-16 h-16 mx-auto mb-3 opacity-20" />
              <p className="text-sm m-0">{'\u8bf7\u9009\u62e9\u51fa\u884c\u65b9\u5f0f\u5e76\u8f93\u5165\u8ddd\u79bb'}</p>
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
}

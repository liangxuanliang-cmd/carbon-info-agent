interface TabFilterProps {
  label: string;
  tabs: Array<{ value: string; label: string }>;
  activeValue: string;
  onChange: (value: string) => void;
}

export default function TabFilter({ label, tabs, activeValue, onChange }: TabFilterProps) {
  return (
    <div className="flex items-start gap-3 mb-3">
      <span className="text-sm text-text-secondary whitespace-nowrap pt-1.5 min-w-[5rem]">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer border-none ${
              activeValue === tab.value
                ? 'bg-primary text-white shadow-sm'
                : 'bg-gray-100 text-text-secondary hover:bg-primary-light hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

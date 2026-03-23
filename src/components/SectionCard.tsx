import type { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function SectionCard({ title, subtitle, icon, children }: SectionCardProps) {
  return (
    <section className="bg-card rounded-xl shadow-md overflow-hidden">
      <div className="border-b border-border px-6 py-4 flex items-center gap-3">
        {icon && <span className="text-primary">{icon}</span>}
        <div>
          <h2 className="text-lg font-semibold text-text-primary m-0">{title}</h2>
          {subtitle && (
            <p className="text-sm text-text-secondary m-0 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

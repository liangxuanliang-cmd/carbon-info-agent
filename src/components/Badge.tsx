interface BadgeProps {
  status: 'active' | 'expired';
}

export default function Badge({ status }: BadgeProps) {
  const isActive = status === 'active';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}
    >
      {isActive ? '\u6709\u6548' : '\u5df2\u5931\u6548'}
    </span>
  );
}

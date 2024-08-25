interface InfoItemProps {
  label: string
  value: string | number
  className?: string
}

export const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  className,
}) => (
  <p className={`flex flex-col gap-0.5 ${className}`}>
    <span className="text-xs text-gray-400">{label}</span>
    <span className="text-2xl text-blue-950">{value}</span>
  </p>
)

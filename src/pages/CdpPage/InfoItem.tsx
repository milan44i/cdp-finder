interface InfoItemProps {
  label: string
  value: string | number
}

export const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="flex flex-col gap-0.5 first:col-span-2 first:md:col-span-3">
    <span className="text-xs text-gray-400">{label}</span>
    <span className="text-2xl text-blue-950">{value}</span>
  </div>
)

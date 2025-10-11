import { LucideIcon } from 'lucide-react'

interface EditableFieldProps {
  label: string
  value: string
  isEditing: boolean
  icon?: LucideIcon
  type?: 'text' | 'email' | 'tel' | 'textarea'
  rows?: number
  onChange: (value: string) => void
}

export default function EditableField({
  label,
  value,
  isEditing,
  icon: Icon,
  type = 'text',
  rows = 1,
  onChange
}: EditableFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        {Icon && <Icon size={16} className="mr-2" />}
        {label}
      </label>
      {isEditing ? (
        type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        )
      ) : (
        <p className="text-gray-900">{value}</p>
      )}
    </div>
  )
}
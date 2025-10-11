interface RoleBadgeProps {
  role: string
}

const getRoleLabel = (role: string) => {
  const roles: { [key: string]: string } = {
    SENIOR_PASTOR: 'Senior Pastor',
    WORSHIP_LEADER: 'Worship Leader',
    YOUTH_PASTOR: 'Youth Pastor',
    DEACON: 'Deacon',
    ELDER: 'Elder',
    VOLUNTEER: 'Volunteer'
  }
  return roles[role] || role
}

export default function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
      {getRoleLabel(role)}
    </span>
  )
}
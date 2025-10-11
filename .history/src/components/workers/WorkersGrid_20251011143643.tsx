import WorkerCard from './WorkerCard'

export interface Worker {
  id: number
  name: string
  role: string
  email: string
  phone: string
  department: string
  bio: string
  avatar: string
}

interface WorkersGridProps {
  workers: Worker[]
}

export default function WorkersGrid({ workers }: WorkersGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {workers.map((worker) => (
        <WorkerCard key={worker.id} worker={worker} />
      ))}
    </div>
  )
}
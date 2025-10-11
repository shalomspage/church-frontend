import WorkerCard from './WorkerCard'
import { Worker, WorkersGridProps } from '@/types/workers'

export default function WorkersGrid({ workers }: WorkersGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {workers.map((worker) => (
        <WorkerCard key={worker.id} worker={worker} />
      ))}
    </div>
  )
}
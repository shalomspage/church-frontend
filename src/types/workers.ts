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

export interface WorkersGridProps {
  workers: Worker[]
}

export interface WorkerCardProps {
  worker: Worker
}
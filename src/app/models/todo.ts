export type TodoStatus = 'completed' | 'active'

export interface Todo {
  id: string
  title: string
  status: TodoStatus
  createdAt: Date
  completedAt?: Date
  isDeleted?: boolean
}

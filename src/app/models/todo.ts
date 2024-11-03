export type TodoStatus = 'completed' | 'open'

export interface Todo {
  id: string
  title: string
  status: TodoStatus
}

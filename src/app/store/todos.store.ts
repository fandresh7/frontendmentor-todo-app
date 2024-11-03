import { Todo } from '../models/todo'

export interface TodosState {
  todos: Todo[]
  isLoading: boolean
  filter: { query: string; order: 'asc' | 'desc' }
}

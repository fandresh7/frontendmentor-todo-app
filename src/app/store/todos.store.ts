import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'
import { computed, inject } from '@angular/core'
import { Todo, TodoStatus } from '../models/todo'
import { TodosService } from '../services/todos.service'

type Filter = 'all' | 'completed' | 'active'

export interface TodosState {
  todos: Todo[]
  loading: boolean
  filter: Filter
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  filter: 'all'
}

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todosService = inject(TodosService)) => ({
    async addTodo(title: string, status: TodoStatus) {
      const todo = await todosService.addTodo({ title, status })

      patchState(store, state => ({
        todos: [...state.todos, todo]
      }))
    }
  })),
  withComputed(state => ({
    filteredTodos: computed(() => {
      const todos = state.todos()

      if (state.filter() === 'completed') {
        return todos.filter(todo => todo.status === 'completed')
      }

      if (state.filter() === 'active') {
        return todos.filter(todo => todo.status === 'active')
      }

      return todos
    }),
    activeTodosAmount: computed(() => {
      const todos = state.todos()
      const activeTodos = todos.filter(todo => todo.status === 'active')
      return activeTodos.length
    })
  })),
  withHooks({
    async onInit(store, todosService = inject(TodosService)) {
      const todos = await todosService.getTodos()
      patchState(store, { todos })
    }
  })
)

import { inject, Injectable } from '@angular/core'
import { sleep } from '../shared/utils/sleep'
import { Todo, TodoStatus } from '../models/todo'
import { LocalStorageService } from '../shared/services/local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class TodosLocalStorageService {
  private TODOS_KEY = 'todos'

  localStorageService = inject(LocalStorageService)

  async getTodos(): Promise<Todo[]> {
    await sleep(1000)

    const todos = this.localStorageService.getItem(this.TODOS_KEY)
    return todos ? JSON.parse(todos) : []
  }

  async addTodo(todo: Partial<Todo>): Promise<Todo> {
    await sleep(500)

    if (todo.status === 'completed') {
      todo.completedAt = new Date()
    }

    const newTodo = {
      id: new Date().getTime().toString(),
      createdAt: new Date(),
      ...todo
    } as Todo

    const todos = await this.getTodos()
    todos.unshift(newTodo)
    this.saveTodos(todos)

    return newTodo
  }

  async deleteTodo(id: string): Promise<Todo | null> {
    await sleep(500)

    const todos = await this.getTodos()
    const index = todos.findIndex(todo => todo.id === id)
    if (index === -1) return null

    todos[index] = { ...todos[index], isDeleted: true }
    this.saveTodos(todos)

    return todos[index]
  }

  async changeTodoStatus(id: string, status: TodoStatus): Promise<Todo | null> {
    await sleep(500)

    const todos = await this.getTodos()
    const index = todos.findIndex(todo => todo.id === id)
    if (index === -1) return null

    const updatedTodo = { ...todos[index], status } as Todo
    if (status === 'completed') {
      updatedTodo.completedAt = new Date()
    } else {
      updatedTodo.completedAt = undefined
    }
    todos[index] = updatedTodo
    this.saveTodos(todos)

    return updatedTodo
  }

  async clearCompleted(): Promise<Todo[]> {
    await sleep(500)

    const todos = await this.getTodos()
    const updatedTodos = todos.map(todo => (todo.status === 'completed' ? { ...todo, isDeleted: true } : todo))
    this.saveTodos(updatedTodos)

    return updatedTodos
  }

  async reorder(id: string, currentIndex: number): Promise<Todo[]> {
    await sleep(500)

    const todos = await this.getTodos()
    const index = todos.findIndex(todo => todo.id === id)
    if (index === -1) return todos

    const [todo] = todos.splice(index, 1)
    todos.splice(currentIndex, 0, todo)
    this.saveTodos(todos)

    return todos
  }

  private saveTodos(todos: Todo[]): void {
    this.localStorageService.setItem(this.TODOS_KEY, JSON.stringify(todos))
  }
}

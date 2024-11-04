import { Injectable } from '@angular/core'
import { sleep } from '../shared/utils/sleep'

import { TODOS_MOCK } from '../models/mock-data'
import { Todo, TodoStatus } from '../models/todo'

let TODOS = TODOS_MOCK

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  async getTodos() {
    await sleep(500)

    return [...TODOS]
  }

  async addTodo(todo: Partial<Todo>) {
    await sleep(500)

    if (todo.status === 'completed') {
      todo.completedAt = new Date()
    }

    const newTodo = {
      id: new Date().getTime().toString(),
      createdAt: new Date(),
      ...todo
    } as Todo

    TODOS = [newTodo, ...TODOS]

    return newTodo
  }

  async deleteTodo(id: string) {
    await sleep(500)

    const index = TODOS.findIndex(todo => todo.id === id)
    const updatedTodo = { ...TODOS[index], isDeleted: true } as Todo

    TODOS[index] = updatedTodo

    return updatedTodo
  }

  async changeTodoStatus(id: string, status: TodoStatus) {
    await sleep(500)

    const index = TODOS.findIndex(todo => todo.id === id)
    const updatedTodo = { ...TODOS[index], status, completedAt: new Date() } as Todo

    TODOS[index] = updatedTodo

    return updatedTodo
  }

  async clearCompleted() {
    await sleep(500)

    TODOS.forEach((todo, index) => {
      if (todo.status === 'completed') {
        TODOS[index] = { ...todo, isDeleted: true }
      }
    })

    return TODOS
  }

  async reorder(id: string, currentIndex: number) {
    await sleep(500)

    const index = TODOS.findIndex(todo => todo.id === id)
    const [todo] = TODOS.splice(index, 1)
    TODOS.splice(currentIndex, 0, todo)

    return TODOS
  }
}

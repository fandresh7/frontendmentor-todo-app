import { Injectable } from '@angular/core'
import { sleep } from '../shared/utils/sleep'

import { TODOS_MOCK } from '../models/mock-data'
import { Todo, TodoStatus } from '../models/todo'

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  TODOS = TODOS_MOCK

  async getTodos() {
    await sleep(500)

    return [...this.TODOS]
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

    this.TODOS = [newTodo, ...this.TODOS]

    return newTodo
  }

  async deleteTodo(id: string) {
    await sleep(500)

    const index = this.TODOS.findIndex(todo => todo.id === id)
    const updatedTodo = { ...this.TODOS[index], isDeleted: true } as Todo

    this.TODOS[index] = updatedTodo

    return updatedTodo
  }

  async changeTodoStatus(id: string, status: TodoStatus) {
    await sleep(500)

    const index = this.TODOS.findIndex(todo => todo.id === id)
    const updatedTodo = { ...this.TODOS[index], status } as Todo

    if (status === 'completed') {
      updatedTodo.completedAt = new Date()
    } else {
      updatedTodo.completedAt = undefined
    }

    this.TODOS[index] = updatedTodo

    return updatedTodo
  }

  async clearCompleted() {
    await sleep(500)

    this.TODOS.forEach((todo, index) => {
      if (todo.status === 'completed') {
        this.TODOS[index] = { ...todo, isDeleted: true }
      }
    })

    return this.TODOS
  }

  async reorder(id: string, currentIndex: number) {
    await sleep(500)

    const index = this.TODOS.findIndex(todo => todo.id === id)
    const [todo] = this.TODOS.splice(index, 1)
    this.TODOS.splice(currentIndex, 0, todo)

    return this.TODOS
  }
}

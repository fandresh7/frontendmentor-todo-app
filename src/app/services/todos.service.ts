import { Injectable } from '@angular/core'
import { sleep } from '../shared/utils/sleep'

import { TODOS } from '../models/mock-data'
import { Todo, TodoStatus } from '../models/todo'

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  async getTodos() {
    await sleep(500)

    return TODOS
  }

  async addTodo(todo: Partial<Todo>) {
    await sleep(500)

    if (todo.status === 'completed') {
      todo.completedAt = new Date()
    }

    return {
      id: new Date().getTime().toString(),
      createdAt: new Date(),
      ...todo
    } as Todo
  }

  async deleteTodo(id: string) {
    await sleep(500)

    const todo = TODOS.find(todo => todo.id === id)!

    return {
      ...todo,
      isDeleted: true
    } as Todo
  }

  async changeTodoStatus(id: string, status: TodoStatus) {
    await sleep(500)

    const todo = TODOS.find(todo => todo.id === id)!

    return {
      ...todo,
      status,
      completedAt: new Date()
    } as Todo
  }

  async updateTodo(id: string, title: string) {
    await sleep(500)

    const todo = TODOS.find(todo => todo.id === id)!

    return {
      ...todo,
      title
    } as Todo
  }
}

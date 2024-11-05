import { TestBed } from '@angular/core/testing'

import { TodosService } from './todos.service'
import { TODOS_MOCK } from '../models/mock-data'
import { Todo } from '../models/todo'

fdescribe('TodosService', () => {
  let service: TodosService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(TodosService)

    service.TODOS = [...TODOS_MOCK]
  })

  it('should create the TodosService instance', () => {
    expect(service).toBeTruthy()
  })

  it('should retrieve all todos', async () => {
    const todos = await service.getTodos()

    expect(todos.length).toBe(TODOS_MOCK.length)
  })

  it('should add a new active todo at the beginning of the TODOS list', async () => {
    const todo: Partial<Todo> = { title: 'test title', status: 'active' }

    const addedTodo = await service.addTodo(todo)

    expect(service.TODOS[0].title).toBe(todo.title!)
    expect(addedTodo.title).toBe(todo.title!)
  })

  it('should add a new completed todo with a completion date at the beginning of the TODOS list', async () => {
    const todo: Partial<Todo> = { title: 'test title', status: 'completed' }

    const addedTodo = await service.addTodo(todo)

    expect(service.TODOS[0].title).toBe(todo.title!)
    expect(addedTodo.title).toBe(todo.title!)
    expect(addedTodo.completedAt).toBeDefined()
  })

  it('should mark a todo as deleted based on the provided ID', async () => {
    const id = '1'
    const deletedTodo = await service.deleteTodo(id)

    const todo = service.TODOS.find(todo => todo.id === id)

    expect(deletedTodo.isDeleted).toBe(true)
    expect(todo?.isDeleted).toBe(true)
  })

  it('should update a todo’s status to completed and set the completion date', async () => {
    const id = '3'
    const status = 'completed'

    const updatedTodo = await service.changeTodoStatus(id, status)

    expect(updatedTodo.status).toBe(status)
    expect(updatedTodo.completedAt).toBeDefined()
  })

  it('should change a completed todo’s status to active and remove the completion date', async () => {
    const id = '1'
    const status = 'active'

    const updatedTodo = await service.changeTodoStatus(id, status)

    expect(updatedTodo.status).toBe(status)
    expect(updatedTodo.completedAt).toBeUndefined()
  })

  it('should mark all completed todos as deleted', async () => {
    const todos = await service.clearCompleted()
    const completedTodos = service.TODOS.filter(todo => todo.status === 'completed')

    completedTodos.forEach(todo => {
      expect(todo.isDeleted).toBe(true)
    })

    expect(todos).toEqual(service.TODOS)
  })

  it('should move the specified todo to the given position in the list', async () => {
    const id = '3'
    const targetIndex = 0

    const reorderedTodos = await service.reorder(id, targetIndex)

    expect(service.TODOS[targetIndex].id).toBe(id)
    expect(reorderedTodos).toEqual(service.TODOS)
  })
})

import { fakeAsync, TestBed, tick } from '@angular/core/testing'
import { TodosStore } from './todos.store'
import { TODOS_MOCK } from '../models/mock-data'
import { TodosService } from '../services/todos.service'
import { Todo, TodoStatus } from '../models/todo'

class MockTodosService {
  todos = TODOS_MOCK

  getTodos() {
    return Promise.resolve(this.todos)
  }

  addTodo(todo: Partial<Todo>) {
    if (todo.status === 'completed') {
      todo.completedAt = new Date()
    }

    const newTodo = {
      id: new Date().getTime().toString(),
      createdAt: new Date(),
      ...todo
    } as Todo

    return Promise.resolve(newTodo)
  }

  changeTodoStatus(id: string, status: TodoStatus) {
    const todo = this.todos.find(todo => todo.id === id)!
    const updatedTodo = { ...todo, status } as Todo

    if (status === 'completed') {
      updatedTodo.completedAt = new Date()
    } else {
      updatedTodo.completedAt = undefined
    }

    return Promise.resolve(updatedTodo)
  }

  deleteTodo(id: string) {
    const todo = this.todos.find(todo => todo.id === id)!

    const deletedTodo = { ...todo, isDeleted: true } as Todo
    return Promise.resolve(deletedTodo)
  }

  clearCompleted() {
    return this.todos.map(todo => {
      if (todo.status === 'completed') {
        return { ...todo, isDeleted: true } as Todo
      } else {
        return todo
      }
    })
  }

  reorder(id: string, currentIndex: number) {
    const index = this.todos.findIndex(todo => todo.id === id)
    const [todo] = this.todos.splice(index, 1)
    this.todos.splice(currentIndex, 0, todo)

    return Promise.resolve(this.todos)
  }
}

describe('TodosStore', () => {
  let service: MockTodosService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TodosService,
          useClass: MockTodosService
        }
      ]
    })

    service = TestBed.inject(TodosService) as unknown as MockTodosService
  })

  afterEach(() => {
    service.todos = [...TODOS_MOCK]
  })

  it('should retrieve the list of todos from the mock service', fakeAsync(() => {
    const store = TestBed.inject(TodosStore)

    expect(store.loading()).toBe(true)
    tick()

    expect(store.loading()).toBe(false)
    expect(store.todos().length).toBe(TODOS_MOCK.length)
  }))

  it('should add a new todo with "active" status and no completion date', fakeAsync(() => {
    const store = TestBed.inject(TodosStore)

    const title = 'Complete TypeScript course'
    store.addTodo(title, 'active')

    tick()

    const addedTodo = store.todos()[0]

    expect(addedTodo.title).toBe(title)
    expect(addedTodo.completedAt).toBeUndefined()
  }))

  it('should add a new todo with "completed" status and a completion date', fakeAsync(() => {
    const store = TestBed.inject(TodosStore)

    const title = 'Complete Python course'
    store.addTodo(title, 'completed')

    tick()

    const addedTodo = store.todos()[0]

    expect(addedTodo.title).toBe(title)
    expect(addedTodo.completedAt).not.toBeUndefined()
  }))

  it('should mark a todo as deleted', fakeAsync(() => {
    const store = TestBed.inject(TodosStore)
    const id = '1'

    store.deleteTodo(id)
    tick()

    const deletedTodo = store.todos().find(todo => todo.id === id)
    expect(deletedTodo?.isDeleted).toBe(true)
  }))

  it('should change a todo status to "active" and remove the completion date', fakeAsync(() => {
    const store = TestBed.inject(TodosStore)

    const id = '2'
    const status = 'active'

    store.changeTodoStatus(id, status)
    tick()

    const updatedTodo = store.todos().find(todo => todo.id === id)
    expect(updatedTodo?.status).toBe(status)
    expect(updatedTodo?.completedAt).toBeUndefined()
  }))

  it('should change a todo status to "completed" and set the completion date', fakeAsync(() => {
    const store = TestBed.inject(TodosStore)

    const id = '2'
    const status = 'completed'

    store.changeTodoStatus(id, status)
    tick()

    const updatedTodo = store.todos().find(todo => todo.id === id)
    expect(updatedTodo?.status).toBe(status)
    expect(updatedTodo?.completedAt).not.toBeUndefined()
  }))

  it('should mark all completed todos as deleted', fakeAsync(() => {
    const store = TestBed.inject(TodosStore)

    store.clearCompleted()
    tick()

    const completedTodos = store.todos().filter(todo => todo.status === 'completed')

    completedTodos.forEach(todo => {
      expect(todo.isDeleted).toBe(true)
    })
  }))

  it('should reorder the todos, placing a specific todo at the given index', fakeAsync(() => {
    const store = TestBed.inject(TodosStore)

    const id = '2'
    const currentIndex = 1

    store.reorder(id, currentIndex)
    tick()

    expect(store.todos()[currentIndex].id).toBe(id)
  }))

  it('should update the filter to display only completed todos', fakeAsync(() => {
    const store = TestBed.inject(TodosStore)

    const status = 'completed'
    store.updateFilter(status)
    tick()

    expect(store.filter()).toBe(status)
  }))

  it('should return only non-deleted todos with "completed" status when filter is set to "completed"', fakeAsync(() => {
    const store = TestBed.inject(TodosStore)
    tick()

    store.updateFilter('completed')

    store.filteredTodos().forEach(todo => {
      expect(todo.status).toBe('completed')
      expect(todo.isDeleted).toBeFalsy()
    })
  }))

  it('should return only non-deleted todos with "active" status when filter is set to "active"', fakeAsync(() => {
    const store = TestBed.inject(TodosStore)
    tick()

    store.updateFilter('active')

    store.filteredTodos().forEach(todo => {
      expect(todo.status).toBe('active')
      expect(todo.isDeleted).toBeFalsy()
    })
  }))

  it('should return only non-deleted todos when filter is set to "all"', fakeAsync(() => {
    const store = TestBed.inject(TodosStore)
    tick()

    store.updateFilter('all')

    store.filteredTodos().forEach(todo => {
      expect(todo.isDeleted).toBeFalsy()
    })
  }))

  it('should return the correct count of non-deleted active todos', fakeAsync(() => {
    const store = TestBed.inject(TodosStore)
    store.updateFilter('all')
    tick()

    expect(store.activeTodosAmount()).toBe(3)
  }))
})

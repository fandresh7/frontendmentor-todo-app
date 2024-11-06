import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TodoComponent } from './todo.component'
import { TodosStore } from '../../store/todos.store'
import { TODOS_MOCK } from '../../models/mock-data'

class MockTodosStore {
  changeTodoStatus = jasmine.createSpy('changeTodoStatus').and.resolveTo()
  deleteTodo = jasmine.createSpy('deleteTodo').and.resolveTo()
  filteredTodos = jasmine.createSpy('filteredTodos')
  activeTodosAmount = jasmine.createSpy('activeTodosAmount')
  filter = jasmine.createSpy('filter')
}

describe('TodoComponent', () => {
  let component: TodoComponent
  let compiled: HTMLElement
  let fixture: ComponentFixture<TodoComponent>

  let store: MockTodosStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoComponent],
      providers: [
        {
          provide: TodosStore,
          useClass: MockTodosStore
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(TodoComponent)
    compiled = fixture.nativeElement as HTMLElement
    component = fixture.componentInstance

    fixture.componentRef.setInput('todo', TODOS_MOCK[0])

    store = TestBed.inject(TodosStore) as unknown as MockTodosStore
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should triger changeTodoStatus when changeIsChecked is triggered', async () => {
    fixture.detectChanges()

    await component.changeIsChecked(true)
    const todo = component.todo()

    expect(store.changeTodoStatus).toHaveBeenCalledWith(todo.id, 'completed')
  })

  it('should call changeTodoStatus with the correct parameters when changeIsChecked is triggered', async () => {
    fixture.detectChanges()

    await component.changeIsChecked(true)
    const todo = component.todo()

    expect(store.changeTodoStatus).toHaveBeenCalledWith(todo.id, 'completed')
  })

  it('should set loading to true before calling changeTodoStatus, and set it to false after completion', async () => {
    spyOn(component.loading, 'set')
    fixture.detectChanges()

    await component.changeIsChecked(true)

    expect(component.loading.set).toHaveBeenCalledWith(true)
    expect(component.loading.set).toHaveBeenCalledWith(false)
  })

  it('should call deleteTodo in the store with the correct id', async () => {
    fixture.detectChanges()

    const todoId = component.todo().id

    await component.deleteTodo()

    expect(store.deleteTodo).toHaveBeenCalledWith(todoId)
  })

  it('should set loading to true before calling deleteTodo, and set it to false after completion', async () => {
    spyOn(component.loading, 'set')
    fixture.detectChanges()

    await component.deleteTodo()

    expect(component.loading.set).toHaveBeenCalledWith(true)
    expect(component.loading.set).toHaveBeenCalledWith(false)
  })

  it('should render checkInput component', () => {
    const checkInputElement = compiled.querySelector('check-input')
    expect(checkInputElement).not.toBeNull()
  })

  it('should render todo title', () => {
    const todo = component.todo()

    fixture.detectChanges()

    const spanElement = compiled.querySelector('span')
    expect(spanElement?.innerText).toBe(todo.title)
  })

  it('should title element have isCompleted classes if todo is completed', () => {
    fixture.detectChanges()

    const spanElement = compiled.querySelector('span')
    expect(spanElement?.classList.contains('text-[#D1D2DA]')).toBe(true)
    expect(spanElement?.classList.contains('line-through')).toBe(true)
    expect(spanElement?.classList.contains('dark:text-[#4D5067]')).toBe(true)
  })

  it('should title element not have isCompleted classes if todo is active', () => {
    const todo = TODOS_MOCK[0]
    todo.status = 'active'

    fixture.componentRef.setInput('todo', todo)
    fixture.detectChanges()

    const spanElement = compiled.querySelector('span')
    expect(spanElement?.classList.contains('text-[#D1D2DA]')).toBe(false)
    expect(spanElement?.classList.contains('line-through')).toBe(false)
    expect(spanElement?.classList.contains('dark:text-[#4D5067]')).toBe(false)
  })
})

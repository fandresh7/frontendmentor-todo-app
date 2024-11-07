import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop'

import { TodoListComponent } from './todo-list.component'
import { TodosStore } from '../../store/todos.store'
import { TODOS_MOCK } from '../../models/mock-data'
import { Todo } from '../../models/todo'

class MockTodosStore {
  reorder = jasmine.createSpy('reorder').and.resolveTo()
  filteredTodos = jasmine.createSpy('filteredTodos').and.returnValue(TODOS_MOCK)
  activeTodosAmount = jasmine.createSpy('activeTodosAmount')
  loading = jasmine.createSpy('loading')
  filter = jasmine.createSpy('filter')
}

describe('TodoListComponent', () => {
  let component: TodoListComponent
  let compiled: HTMLElement
  let fixture: ComponentFixture<TodoListComponent>

  let store: MockTodosStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [
        {
          provide: TodosStore,
          useClass: MockTodosStore
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(TodoListComponent)
    compiled = fixture.nativeElement as HTMLElement
    component = fixture.componentInstance

    store = TestBed.inject(TodosStore) as unknown as MockTodosStore
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call reorder method with the correct todo id and new index on drop event', async () => {
    const previousIndex = 0
    const currentIndex = 2
    const todo = store.filteredTodos()[previousIndex]

    const mockEvent: Partial<CdkDragDrop<Todo[]>> = {
      previousIndex,
      currentIndex,
      container: {
        data: store.filteredTodos()
      } as CdkDropList<Todo[]>
    }

    await component.drop(mockEvent as CdkDragDrop<Todo[]>)
    expect(store.reorder).toHaveBeenCalledWith(todo.id, currentIndex)
  })

  it('should render the list of todos when they are available', () => {
    fixture.detectChanges()

    const todoElements = compiled.querySelectorAll('todo')
    const articleElement = compiled.querySelector('#empty_message')

    expect(todoElements.length).toBe(store.filteredTodos().length)
    expect(articleElement).toBeNull()

    todoElements.forEach(todo => {
      expect(todo.classList.contains('cdk-drag')).toBe(true)
    })
  })

  it('should display an empty message when there are no todos and loading is false', () => {
    store.filteredTodos = jasmine.createSpy('filteredTodos').and.returnValue([])
    store.loading = jasmine.createSpy('loading').and.returnValue(false)

    fixture.detectChanges()

    const todoElements = compiled.querySelectorAll('todo')
    const articleElement = compiled.querySelector('#empty_message')

    expect(todoElements.length).toBe(0)
    expect(articleElement).not.toBeNull()
  })

  it('should not display an empty message when there are no todos and loading is true', () => {
    store.filteredTodos = jasmine.createSpy('filteredTodos').and.returnValue([])
    store.loading = jasmine.createSpy('loading').and.returnValue(true)

    fixture.detectChanges()

    const todoElements = compiled.querySelectorAll('todo')
    const articleElement = compiled.querySelector('#empty_message')

    expect(todoElements.length).toBe(0)
    expect(articleElement).toBeNull()
  })

  it('should render the TodoListFooter component', () => {
    const footerElement = compiled.querySelector('todo-list-footer')
    expect(footerElement).not.toBeNull()
  })
})

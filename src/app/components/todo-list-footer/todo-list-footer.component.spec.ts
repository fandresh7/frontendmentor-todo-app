import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TodoListFooterComponent } from './todo-list-footer.component'
import { TodosStore } from '../../store/todos.store'

class MockTodosStore {
  activeTodosAmount = jasmine.createSpy('activeTodosAmount').and.returnValue(10)
  filter = jasmine.createSpy('filter')
  clearCompleted = jasmine.createSpy('clearCompleted').and.resolveTo()
}

describe('TodoListFooterComponent', () => {
  let component: TodoListFooterComponent
  let compiled: HTMLElement
  let fixture: ComponentFixture<TodoListFooterComponent>

  let store: MockTodosStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListFooterComponent],
      providers: [
        {
          provide: TodosStore,
          useClass: MockTodosStore
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(TodoListFooterComponent)
    compiled = fixture.nativeElement as HTMLElement
    component = fixture.componentInstance

    store = TestBed.inject(TodosStore) as unknown as MockTodosStore
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call clearCompleted on store when clearCompleted is triggered', async () => {
    await component.clearCompleted()

    expect(store.clearCompleted).toHaveBeenCalled()
  })

  it('should render filters component', () => {
    const filterElement = compiled.querySelector('filters')

    expect(filterElement).not.toBeNull()
  })

  it('should render activeTodosAmount', () => {
    const pElement = compiled.querySelector('p')
    expect(pElement?.innerText).toBe(`${store.activeTodosAmount()} items left`)
  })
})

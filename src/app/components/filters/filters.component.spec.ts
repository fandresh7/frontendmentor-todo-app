import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FiltersComponent } from './filters.component'
import { TodosStore } from '../../store/todos.store'

class MockTodosStore {
  updateFilter = jasmine.createSpy('updateFilter')
  filteredTodos = jasmine.createSpy('filteredTodos')
  activeTodosAmount = jasmine.createSpy('activeTodosAmount')
  filter = jasmine.createSpy('filter').and.returnValue('all')
}

describe('FiltersComponent', () => {
  let component: FiltersComponent
  // let compiled: HTMLElement
  let fixture: ComponentFixture<FiltersComponent>

  let store: MockTodosStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersComponent],
      providers: [
        {
          provide: TodosStore,
          useClass: MockTodosStore
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(FiltersComponent)
    // compiled = fixture.nativeElement as HTMLElement
    component = fixture.componentInstance

    store = TestBed.inject(TodosStore) as unknown as MockTodosStore
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call update filter in change function', () => {
    fixture.detectChanges()

    const status = 'completed'

    component.change(status)
    expect(store.updateFilter).toHaveBeenCalledWith(status)
  })

  it('should return true when isActive is triggered with same value in store', () => {
    store.filter = jasmine.createSpy('filter').and.returnValue('all')
    fixture.detectChanges()

    const isActiveAll = component.isActive('all')
    expect(isActiveAll).toBe(true)

    store.filter = jasmine.createSpy('filter').and.returnValue('completed')
    fixture.detectChanges()

    const isActiveCompleted = component.isActive('completed')
    expect(isActiveCompleted).toBe(true)

    store.filter = jasmine.createSpy('filter').and.returnValue('active')
    fixture.detectChanges()

    const isActive = component.isActive('active')
    expect(isActive).toBe(true)
  })
})

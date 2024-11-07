import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'

import { TodoCreateComponent } from './todo-create.component'
import { TodosStore } from '../../store/todos.store'
import { By } from '@angular/platform-browser'
import { CheckInputComponent } from '../check-input/check-input.component'

class MockTodosStore {
  addTodo = jasmine.createSpy('addTodo')
  activeTodosAmount = jasmine.createSpy('activeTodosAmount').and.returnValue(10)
  filter = jasmine.createSpy('filter')
}

describe('TodoCreateComponent', () => {
  let component: TodoCreateComponent
  let compiled: HTMLElement
  let fixture: ComponentFixture<TodoCreateComponent>

  let store: MockTodosStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCreateComponent],
      providers: [
        {
          provide: TodosStore,
          useClass: MockTodosStore
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(TodoCreateComponent)
    compiled = fixture.nativeElement as HTMLElement
    component = fixture.componentInstance

    store = TestBed.inject(TodosStore) as unknown as MockTodosStore
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call addTodo on TodosStore with correct title and status when a new todo is created', fakeAsync(() => {
    const title = 'Test new todo'

    component.isChecked.set(true)
    const status = component.isChecked() ? 'completed' : 'active'

    component.createTodo(title)
    tick()

    expect(store.addTodo).toHaveBeenCalledOnceWith(title, status)
  }))

  it('should not call addTodo on TodosStore when the todo title is empty', fakeAsync(() => {
    const title = ''

    component.createTodo(title)
    tick()

    expect(store.addTodo).not.toHaveBeenCalled()
  }))

  it('should set loading to true at the start and false at the end of the createTodo process', fakeAsync(() => {
    spyOn(component.loading, 'set')
    component.createTodo('test')
    tick()

    expect(component.loading.set).toHaveBeenCalledWith(true)
    expect(component.loading.set).toHaveBeenCalledWith(false)
  }))

  it('should clear the input field after successfully creating a new todo', fakeAsync(() => {
    component.input().nativeElement.value = 'test'
    fixture.detectChanges()

    component.createTodo('test')
    tick()

    expect(component.input().nativeElement.value).toBe('')
  }))

  it('should call createTodo when Enter key is pressed in the input field', fakeAsync(() => {
    const createTodoSpy = spyOn(component, 'createTodo').and.returnValue(Promise.resolve())

    const mockKeyboardEvent = new KeyboardEvent('keyup', {
      key: 'Enter'
    })

    component.handleKeyup(mockKeyboardEvent, 'test')
    tick()

    expect(createTodoSpy).toHaveBeenCalledWith('test')
  }))

  it('should not call createTodo when keyup event is triggered with a key other than Enter', fakeAsync(() => {
    const createTodoSpy = spyOn(component, 'createTodo').and.returnValue(Promise.resolve())

    const mockKeyboardEvent = new KeyboardEvent('keyup', {
      key: '1'
    })

    component.handleKeyup(mockKeyboardEvent, 'test')
    tick()

    expect(createTodoSpy).not.toHaveBeenCalled()
  }))

  it('should toggle the isChecked value when changeIsChecked is called', () => {
    const isChecked = component.isChecked()

    component.changeIsChecked(!isChecked)
    fixture.detectChanges()

    expect(component.isChecked()).toBe(!isChecked)
  })

  it('should call changeIsChecked with correct value when CheckInputComponent emits an isChecked event', () => {
    spyOn(component, 'changeIsChecked')

    const checkInputComponent = fixture.debugElement.query(By.directive(CheckInputComponent)).componentInstance
    checkInputComponent.isChecked.emit(true)

    expect(component.changeIsChecked).toHaveBeenCalledWith(true)
  })

  it('should call handleKeyup with input value when a key is pressed', fakeAsync(() => {
    spyOn(component, 'handleKeyup')

    const inputElement = compiled.querySelector('#input')! as HTMLInputElement
    inputElement.value = 'test'

    const keyupEvent = new KeyboardEvent('keyup', { key: 'Enter' })
    inputElement.dispatchEvent(keyupEvent)
    tick()

    expect(component.handleKeyup).toHaveBeenCalledWith(keyupEvent, 'test')
  }))

  it('should display iconSpin component and disable input when loading is active', () => {
    component.loading.set(true)
    fixture.detectChanges()

    const iconSpinElement = compiled.querySelector('icon-spin')
    const inputElement = compiled.querySelector('#input')! as HTMLInputElement

    expect(iconSpinElement).not.toBe(null)
    expect(inputElement.disabled).toBe(true)
  })

  it('should hide iconSpin component and enable input when loading is inactive', () => {
    component.loading.set(false)
    fixture.detectChanges()

    const iconSpinElement = compiled.querySelector('icon-spin')
    const inputElement = compiled.querySelector('#input')! as HTMLInputElement

    expect(iconSpinElement).toBe(null)
    expect(inputElement.disabled).toBe(false)
  })
})

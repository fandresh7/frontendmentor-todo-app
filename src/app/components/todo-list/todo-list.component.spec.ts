import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TodoListComponent } from './todo-list.component'

describe('TodoListComponent', () => {
  let component: TodoListComponent
  // let compiled: HTMLElement
  let fixture: ComponentFixture<TodoListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(TodoListComponent)
    // compiled = fixture.nativeElement as HTMLElement
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    compiled = fixture.nativeElement as HTMLElement
  })

  it('should create the app', () => {
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should have main-header component', () => {
    const mainHeader = compiled.querySelector('main-header')
    expect(mainHeader).not.toBeNull()
  })

  it('should have todo-list component', () => {
    const todoList = compiled.querySelector('todo-list')
    expect(todoList).not.toBeNull()
  })

  it('should have filters component', () => {
    const filters = compiled.querySelector('filters')
    expect(filters).not.toBeNull()
  })
})

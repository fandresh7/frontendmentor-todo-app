import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MainHeaderComponent } from './main-header.component'

describe('MainHeaderComponent', () => {
  let fixture: ComponentFixture<MainHeaderComponent>
  let compiled: HTMLElement
  let component: MainHeaderComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainHeaderComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(MainHeaderComponent)
    compiled = fixture.nativeElement as HTMLElement
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render header element', () => {
    const header = compiled.querySelector('header')
    expect(header).not.toBeNull()
  })

  it('should render dark-mode-button component', () => {
    const darkModeButton = compiled.querySelector('dark-mode-button')
    expect(darkModeButton).not.toBeNull()
  })
})

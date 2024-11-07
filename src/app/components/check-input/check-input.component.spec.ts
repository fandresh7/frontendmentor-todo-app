import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CheckInputComponent } from './check-input.component'
import { DarkModeService } from '../../shared/services/dark-mode.service'

class MockDarkModeService {
  darkMode = jasmine.createSpy('darkMode')
}

describe('CheckInputComponent', () => {
  let component: CheckInputComponent
  let compiled: HTMLElement
  let fixture: ComponentFixture<CheckInputComponent>

  let darkModeService: MockDarkModeService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckInputComponent],
      providers: [
        {
          provide: DarkModeService,
          useClass: MockDarkModeService
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(CheckInputComponent)
    component = fixture.componentInstance
    compiled = fixture.nativeElement as HTMLElement

    darkModeService = TestBed.inject(DarkModeService) as unknown as MockDarkModeService

    fixture.componentRef.setInput('isCompleted', false)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should add "dark" class to the label when dark mode is enabled', () => {
    darkModeService.darkMode = jasmine.createSpy('darkMode').and.returnValue(true)
    fixture.detectChanges()

    const labelElement = component.label().nativeElement
    expect(labelElement.classList.contains('dark')).toBe(true)
  })

  it('should remove "dark" class from the label when dark mode is disabled', () => {
    darkModeService.darkMode = jasmine.createSpy('darkMode').and.returnValue(false)
    fixture.detectChanges()

    const labelElement = component.label().nativeElement
    expect(labelElement.classList.contains('dark')).toBe(false)
  })

  it('should emit isChecked event with the input’s checked value when toggleCompleted is called', () => {
    spyOn(component.isChecked, 'emit')

    const mockEvent: Partial<Event> = {
      target: { checked: true } as HTMLInputElement
    }

    component.toggleCompleted(mockEvent as Event)

    expect(component.isChecked.emit).toHaveBeenCalledWith(true)
  })

  it('should set the checkbox input to checked when isCompleted is true', () => {
    fixture.componentRef.setInput('isCompleted', true)
    fixture.detectChanges()

    const inputElement = compiled.querySelector('input')
    expect(inputElement?.checked).toBe(true)
  })

  it('should leave the checkbox input unchecked when isCompleted is false', () => {
    fixture.componentRef.setInput('isCompleted', false)
    fixture.detectChanges()

    const inputElement = compiled.querySelector('input')
    expect(inputElement?.checked).toBe(false)
  })

  it('should call toggleCompleted with the change event when checkbox state changes', () => {
    spyOn(component, 'toggleCompleted')

    const inputElement = compiled.querySelector('input')!
    inputElement.checked = true

    const changeEvent = new Event('change')
    inputElement.dispatchEvent(changeEvent)
    fixture.detectChanges()

    expect(component.toggleCompleted).toHaveBeenCalledWith(changeEvent)
  })
})

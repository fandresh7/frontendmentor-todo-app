import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DarkModeButtonComponent } from './dark-mode-button.component'
import { DarkModeService } from '../../shared/services/dark-mode.service'

class MockDarkModeService {
  darkMode = jasmine.createSpy('result').and.returnValue(false)
  toggleDarkMode = jasmine.createSpy('toggleDarkMode')
}

describe('DarkModeButtonComponent', () => {
  let component: DarkModeButtonComponent
  let compiled: HTMLElement
  let fixture: ComponentFixture<DarkModeButtonComponent>

  let mockDarkModeService: MockDarkModeService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkModeButtonComponent],
      providers: [{ provide: DarkModeService, useClass: MockDarkModeService }]
    }).compileComponents()

    fixture = TestBed.createComponent(DarkModeButtonComponent)
    compiled = fixture.nativeElement as HTMLElement
    component = fixture.componentInstance

    mockDarkModeService = TestBed.inject(DarkModeService) as unknown as MockDarkModeService
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize dark mode as disabled (false) by default', () => {
    expect(component.darkMode()).toBe(false)
  })

  it('should call toggleDarkMode on DarkModeService when toggleDarkMode is invoked on the component', () => {
    component.toggleDarkMode()

    expect(mockDarkModeService.toggleDarkMode).toHaveBeenCalled()
  })

  it('should enable dark mode when toggleDarkMode is called', () => {
    mockDarkModeService.darkMode.and.returnValue(true)
    component.toggleDarkMode()

    fixture.detectChanges()

    expect(component.darkMode()).toBe(true)
  })

  it('should render icon-sun component when darkMode is true', () => {
    mockDarkModeService.darkMode.and.returnValue(true)
    fixture.detectChanges()

    const iconSun = compiled.querySelector('icon-sun')
    expect(iconSun).not.toBeNull()
  })

  it('should render icon-moon component when darkMode is false', () => {
    mockDarkModeService.darkMode.and.returnValue(false)
    fixture.detectChanges()

    const iconMoon = compiled.querySelector('icon-moon')
    expect(iconMoon).not.toBeNull()
  })
})

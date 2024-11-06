import { TestBed } from '@angular/core/testing'
import { DarkModeService } from './dark-mode.service'
import { LocalStorageService } from './local-storage.service'

class MockLocalStorageService {
  setItem = jasmine.createSpy('setItem')
  getItem = jasmine.createSpy('getItem').withArgs('theme').and.returnValue('light')
}

describe('DarkModeService', () => {
  let service: DarkModeService
  let mockLocalStorageService: MockLocalStorageService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LocalStorageService,
          useClass: MockLocalStorageService
        }
      ]
    })

    service = TestBed.inject(DarkModeService)
    mockLocalStorageService = TestBed.inject(LocalStorageService) as unknown as MockLocalStorageService
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should toggle dark Mode to true, then to false when toggleDarkMode is called', () => {
    service.toggleDarkMode()
    expect(service.darkMode()).toBe(true)

    service.toggleDarkMode()
    expect(service.darkMode()).toBe(false)
  })

  it('should set dark mode to true if "theme" in localStorage is "dark"', () => {
    mockLocalStorageService.getItem.withArgs('theme').and.returnValue('dark')

    service['initDarkMode']()
    expect(service.darkMode()).toBe(true)
  })
})

import { DOCUMENT, isPlatformBrowser } from '@angular/common'
import { afterNextRender, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core'
import { LocalStorageService } from './local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private platformId = inject(PLATFORM_ID)
  private isBrowser = isPlatformBrowser(this.platformId)

  localStorageService = inject(LocalStorageService)
  document = inject(DOCUMENT)

  #darkModeSignal = signal<boolean>(false)
  darkMode = this.#darkModeSignal.asReadonly()

  constructor() {
    afterNextRender(() => {
      this.initDarkMode()
    })

    effect(() => {
      const darkMode = this.darkMode()
      if (this.isBrowser) this.localStorageService.setItem('theme', darkMode ? 'dark' : 'light')
    })
  }

  private initDarkMode() {
    const theme = this.localStorageService.getItem('theme')
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (theme === 'dark' || (!theme && prefersDarkMode)) {
      this.#darkModeSignal.set(true)
      this.document.documentElement.classList.add('dark')
    } else {
      this.document.documentElement.classList.remove('dark')
      this.#darkModeSignal.set(false)
    }
  }

  toggleDarkMode() {
    const isDarkMode = this.document.documentElement.classList.toggle('dark')
    this.#darkModeSignal.set(isDarkMode)
  }
}

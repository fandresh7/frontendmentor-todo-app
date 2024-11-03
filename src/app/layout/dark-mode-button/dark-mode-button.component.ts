import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { IconSunComponent, IconMoonComponent } from '../../shared/components/icons/icons.component'
import { DarkModeService } from '../../shared/services/dark-mode.service'

@Component({
  selector: 'dark-mode-button',
  standalone: true,
  imports: [IconSunComponent, IconMoonComponent],
  templateUrl: './dark-mode-button.component.html',
  styleUrl: './dark-mode-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DarkModeButtonComponent {
  darkModeService = inject(DarkModeService)
  darkMode = this.darkModeService.darkMode

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode()
  }
}

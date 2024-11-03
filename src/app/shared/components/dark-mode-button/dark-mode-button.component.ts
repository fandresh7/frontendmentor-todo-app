import { ChangeDetectionStrategy, Component } from '@angular/core'
import { IconSunComponent, IconMoonComponent } from '../icons/icons.component'

@Component({
  selector: 'dark-mode-button',
  standalone: true,
  imports: [IconSunComponent, IconMoonComponent],
  templateUrl: './dark-mode-button.component.html',
  styleUrl: './dark-mode-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DarkModeButtonComponent {}

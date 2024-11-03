import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DarkModeButtonComponent } from '../../shared/components/dark-mode-button/dark-mode-button.component'

@Component({
  selector: 'main-header',
  standalone: true,
  imports: [DarkModeButtonComponent],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainHeaderComponent {}

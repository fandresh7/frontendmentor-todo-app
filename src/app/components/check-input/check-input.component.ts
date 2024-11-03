import { ChangeDetectionStrategy, Component } from '@angular/core'
import { IconCheckComponent } from '../../shared/components/icons/icons.component'

@Component({
  selector: 'check-input',
  standalone: true,
  imports: [IconCheckComponent],
  templateUrl: './check-input.component.html',
  styleUrl: './check-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckInputComponent {}

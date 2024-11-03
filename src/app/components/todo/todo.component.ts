import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CheckInputComponent } from '../check-input/check-input.component'
import { IconCrossComponent } from '../../shared/components/icons/icons.component'

@Component({
  selector: 'todo',
  standalone: true,
  imports: [CheckInputComponent, IconCrossComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {}

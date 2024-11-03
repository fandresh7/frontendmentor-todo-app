import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CheckInputComponent } from '../check-input/check-input.component'

@Component({
  selector: 'todo-create',
  standalone: true,
  imports: [CheckInputComponent],
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCreateComponent {}

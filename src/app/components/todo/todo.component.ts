import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { CheckInputComponent } from '../check-input/check-input.component'
import { IconCrossComponent } from '../../shared/components/icons/icons.component'
import { Todo } from '../../models/todo'
import { NgClass } from '@angular/common'

@Component({
  selector: 'todo',
  standalone: true,
  imports: [CheckInputComponent, IconCrossComponent, NgClass],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {
  todo = input.required<Todo>()
}

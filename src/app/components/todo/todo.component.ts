import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import { CheckInputComponent } from '../check-input/check-input.component'
import { IconCrossComponent } from '../../shared/components/icons/icons.component'
import { Todo } from '../../models/todo'
import { NgClass } from '@angular/common'
import { TodosStore } from '../../store/todos.store'

@Component({
  selector: 'todo',
  standalone: true,
  imports: [CheckInputComponent, IconCrossComponent, NgClass],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {
  store = inject(TodosStore)

  todo = input.required<Todo>()

  async changeIsChecked(value: boolean) {
    const status = value ? 'completed' : 'active'
    await this.store.changeTodoStatus(this.todo().id, status)
  }

  async deleteTodo() {
    const id = this.todo().id
    await this.store.deleteTodo(id)
  }
}

import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core'
import { CheckInputComponent } from '../check-input/check-input.component'
import { IconCrossComponent, IconSpinComponent } from '../../shared/components/icons/icons.component'
import { Todo } from '../../models/todo'
import { NgClass } from '@angular/common'
import { TodosStore } from '../../store/todos.store'

@Component({
  selector: 'todo',
  standalone: true,
  imports: [CheckInputComponent, IconCrossComponent, NgClass, IconSpinComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {
  store = inject(TodosStore)

  todo = input.required<Todo>()

  loading = signal<boolean>(false)

  async changeIsChecked(value: boolean) {
    this.loading.set(true)

    const status = value ? 'completed' : 'active'
    await this.store.changeTodoStatus(this.todo().id, status)

    this.loading.set(false)
  }

  async deleteTodo() {
    this.loading.set(true)

    const id = this.todo().id
    await this.store.deleteTodo(id)

    this.loading.set(false)
  }
}

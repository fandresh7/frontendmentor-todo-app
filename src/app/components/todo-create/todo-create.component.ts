import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core'
import { CheckInputComponent } from '../check-input/check-input.component'
import { TodosStore } from '../../store/todos.store'

@Component({
  selector: 'todo-create',
  standalone: true,
  imports: [CheckInputComponent],
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCreateComponent {
  store = inject(TodosStore)

  input = viewChild.required<ElementRef<HTMLInputElement>>('input')

  isChecked = signal<boolean>(false)

  async createTodo(value: string) {
    const status = this.isChecked() ? 'completed' : 'active'
    await this.store.addTodo(value, status)

    this.input().nativeElement.value = ''
  }

  changeIsChecked(value: boolean) {
    this.isChecked.set(value)
  }
}

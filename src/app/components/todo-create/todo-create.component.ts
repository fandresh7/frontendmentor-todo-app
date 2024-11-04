import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core'
import { CheckInputComponent } from '../check-input/check-input.component'
import { TodosStore } from '../../store/todos.store'
import { IconSpinComponent } from '../../shared/components/icons/icons.component'

@Component({
  selector: 'todo-create',
  standalone: true,
  imports: [CheckInputComponent, IconSpinComponent],
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCreateComponent {
  store = inject(TodosStore)

  input = viewChild.required<ElementRef<HTMLInputElement>>('input')

  isChecked = signal<boolean>(false)
  loading = signal<boolean>(false)

  async createTodo(value: string) {
    if (!value) return

    this.loading.set(true)

    const status = this.isChecked() ? 'completed' : 'active'
    await this.store.addTodo(value, status)

    this.loading.set(false)

    setTimeout(() => {
      this.input().nativeElement.value = ''
      this.input().nativeElement.focus()
    })
  }

  async handleKeyup(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      await this.createTodo(value)
    }
  }

  changeIsChecked(value: boolean) {
    this.isChecked.set(value)
  }
}

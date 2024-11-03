import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { TodoComponent } from '../todo/todo.component'
import { TodoListFooterComponent } from '../todo-list-footer/todo-list-footer.component'
import { TodosStore } from '../../store/todos.store'

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [TodoComponent, TodoListFooterComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  store = inject(TodosStore)
}

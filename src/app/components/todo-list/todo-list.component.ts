import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TodoComponent } from '../todo/todo.component'
import { TodoListFooterComponent } from '../todo-list-footer/todo-list-footer.component'

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [TodoComponent, TodoListFooterComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {}

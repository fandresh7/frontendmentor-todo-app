import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop'
import { TodoComponent } from '../todo/todo.component'
import { TodoListFooterComponent } from '../todo-list-footer/todo-list-footer.component'
import { TodosStore } from '../../store/todos.store'
import { Todo } from '../../models/todo'
import { trigger, transition, style, animate } from '@angular/animations'

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [DragDropModule, TodoComponent, TodoListFooterComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('todoAnimation', [transition(':enter', [style({ opacity: 0, transform: 'translateY(-20px)' }), animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))])])]
})
export class TodoListComponent {
  store = inject(TodosStore)

  async drop(event: CdkDragDrop<Todo[]>) {
    const todos = event.container.data
    const todo = todos[event.previousIndex]

    await this.store.reorder(todo.id, event.currentIndex)
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FiltersComponent } from '../filters/filters.component'
import { TodosStore } from '../../store/todos.store'

@Component({
  selector: 'todo-list-footer',
  standalone: true,
  imports: [FiltersComponent],
  templateUrl: './todo-list-footer.component.html',
  styleUrl: './todo-list-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListFooterComponent {
  store = inject(TodosStore)
}

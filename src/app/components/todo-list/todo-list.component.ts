import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {}

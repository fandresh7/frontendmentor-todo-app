import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'todo',
  standalone: true,
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {}

import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MainHeaderComponent } from './layout/main-header/main-header.component'
import { TodoListComponent } from './components/todo-list/todo-list.component'
import { TodoCreateComponent } from './components/todo-create/todo-create.component'
import { FiltersComponent } from './components/filters/filters.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainHeaderComponent, TodoListComponent, TodoCreateComponent, FiltersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}

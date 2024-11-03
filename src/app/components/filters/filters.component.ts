import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Filter, TodosStore } from '../../store/todos.store'
import { NgClass } from '@angular/common'

@Component({
  selector: 'filters',
  standalone: true,
  imports: [NgClass],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent {
  store = inject(TodosStore)

  isActive(value: string) {
    const filter = this.store.filter()
    return filter === value
  }

  change(value: string) {
    this.store.updateFilter(value as Filter)
  }
}

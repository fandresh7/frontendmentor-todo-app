import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'filters',
  standalone: true,
  imports: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent {}

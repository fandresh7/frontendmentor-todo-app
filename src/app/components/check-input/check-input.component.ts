import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, output, viewChild } from '@angular/core'
import { IconCheckComponent } from '../../shared/components/icons/icons.component'
import { DarkModeService } from '../../shared/services/dark-mode.service'

@Component({
  selector: 'check-input',
  standalone: true,
  imports: [IconCheckComponent],
  templateUrl: './check-input.component.html',
  styleUrl: './check-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckInputComponent {
  darkModeService = inject(DarkModeService)

  isCompleted = input<boolean>(false)
  label = viewChild.required<ElementRef<HTMLLabelElement>>('label')

  isChecked = output<boolean>()

  constructor() {
    effect(() => {
      const darkMode = this.darkModeService.darkMode()

      if (darkMode) {
        this.label().nativeElement.classList.add('dark')
      } else {
        this.label().nativeElement.classList.remove('dark')
      }
    })
  }

  toggleCompleted(event: Event) {
    const input = event.target as HTMLInputElement
    this.isChecked.emit(input.checked)
  }
}

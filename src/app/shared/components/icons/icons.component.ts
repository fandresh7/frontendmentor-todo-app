import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'icon-check',
  standalone: true,
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="9">
    <path
      fill="none"
      stroke="#FFF"
      stroke-width="2"
      d="M1 4.304L3.696 7l6-6" />
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconCheckComponent {}

@Component({
  selector: 'icon-cross',
  standalone: true,
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18">
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconCrossComponent {}

@Component({
  selector: 'icon-moon',
  standalone: true,
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26">
    <path
      fill="#FFF"
      fill-rule="evenodd"
      d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z" />
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconMoonComponent {}

@Component({
  selector: 'icon-sun',
  standalone: true,
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26">
    <path
      fill="#FFF"
      fill-rule="evenodd"
      d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z" />
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconSunComponent {}

@Component({
  selector: 'icon-spin',
  standalone: true,
  template: `<svg
    class="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24">
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"></circle>
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconSpinComponent {}

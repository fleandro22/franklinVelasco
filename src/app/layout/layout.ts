import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <header class="layout-header">
      <h1>{{ title }}</h1>
    </header>

    <main class="layout-container">
      <router-outlet />
    </main>
  `,
  styles: `
    .layout-header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 1.5rem;
      background: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .layout-header h1 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #222288;
    }

    .layout-container {
      padding: 1.5rem;
      background-color: #f0f0f0;
    }
  `,
})
export class Layout {
  protected title = 'BANCO';
}

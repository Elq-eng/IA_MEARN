import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-traslate-page',
  standalone:true,
  imports: [
    CommonModule
  ],
  templateUrl: './traslatePage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TraslatePageComponent { }

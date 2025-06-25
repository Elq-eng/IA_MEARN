import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-props-cons-stream-page',
  standalone:true,
  imports: [
    CommonModule
  ],
  templateUrl: './propsConsStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PropsConsStreamPageComponent { }

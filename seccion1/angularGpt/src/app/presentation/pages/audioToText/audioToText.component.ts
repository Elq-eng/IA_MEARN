import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-audio-to-text',
  standalone:true,
  imports: [
    CommonModule
  ],
  templateUrl: './audioToText.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextComponent { }

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-gpt-message-orthography',
  imports: [],
  templateUrl: './gptMessageOrthography.component.html',
  styleUrl: './gptMessageOrthography.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageOrthographyComponent {


  @Input({ required:true }) userScore!: number;
  @Input({ required:true }) text!: string;
  @Input() error:string[] = []

 }

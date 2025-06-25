import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-message',
  standalone:true,
  imports: [],
  templateUrl: './myMessage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyMessageComponent {

  @Input({ required: true}) text!:string ;
 }

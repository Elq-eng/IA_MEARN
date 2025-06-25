import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'


@Component({
  selector: 'app-text-messages-box',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './textMessagesBox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessagesBoxComponent {

  @Input() public placeholder:string='';
  @Input() public disableCorrections:boolean= false;
  @Output() public onMessage= new EventEmitter<string>();


  public fb = inject( FormBuilder )
  public form = this.fb.group({
    prompt: ['', Validators.required ]
  })

  handleSubmit(){

    if( this.form.invalid ) return;

    const { prompt } = this.form.value;

    this.onMessage.emit( prompt ?? '');
    this.form.reset()

  }



}

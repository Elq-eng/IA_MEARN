import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


interface Option {
  id:string;
  text: string;
}

export interface TextMessageBoxEvent {
  prompt: string;
  selectedOption:string;
}


@Component({
  selector: 'app-text-message-box-select',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './textMessageBoxSelect.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxSelectComponent {

  @Input() public placeholder:string='';
  @Input({required:true}) options!: Option[];
  @Output() public onMessage= new EventEmitter<TextMessageBoxEvent>();


  public fb = inject( FormBuilder )
  public form = this.fb.group({
    prompt: ['', Validators.required ],
    selectedOption: ['', Validators.required]
  })

  handleSubmit(){

    if( this.form.invalid ) return;

    const { prompt, selectedOption } = this.form.value;

    this.onMessage.emit( { prompt: prompt!, selectedOption: selectedOption!});
    this.form.reset()

  }


 }

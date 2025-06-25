import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';


export interface TextMessageEvent {
  file: File,
  prompt?: string | null
}

@Component({
  selector: 'app-text-messagebox-file',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './textMessageboxFile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageboxFileComponent { 


  @Input() public placeholder:string='';
  @Output() public onMessage= new EventEmitter<TextMessageEvent>();


  public fb = inject( FormBuilder )
  public form = this.fb.group({
    prompt: [ ],
    file: [null, Validators.required]
  })
  public file:File | undefined;

  handleSelectedFile( event:any ){
    const file = event.target.files.item(0)
    this.form.controls.file.setValue( file )
  }



  handleSubmit(){

    if( this.form.invalid ) return;

    const { prompt  = '', file} = this.form.value;

    this.onMessage.emit({ prompt, file:file! });
    this.form.reset()

  }


}

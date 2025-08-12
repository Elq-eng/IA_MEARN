import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageEvent } from '@components/text-boxes/textMessageboxFile/textMessageboxFile.component';
import { TextMessageBoxEvent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TextMessagesBoxComponent } from '@components/text-boxes/textMessagesBox/textMessagesBox.component';
import { TypingLoaderComponent } from '@components/TypingLoader/TypingLoader.component';
import { Message } from 'app/interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-props-cons-stream-page',
  standalone:true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessagesBoxComponent,
  ],
  templateUrl: './propsConsStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PropsConsStreamPageComponent { 



  public messages = signal<Message[]>([])
  public isLoading = signal( false );
  public openAiService = inject( OpenAiService )

  public abortSignal = new AbortController();


  async handleMessage( promp:string){

    this.abortSignal.abort()
    this.abortSignal = new AbortController();

    this.messages.update( prev => [
      ...prev,
      {
        isGpt:false,
        text: promp
      }
    ]);





    this.isLoading.set( true );
    const stream =  this.openAiService.prosconsStreamDiscusser( promp, this.abortSignal.signal)
    this.isLoading.set( true );
    
    for await ( const text of stream ){
      this.handleStreamResponse( text )
    }
  
  }

  handleStreamResponse( message:string ){


    this.messages().pop();
    const messages = this.messages();

    this.messages.set([...messages, { isGpt: true, text: message }])
  }

  handleMessageWithFile( { prompt, file}: TextMessageEvent){
    console.log({prompt,file})
  }

  handleMessageWithSelect( event: TextMessageBoxEvent ){
    console.log(event)
  }






}

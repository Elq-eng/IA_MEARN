import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageboxFileComponent, TextMessageEvent } from '@components/text-boxes/textMessageboxFile/textMessageboxFile.component';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TextMessagesBoxComponent } from '@components/text-boxes/textMessagesBox/textMessagesBox.component';
import { TypingLoaderComponent } from '@components/TypingLoader/TypingLoader.component';
import { Message } from 'app/interfaces';
import { OpenAiService } from '../../services/openai.service';
import { GptMessageOrthographyComponent } from '@components/chat-bubbles/gptMessageOrthography/gptMessageOrthography.component';

@Component({
  selector: 'app-orthography-page',
  standalone:true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessagesBoxComponent,
    TextMessageboxFileComponent,
    GptMessageOrthographyComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent { 

  public messages = signal<Message[]>([])
  public isLoading = signal( false );
  public openAiService = inject( OpenAiService )


  handleMessage( prompt:string){
    
    this.isLoading.set(true);

    this.messages.update( (prev) => [
      ...prev,
      {
        isGpt:false,
        text: prompt
      }
    ]);

    this.openAiService.checkOrthography( prompt )
      .subscribe( resp => {
        this.isLoading.set(false)

        this.messages.update( prev => [
          ...prev,
          {
            isGpt: true,
            text: resp.message,
            info: resp
          }
        ])
        console.log( resp )
      } )
  }

  // handleMessageWithFile( { prompt, file}: TextMessageEvent){
  //   console.log({prompt,file})
  // }

  // handleMessageWithSelect( event: TextMessageBoxEvent ){
  //   console.log(event)
  // }


}

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


  async handleMessage( promp:string){
    
    await this.openAiService.prosconsStreamDiscusser( promp )
  }

  handleMessageWithFile( { prompt, file}: TextMessageEvent){
    console.log({prompt,file})
  }

  handleMessageWithSelect( event: TextMessageBoxEvent ){
    console.log(event)
  }






}

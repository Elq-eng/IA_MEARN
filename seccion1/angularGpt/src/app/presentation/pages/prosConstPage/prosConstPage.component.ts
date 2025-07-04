import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessagesBoxComponent } from '@components/text-boxes/textMessagesBox/textMessagesBox.component';
import { TypingLoaderComponent } from '@components/TypingLoader/TypingLoader.component';
import { Message } from 'app/interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';


@Component({
  selector: 'app-pros-const-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessagesBoxComponent,
  ],
  templateUrl: './prosConstPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConstPageComponent { 



  public messages = signal<Message[]>([] )
  public isLoading = signal( false );
  public openAiService = inject( OpenAiService )


  handleMessage( promp:string){

    this.messages.update( (prev) => [...prev,
      {
        isGpt: false,
        text: promp

      }] );
    
    this.isLoading.set( true );
    this.openAiService.prosconsDiscusser( promp )
      .subscribe( resp => {
        this.isLoading.set( false );
        this.messages.update( (prev) => [...prev, 
          {
            isGpt: true,
            text:resp.content
          }
        ] ) 
      })


  }





}

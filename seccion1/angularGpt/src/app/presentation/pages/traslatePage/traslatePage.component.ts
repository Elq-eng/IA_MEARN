import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TextMessagesBoxComponent } from '@components/text-boxes/textMessagesBox/textMessagesBox.component';
import { TypingLoaderComponent } from '@components/TypingLoader/TypingLoader.component';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { Message } from 'app/interfaces';

@Component({
  selector: 'app-traslate-page',
  standalone:true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    // TextMessagesBoxComponent,
    // TextMessageboxFileComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './traslatePage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TraslatePageComponent {


  public messages = signal<Message[]>([])
  public isLoading = signal( false );
  public openAiService = inject( OpenAiService )

  public languages = signal([
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ])
  
  handleMessageWithSelect( {prompt, selectedOption }: TextMessageBoxEvent ){
    const message = `Traduce a ${ selectedOption }: ${prompt}`

    this.isLoading.set(true);

    this.messages.update( prev => [ 
      ...prev,
      {
        text: message,
        isGpt:false 
      }])
    
      this.openAiService.translateText( prompt, selectedOption )
        .subscribe( ({ message }) => {
          this.isLoading.set( false );
          this.messages.update( prev => [
            ...prev,
            { text:message, isGpt:true }
          ])
        })

  }



 }

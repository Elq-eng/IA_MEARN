


import { Injectable } from '@angular/core';
import { translateTextUseCase,orthographyUseCase, prosConsUseCase, prosConstStramUseCase, textToAudioUseCase } from 'app/core/use-cases';
import { from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {

  checkOrthography( prompt:string ){
    return from( orthographyUseCase( prompt ) )
  }

  prosconsDiscusser( prompt:string ){
    return from( prosConsUseCase( prompt ) )
  } 

  prosconsStreamDiscusser( prompt:string, abortSignal:AbortSignal){
    return ( prosConstStramUseCase(prompt, abortSignal) ) 
  } 

  translateText ( prompt:string, lang:string ){
    return from( translateTextUseCase( prompt, lang))
  }

  textToAudio ( prompt:string, voice:string ){
    return from( textToAudioUseCase( prompt, voice))
  }


}
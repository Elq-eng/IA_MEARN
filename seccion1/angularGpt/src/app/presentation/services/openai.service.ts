


import { Injectable } from '@angular/core';
import { orthographyUseCase, prosConsUseCase } from 'app/core/use-cases';
import { from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {

  checkOrthography( prompt:string ){
    return from( orthographyUseCase( prompt ) )
  }

  prosconsDiscusser( prompt:string ){
    return from( prosConsUseCase( prompt ) )
  } 

}
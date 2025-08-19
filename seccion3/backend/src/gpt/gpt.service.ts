
import * as path from 'path';
import * as fs from 'fs';


import { Injectable, NotFoundException } from '@nestjs/common';
import { orthographyCheckUseCase,prosConsDiscursserUseCase, prosConsDiscursserStreamUseCase,translateUseCase, textToAudioUseCase } from './use-cases';
import { OrthographyDto,ProsConsDiscursserDto, TextToAudioDto, TranslateDto } from './DTOs';
import OpenAI from 'openai';




@Injectable()
export class GptService {

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })


  // solo va a llamar casos de uso
  async orthographyCheck(orthographyDto:OrthographyDto){
    return await orthographyCheckUseCase( this.openai, {
      prompt: orthographyDto.prompt
    })
  }


  async prosConsDiscursser({ prompt }: ProsConsDiscursserDto) {
    return await prosConsDiscursserUseCase( this.openai, {prompt} )
  }


  prosConsDiscursserStream({ prompt }: ProsConsDiscursserDto) {
    return prosConsDiscursserStreamUseCase( this.openai, {prompt} )
  }


  async translateText({ prompt, lang } : TranslateDto) {
    return await translateUseCase( this.openai, { prompt, lang })
  }


  async textToAudio( { prompt, voice }: TextToAudioDto ) {

    return await textToAudioUseCase( this.openai, { prompt, voice } )
  }


  async textToAudioGetter( fileId: string) {


      const filePath  = path.resolve( __dirname, '../../generated/audios', `${fileId}.mp3`)

      const wasFound = fs.existsSync( filePath )

      if( !wasFound ) throw new NotFoundException( `File ${ fileId } nt found`)

      return filePath

  }

}

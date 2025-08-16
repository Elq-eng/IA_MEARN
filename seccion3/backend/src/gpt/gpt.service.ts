import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase,prosConsDiscursserUseCase, prosConsDiscursserStreamUseCase,translateUseCase } from './use-cases';
import { OrthographyDto,ProsConsDiscursserDto, TranslateDto } from './DTOs';
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



}

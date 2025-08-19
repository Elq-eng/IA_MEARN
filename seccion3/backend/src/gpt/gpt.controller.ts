import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto,ProsConsDiscursserDto, TextToAudioDto, TranslateDto } from './DTOs';
import type { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(
    @Body() orthographyDto: OrthographyDto
  ){

    return this.gptService.orthographyCheck( orthographyDto )
  }

  @Post('pros-cons-discusser')
  prosConsDicusser(
    @Body() prosConsDicusser:ProsConsDiscursserDto
  ){
    return this.gptService.prosConsDiscursser( prosConsDicusser )  
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body() prosConsDicusser:ProsConsDiscursserDto,
    @Res() res: Response
  ){
    const stream =  await this.gptService.prosConsDiscursserStream( prosConsDicusser )  
    
    res.setHeader('Content-Type', 'application/json');
    res.status( HttpStatus.OK );

    for await( const chunk of stream ){
      const piece = chunk.choices[0].delta.content || '';
      console.log(piece);
      res.write(piece);
    }
    res.end();
  }


  @Post( 'translate' )
  translateText(
    @Body() translateDto: TranslateDto,
  ){
    return this.gptService.translateText(translateDto)
  }



  @Post( 'text-to-audio' )
  async textToAudio(
    @Body() textToAudioDto: TextToAudioDto,
    @Res() res: Response
  ){

    const filePath = await this.gptService.textToAudio( textToAudioDto)
    
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK)
    res.sendFile(filePath);
  }


  @Get( 'text-to-audio/:fileId' )
  async textToAudioGetter(
    @Res() res: Response,
    @Param('fileId') fileId:string
  ){

    const filePath =  await this.gptService.textToAudioGetter( fileId )
    // const filePath = await this.gptService.textToAudio( textToAudioDto)
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK)
    res.sendFile(filePath);
  }

  





}

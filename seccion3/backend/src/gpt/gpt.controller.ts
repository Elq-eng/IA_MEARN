import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto,ProsConsDiscursserDto } from './DTOs';
import { Response } from 'express';

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


}

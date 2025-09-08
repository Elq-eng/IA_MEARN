import { Optional } from "@nestjs/common";
import { IsString } from "class-validator";



export class AudioToTextDto {

  @IsString()
  @Optional()
  readonly prompt:string



}
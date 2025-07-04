import { IsString } from "class-validator";



export class ProsConsDiscursserDto {

  @IsString()
  readonly prompt:string;
}
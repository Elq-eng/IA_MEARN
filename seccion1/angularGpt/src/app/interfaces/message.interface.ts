


export interface Message {
  text:string;
  isGpt:boolean;
  info?: {
    userScore: number;
    error: string[];
    message:string;
  }
}
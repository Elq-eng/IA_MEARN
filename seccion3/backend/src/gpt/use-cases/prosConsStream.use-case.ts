

import OpenAI from "openai";


interface Options {
  prompt:string;

}

export const prosConsDiscursserStreamUseCase = async ( openai: OpenAI,options:Options ) => {
    const { prompt } = options;
    

    const client = new OpenAI();


    return await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
          Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
          la respuesta debe de ser en formato markdown,
          los pros y contras deben de estar en una lista
          NO DEBES DAR UNA RESPUESTA SUPERIOR A 200 PALABRAS,
          `
        },
        {
          role:"user",
          content: prompt
        }
      ],
      stream: true,
      model:"gpt-4.1-nano",
      max_completion_tokens: 500,
      temperature:0.8
    })
}
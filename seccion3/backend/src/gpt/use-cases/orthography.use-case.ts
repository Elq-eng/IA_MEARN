import OpenAI from "openai";


interface Options {
  prompt:string;

}

export const orthographyCheckUseCase = async ( openai: OpenAI,options:Options ) => {
    const { prompt } = options;
    

    const client = new OpenAI();


    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
          Te seran proveidos textos en espaniol con posibles errores ortograficos y gramaticales, 
          Las palabras usadas deben existir en el diccionario de la real academia espaniola
          Debes de responder en formato JSON,
          tu tarea es corrergirlos y retornar informacion soluciones,
          tambien debes de dat un porcentaje de acierto por el usuario,

          Si no hay errores, debes de retornar un mensaje de felicitaciones
          Ejemplo de salida:
          {
            userScore: number,
            error: string[], // ['error -> solucion']
            message: string, //  texto para hablar al usuario
          }
          `
        },
        {
          role:"user",
          content: prompt
        }
      ],
      model:"gpt-4.1-nano",
      max_completion_tokens: 200,
      temperature:0.2
    })
    console.log(response.choices[0].message.content!)
    const jsonResp = JSON.parse( response.choices[0].message.content! );


    return jsonResp
}




import OpenAI from "openai";


interface Options {
  prompt:string;
  lang:string
}

export const translateUseCase = async ( openai: OpenAI, options:Options ) => {
    const { prompt, lang  } = options;
    

    const client = new OpenAI();


    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Traduce el siguiente texto al idioma ${lang}:${prompt}`
        }
      ],
      model:"gpt-4.1-nano",
      // max_completion_tokens: 500,
      temperature:0.2
    })

    return {message: response.choices[0].message.content}

}
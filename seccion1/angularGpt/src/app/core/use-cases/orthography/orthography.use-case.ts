import { OrthographyResponse } from "app/interfaces"
import { environment } from "environments/environment"



export const orthographyUseCase = async ( prompt: string )=> {


  try {

    const resp = await fetch(`${ environment.backendApi }/orthography-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })

    console.log({resp})
    if( !resp.ok ) throw new Error('No se pudo realizar la correccion')

    const data = await resp.json() as OrthographyResponse

    return {
      ok: true,
      ...data
    }


  } catch (error) {
    console.log({ error })
    return{
      ok:false,
      userScore:0,
      error:[],
      message: 'No se pudo realizar la corrreccion'
    }
  }
}
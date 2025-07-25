import type {  ProsConsResponse } from "app/interfaces"
import { environment } from "environments/environment"



export const prosConsUseCase = async ( prompt: string )=> {


  try {

    const resp = await fetch(`${ environment.backendApi }/pros-cons-discusser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })

    console.log({resp})
    if( !resp.ok ) throw new Error('No se pudo realizar la correccion')

    const data = await resp.json() as ProsConsResponse

    return {
      ok: true,
      ...data
    }


  } catch (error) {
    console.log({ error })
    // throw new Error('No se pudo realizar la discusion de pros y contras')
    return{
      ok:false,
      role:'',
      content: 'No se pudo realizar la discusion de pros y contras',
    }
  }
}
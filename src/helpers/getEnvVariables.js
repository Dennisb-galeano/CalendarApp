// Aca estan mis varuaibles de entorno del front,
// va a ser una FN que lo que va a retornar son mis variables de entorno
// https://es.vitejs.dev/guide/env-and-mode



export const  getEnvVariables = () => {

  import.meta.env; //estas son mis variavles de entorno

  return{
    ...import.meta.env //aca esparso mis variables de entorno
  }
}
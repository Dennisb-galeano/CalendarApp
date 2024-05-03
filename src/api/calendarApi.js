//calendarApi es NUESTRA INSTANCIA DE AXIOS
// en la carpeta api "aca" se puede cerear un archivo por endpoint, para autenticaciones y demas. aca solo calendar..
// si yo utilizo el calendarApi ya va a tener el URL pre configurado
// se utiliza en el hook useAuthStore


import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";  // Aca estan las varuaibles de entorno del front, es una FN que lo que va a retornar son mis variables de entorno


const { VITE_API_URL } = getEnvVariables() // esta variable esta en .env


const calendarApi = axios.create({
  baseURL: VITE_API_URL //la base del URL, sirva para no tener uqe especificar en todos los lugares la ruta.. se configura por defecto, la url en un principio es la del .env
});

//* Configurar intercemprores AXIOS - TODAS LAS PETICIONES VAN A MANDAR EL TOKEN
calendarApi.interceptors.request.use(config => { // nuestra instancia de axios es calendarApi, es request por que hago la solicitud. entonces antes de que HAGA La REQUEST.quiero que .use(este interceptor) "internamente el use se dispara con la CONFIG de esa peticion " y esa configuracion se regresa

  config.headers = {//esta es la config.. 
    ...config.headers, //esparce todos los headers uqe vengan en la config
    'x-token': localStorage.getItem('token') // 'x-token es mi header personalizado. el xtoken va a ser igual localStorage.getItem , al cuando lo tenga en el local storage le voy a mandar el 'token'. ESTO, para uqe cualquier peticion que haga con el calendarApi, le colouqe el header ' ELTOKEN', SIN EL TOKEN EL BACK LO MANDARA COMO UNDEFINED y el back regresael usuario como NO AUTENTICADO.

  }
  return config;
})


export default calendarApi;

/*INTERCEPTORES: vienen de los axios, permiten interceptar una petidcion antes o despues de que se haga y añadir o modificar la despuesta o informacion a la peticion
  Axios permite configurar interceptores: 
  permiten interceptar las peticiones. las que van al back o las que regresan. EN ESTE CASO se ocupa al hacer un REQUEST, se intercepta y se AÑADE la configuracion espefifica que se ocupa en los headers.
*/
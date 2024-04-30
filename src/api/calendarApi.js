// en la carpeta api "aca" se puede cerear un archivo por endpoint, para autenticaciones y demas. aca solo calendar..
// si yo utilizo el calendarApi ya va a tener el URL pre configurado
// se utiliza en el hook useAuthStore


import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";  // Aca estan las varuaibles de entorno del front, es una FN que lo que va a retornar son mis variables de entorno


const { VITE_API_URL} = getEnvVariables() // esta variable esta en .env


const calendarApi = axios.create ({ 
  baseURL: VITE_API_URL //la base del URL, sirva para no tener uqe especificar en todos los lugares la ruta.. se configura por defecto, la url en un principio es la del .env
});

//todo: configurar intercemprores


export default calendarApi;

//INTERCEPTORES: vienen de los axios, permiten interceptar una petidcion antes o despues de que se haga y añadir o modificar la despuesta o informacion a la peticion


// Hook useAuthStore: realiza cualquier interacion con la parTe del auth en nuestro store

// se usa en el loginPage

import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";


export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector( state => state.auth); // del state, me interesa que tomemos la parte del auth... del authSlice.js ,, validar los campos que voy a utilizar {...} esas propiedaddes se van a retornar de una vez.. van al return
  const dispatch = useDispatch();

  //proceso del login - es Asincorna por que es un proceso que llega al back

  const startLogin = async ({ email, password }) =>{ //desestructura los argumentos {recibo un objeto el email y el password} QUE VIENEN DE LA PETICION DEL BACKEND 10-CALENDAR-BACKEND
   
    //* LLEGAR AL BACKEND, mandarle la data
    try {
      const resp = await calendarApi.post('/auth', {email, password }); //le mando la direccion con mi peticion,osea el /auth - le mando el doy o la data, esta data es recibida de con las validaciones uqe hace el backend, en el routes >auth del 10-calendar-backend
    } catch (error) {

    }
  }


  return {
    //*properties - que voy a exponer al mundo exterior jaja
    errorMessage, 
    status, 
    user,

    //* metodos - acciones que van a poder llamar para interactuar con nuestro store (OTROS DESARROLLADORES)
    startLogin,

  }
}

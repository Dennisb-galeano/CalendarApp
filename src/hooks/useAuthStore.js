// Hook useAuthStore: realiza cualquier interacion con la parTe del auth en nuestro store

// se usa en el loginPage

import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/authSlice"; //pone la app en un esrado de carga


export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector(state => state.auth); // del state, me interesa que tomemos la parte del auth... del authSlice.js ,, validar los campos que voy a utilizar {...} esas propiedaddes se van a retornar de una vez.. van al return
  const dispatch = useDispatch();

  //proceso del login - es Asincorna por que es un proceso que llega al back

  const startLogin = async ({ email, password }) => { //desestructura los argumentos {recibo un objeto el email y el password} QUE VIENEN DE LA PETICION DEL BACKEND 10-CALENDAR-BACKEND
    //cuando empieza el login se va a hacer un dispatch de la accion del onCheking, si todo sale ok se dispara el onLogin del authSlice
    dispatch(onChecking());

    //* LLEGAR AL BACKEND, mandarle la data
    try {
      const { data } = await calendarApi.post('/auth', { email, password }); //le mando la direccion con mi peticion,osea el /auth - le mando el doy o la data, esta data es recibida de con las validaciones uqe hace el backend, en el routes >auth del 10-calendar-backend
      localStorage.setItem('token', data.token); //cuando todo sale bn solo necesito la data del token. se establece el 'token' en el local storage
      localStorage.setItem('token-init-date', new Date().getTime()); //acaba de crear el token en esa fecha. y se puede almacenar la fecha como un newdate.. es representar como un entero la fecha actual.
      dispatch(onLogin({ name: data.name, uid: data.uid })); //la accion deonligion esta esperando un payload y este es el ususaiio del authSlice. en mi resp voy a tener el user:osea name y el uid: que seria la data , si todo asale ok es lo que se va a grabar 


    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'));

      setTimeout(() => { //se dispara despues de 10milesimas de seg... se limpia el mensaje
        dispatch(clearErrorMessage());
      }, 10);
    }
  }


  //* crear un nuevo usuario 

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking()); //siempre se hace el dispatch de onCheking

    try {
      const { data } = await calendarApi.post('/auth/new', { name, email, password });
      localStorage.setItem('token', data.token); //cuando todo sale bn obtenermos el token. solo necesito la data del token. se establece el 'token' en el local storage
      localStorage.setItem('token-init-date', new Date().getTime()); //la fecha de inicializacion . acaba de crear el token en esa fecha. y se puede almacenar la fecha como un newdate.. es representar como un entero la fecha actual.

      dispatch(onLogin({ name: data.name, uid: data.uid })); //la accion deonligion esta esperando un payload y este es el ususaiio del authSlice. en mi resp voy a tener el user:osea name y el uid: que seria la data , si todo asale ok es lo que se va a grabar 


    } catch (error) {
      //para obtener el valor del error que (viene del back) en la response vieje la data y esa es la que vamos a obtener
      dispatch(onLogout(error.response.data?.msg || ''));  //el mensaje de error, si viene la data entonces envia el msg: 'que esta ene el back, si no el string vacio...o mensaje personalizado

      setTimeout(() => { //se dispara despues de 10milesimas de seg... se limpia el mensaje
        dispatch(clearErrorMessage());
      }, 10);
    }
  }

  //esta fn se llama en el appRouter,
  const checkAuthToken = async () => { //asincrona por que tengo que llegar al backend
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {  //pero si hay un token..
      const { data } = await calendarApi.get('auth/renew');
      localStorage.setItem('token', data.token); //cuando todo sale bn obtenermos el token. solo necesito la data del token. se establece el 'token' en el local storage
      localStorage.setItem('token-init-date', new Date().getTime()); //la fecha de inicializacion . acaba de crear el token en esa fecha. y se puede almacenar la fecha como un newdate.. es representar como un entero la fecha actual.
      dispatch(onLogin({ name: data.name, uid: data.uid })); //la accion deonligion esta esperando un payload y este es el ususaiio del authSlice. en mi resp voy a tener el user:osea name y el uid: que seria la data , si todo asale ok es lo que se va a grabar 

    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());

    }
  }

  return {
    //*properties - que voy a exponer al mundo exterior jaja
    errorMessage,
    status,
    user,

    //* metodos - acciones que van a poder llamar para interactuar con nuestro store (OTROS DESARROLLADORES)
    checkAuthToken,
    startLogin,
    startRegister,

  }
}

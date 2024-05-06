//dentro del calendarApp vamos a renderizar el appRouter

import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { useAuthStore } from "../hooks/useAuthStore";


export const AppRouter = () => {

  //Si se muestra ruta publica o privada

  const { status, checkAuthToken } = useAuthStore(); //se dispara antes de terminar si muestro el login o otra pantalla.. 
  // const authStatus = 'not-autenticated'; //'autenticated';

  useEffect(() => {
    checkAuthToken();
  }, []);


  if (status === 'checking') {
    return (
      <h3>Cargando...</h3> //como tiene el return, no se va a ejecutar el de abajo
    )
  }


  return (

    <Routes>
      {
        (status === 'not-authenticated') //vaamos a mostrar la ruta para el login, caso contrario

          ? (
            <>
              <Route path="/auth/*" element={<LoginPage />} />   {/* Ruta del Login - SI NO ! estoy auntetixado MANDAME A LOGINPAGE */}
              <Route path="/*" element={<Navigate to="/auth/login" />} />
            </>
          )
          : (
            <>
              <Route path="/" element={<CalendarPage />} /> {/* Ruta del calendarPage - de lo contrario - a calendar */}   
              <Route path="/*" element={<Navigate to="/" />} />   {/* cualquier ruta que no sea "/" va a navegar a la ruta / */}
            </>
          )

   



      }
    </Routes>

  )
}


{/* <Route path="/auth/*" element={ <LoginPage/>} />  */ }

/* 
cualquier ruta que entre /* va a mostrar el elemento principal seleccionado 
definir el reouter en el punto mas alto de la app. se va a crear en el CALENDARaPP
*/


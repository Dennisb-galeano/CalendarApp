//dentro del calendarApp vamos a renderizar el appRouter

import { Navigate, Route, Routes } from "react-router-dom";
import {LoginPage } from "../auth/pages/LoginPage";
import{ CalendarPage} from "../calendar/pages/CalendarPage";


export const AppRouter = () => {

  const authStatus = 'autenticated'; //'autenticated';

  return (
    
    <Routes>
      {
        (authStatus === 'not-autenticated') //vaamos a mostrar la ruta para el login, caso contrario
        ? <Route path="auth/*" element={<LoginPage/>} /> //SI NO ! estoy auntetixado MANDAME A LOGINPAGE
        : <Route path="/*" element={ <CalendarPage/>} /> //de lo contrario - a calendar 
      }

      <Route path="/*" element={ <Navigate to="/auth/login"/> }/>

    </Routes>

)
}


{/* <Route path="/auth/*" element={ <LoginPage/>} />  */}

/* 
cualquier ruta que entre /* va a mostrar el elemento principal seleccionado 
definir el reouter en el punto mas alto de la app. se va a crear en el CALENDARaPP
*/


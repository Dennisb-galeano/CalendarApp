
//el navbar lo va a renderizar Calendar Page
//se esta usando font-awesone, Los íconos de Font Awesome se colocan usando el prefijo fas y el nombre del ícono.

import { useAuthStore } from "../../hooks/useAuthStore"

export const NavBar = () => {

   const { startLogout, user } = useAuthStore(); // se encarga de los dispatch , selector etc.. el user es el uqe tenesmo en el Store
  return (
    <>
      <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">   {/* hace que aparezca en blanco,  */}
          <i className="fas fa-calendar-alt"> </i> {/*font-awsome: la etiqueta<i> icono de calendario</i> -alt"letra alternativa"" */}
          &nbsp;
          {user.name}
        </span>

        <button
          className="btn btn-outline-info"
          onClick={startLogout}
        >

          <i className="fas fa-sign-out-alt"> </i>  {/*  font-awsome: icono salir */}
          &nbsp;  {/*  separa un poco el icono de el spa */}
          <span>Salir</span>

        </button>


      </div>
    </>

  )
}

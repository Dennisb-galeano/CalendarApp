
//el navbar lo va a renderizar Calendar Page
//se esta usando font-awesone, Los íconos de Font Awesome se colocan usando el prefijo fas y el nombre del ícono.

export const NavBar = () => {
  return (
    <>
      <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">   {/* hace que aparezca en blanco,  */}
          <i className="fas fa-calendar-alt"> </i> {/*font-awsome: la etiqueta<i> icono de calendario</i> -alt"letra alternativa"" */}
          Encito precioso
        </span>
        <button className="btn btn-outline-info">
          <i className="fas fa-sign-out-alt"> </i>  {/*  font-awsome: icono salir */}
          <span>Salir</span>

        </button>


      </div>
    </>

  )
}

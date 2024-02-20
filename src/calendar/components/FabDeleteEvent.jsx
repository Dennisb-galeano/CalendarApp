// Floating Action Button (FAB) is a high-emphasis button that lets the user perform a primary action in an application
//agregar un nuevo evento

import { useCalendarStore } from "../../hooks/useCalendarStore";


export const FabDeleteEvent = () => {

    const { startDeletingEvent, hasEventSelected }= useCalendarStore();//limpiar la nota anterior en el nuevo modal , hasEventSelected(prop creada en useCalendarStore)
    
    const handleDelete =() => {
      startDeletingEvent(); //se toma el delete event del useCalendarStore
      
    
    }

  return (
    <button
      className="btn btn-danger fab-delete" //fab: Floating Action Button, clase fab-delete en css
      onClick={ handleDelete }
      style={{
        display: hasEventSelected ? '' : 'none' //hay un evento seleccionado ? no regreso nada, pero si no tenemos un evento seleccionado el display va a ser 'none'. asi el BOTON existe, solo uqe lo oculramos ono 
      }}
    >
       <i className="fas fa-trash-alt"> </i>  {/*icono de font awsome */}
    </button>
  )
}


/*
  COMPONNTE renderizado EN CalendarPage
1. crear el reducer  store > (calendarSlice) "onDeleteEvent"
      - disparar la accion > se exporta gracias a que esta creado el reducer "onDeleteEvent"

2. hacer la modificacion en el useCalendarStore
      - se ocupa una fn para mandar hacer el dispatch de esa accion ""

3. en el FabDeleteEvent  
    llamar el deleteEvent que se creó en el useCalendarStore    
*/      

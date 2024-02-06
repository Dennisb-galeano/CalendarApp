//este HOOK, va a tener la informacion del calendario por el Store.
// es el encargado de CUALQUIER INTERACCION uqe vaya a hacer con el store. asi se centraliza la logica. los demás componentes solo van a utilizar la informacion que este exporta 

import { useDispatch, useSelector } from "react-redux";
import { onSetActiveEvent } from "../store/calendar/calendarSlice";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector( state => state.calendar );


      const setActiveEvent = (calendarEvent) => { //me permitira hacer facil el dispatch de la accion del evento en el calendarSlice.js
        dispatch( onSetActiveEvent( calendarEvent) )

      }
  return {
    //propiedades
    activeEvent,
    events,

    //metodos
    setActiveEvent, //voy a llamar este evento conl el la accion(payload) que esta esperando
  }
  
}


//este hook va a tomar los eventos 
//1. useSelector (tenemos el state => del state me intersa tomar el calendar). del calentario me interesan los {eventos} 

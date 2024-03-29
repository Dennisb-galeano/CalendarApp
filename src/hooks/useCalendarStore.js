//este HOOK, va a tener la informacion del calendario por el Store.
// es el encargado de CUALQUIER INTERACCION uqe vaya a hacer con el store. asi se centraliza la logica. los demás componentes solo van a utilizar la informacion que este exporta 

import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";


export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);


  const setActiveEvent = (calendarEvent) => { //me permitira hacer facil el dispatch de la accion del evento en el calendarSlice.js
    dispatch(onSetActiveEvent(calendarEvent))
  }

  //forma sin usar thunks - usando fns sincronas
  const startSavingEvent = async (calendarEvent) => {  //va a iniciar el proceso de grabacion
    //todo: llegar al back
    //todo bien
    if (calendarEvent._id) { //tiene el id, esta actualizando 
      dispatch(onUpdateEvent({ ...calendarEvent })); //se manda el payload que seria l calendar event, {se rompel a referencia haceiendo el spread} para asegurar que se esta mandando un nuevo objeto 
    } else { //esta creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() })); //le mando el payload, ese tiene que se el evento del calendario listo
    }
  }

  const startDeletingEvent = () => { // fn para mandar hacer el dispatch de esa accion "vorrar el evento "nota""
    //TODO llegar al back 
    dispatch(onDeleteEvent());
  }

  return {
    //*propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent, //property, que se va a determinar haciendo la negacion ,,, si el active event, es NULL entonces regresa falso, si tiene un objeto regresa TRUE, asi puedo saber si hay un evento seleciconado o no

    //*Métodos
    startDeletingEvent, //retornar el dlete event
    setActiveEvent, //voy a llamar este evento conl el la accion(payload) que esta esperando
    startSavingEvent, //lo regresamos del useCalendarStore, lo va a llamar en el CalendarModal
  }

}


//este hook va a tomar los eventos
//1. useSelector (tenemos el state => del state me intersa tomar el calendar). del calentario me interesan los {eventos} 

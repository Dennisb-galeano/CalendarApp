//este HOOK, va a tener la informacion del calendario por el Store.
// es el encargado de CUALQUIER INTERACCION uqe vaya a hacer con el store. asi se centraliza la logica. los demás componentes solo van a utilizar la informacion que este exporta 

import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import { calendarApi } from "../api";


export const useCalendarStore = () => {


  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar); //useSelector, permite extraer datos del store
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = (calendarEvent) => { //me permitira hacer facil el dispatch de la accion del evento en el calendarSlice.js
    dispatch(onSetActiveEvent(calendarEvent))
  }

  //forma sin usar thunks - usando fns sincronas
  const startSavingEvent = async (calendarEvent) => {  //va a iniciar el proceso de grabacion
    //todo:Update Event


    if (calendarEvent._id) {
      //tiene el id, esta actualizando 
      dispatch(onUpdateEvent({ ...calendarEvent })); //se manda el payload que seria l calendar event, {se rompel a referencia haceiendo el spread} para asegurar que se esta mandando un nuevo objeto 
    } else {
      //esta creando
      const { data } = await calendarApi.post('/events', calendarEvent); // LLEGAR AL BACKEND - calendarApi llega al path, hasta /api por lo cual si queremos llegar a los eventos solo es necesario "/events". el calendarApi esta incrustando mediante interceptores el Token, asi, solo tengo que mandar a llamar el psot, y la informacion uqr me pide el bakcend, en este caso la informacion que tiene el calendar event
      console.log({ data });
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user })); //le mando el payload, ese tiene que se el evento del calendario listo. como ya tenemos la data se solicita la del evento. se proporciona el user tomado del store. (tomar el usuario uqe esta autenticado)
    }
  }

  const startDeletingEvent = () => { // fn para mandar hacer el dispatch de esa accion "vorrar el evento "nota""
    //TODO llegar al back 
    dispatch(onDeleteEvent());
  }


  const startLoadingEvents = async () => { //FN USADA EN CalendarPage.jsx  como va hasta el back es Asyncrona, 
    try {
      
      const { data } = await calendarApi.get('/events');   //hacer una peticion al back de trear la data, mediante una peticion get, con el endpoint o "ruta" de envents del backend. calendar api tiene la base de la tura configurada con vite
      console.log({data});
      
      const events = convertEventsToDateEvents(data.eventos); //el argumento es, data.eventos por uqe en el back esta en esp.
      dispatch(onLoadEvents(events)); //reducer creado en el calendar Slice, se mandan los eventos que ya han sido procesados y tienen la fecha
      // console.log(events);

    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
    }
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
    startLoadingEvents, //se dispara como un efecto, con el useEffect en calendar page
  }

}


//este hook va a tomar los eventos
//1. useSelector (tenemos el state => del state me intersa tomar el calendar). del calentario me interesan los {eventos} 

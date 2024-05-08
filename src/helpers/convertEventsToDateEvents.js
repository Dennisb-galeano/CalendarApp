// procesar la data que esta en el useCalendarStore, de la fn StartLoadingEvents. 
//convierte la fecha string de la en objeto fecha
//se usa en el useCalendarStore

import { parseISO } from "date-fns";


export const convertEventsToDateEvents = (events = []) => { //recibo los eventos, com estamos en JS se deja el valor por defecto en llaves para saber que estoy esperandop un evento
  
  return events.map(  event => { //regresa los eventos cuyas fechas tienen fecha tipo Date 

    event.start = parseISO( event.start);  //para convertir un string a una fecha se usa el parsISO , es un pauqete de fns
    event.end = parseISO( event.end);
    return event; //regresso el evento nuevamente
  }); 
}
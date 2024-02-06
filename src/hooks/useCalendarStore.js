//este HOOK, va a tener la informacion del calendario por el Store.
// es el encargado de CUALQUIER INTERACCION uqe vaya a hacer con el store. asi se centraliza la logica. los demás componentes solo van a utilizar la informacion que este exporta 

import { useSelector } from "react-redux";


export const useCalendarStore = () => {

    const {events, activeEvent} = useSelector( state => state.calendar );


  return {
    //propiedades
    activeEvent,
    events,

    //metodos

  }
  
}


//este hook va a tomar los eventos 
//1. useSelector (tenemos el state => del state me intersa tomar el calendar). del calentario me interesan los {eventos} 

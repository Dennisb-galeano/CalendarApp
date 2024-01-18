//calendar y login page van a mostrar las rutas
//AppRouter tiene la validacion de si esta o no auntenticado
//se hace la instalacion y config de React-big-calendar https://www.npmjs.com/package/react-big-calendar?activeTab=readme

import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // doc CSS de react-big-calendar

import { addHours } from 'date-fns';
import { NavBar } from "../components/NavBar";
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesEs } from '../getMessages';


//se le pueden agregar los eventos con la data que desee, la UNICA OBLIGATORIA ES EL TITTLE, EL START Y EL END
const events = [{
  title: 'Cumpleaños Encito',
  notes: 'Comprarle las Wischquitas',
  start: new Date(), //momenti enn que empueza el evento
  final: addHours(new Date(), 2), //puedo tomar un numero y una fecha y le sumo 2 horas 
  bgColor: '#fafafa',
  user: {  //se le pueden agregar los eventos con la data que desee, la UNICA OBLIGATORIA ES EL TITTLE, EL START Y EL END
    _id: '123',
    name: 'Enzo'
  }
}];




export const CalendarPage = () => {


  //esta fn me maneja el estilo de los eventos del calendario
  const eventStyleGetter = ( event,start, final, isSelected) => { //son los nombres de los arg qie se quieren dar, estan definidos en el calendar
    console.log({event,start, final, isSelected});

    const style={
      backgroundColor: '#020819',
      borderRadious: '1px',
      opacity: 0.8,
      color: '#44F8EC',
    }

    return{
      style
    }

  }

  return (
    <>
      <NavBar />

      <Calendar
        culture= 'es' //va a buscar un objeto en la var locales "calendarLocalizer.js" para cambiar el idioma a español
        localizer={localizer}
        events={events} //cambiar el eventr list con el que viene por mis propios eventos, con la const events
        startAccessor="start"
        endAccessor="final"
        style={ {height: 500 }} //calcule el 100% del view hight y restele 80px  '100vh - 80px'
        messages={ getMessagesEs() }  //fn en los helper getMessages.js
        eventPropGetter={ eventStyleGetter} //el evento del calendario me muestra uqe eventos se disparan con ella
     /> 

    </>

  )
}



// dateFnsLocalizer: me ayuda a colocar el idioma que yo necesite
//eventos en el calendario: eventPropGetter , eventStyleGetter

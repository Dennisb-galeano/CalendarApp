//calendar y login page van a mostrar las rutas
//AppRouter tiene la validacion de si esta o no auntenticado
//se hace la instalacion y config de React-big-calendar https://www.npmjs.com/package/react-big-calendar?activeTab=readme

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; //se umporta de ña doc de react-big-calendar

import enUS from 'date-fns/locale/en-US'
import { addHours, format, parse, startOfWeek, getDay } from 'date-fns';

import { NavBar } from "../components/NavBar";


const locales = { //idioma
  'en-US': enUS,
}


const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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
  return (
    <>
      <NavBar />

      <Calendar
        localizer={localizer}
        events={events} //cambiar el eventr list con el que viene por mis propios eventos, con la const events
        startAccessor="start"
        endAccessor="final"
        style={ {height: 500 }} //calcule el 100% del view hight y restele 80px  '100vh - 80px'
      />

    </>

  )
}



// dateFnsLocalizer: me ayuda a colocar el idioma que yo necesite

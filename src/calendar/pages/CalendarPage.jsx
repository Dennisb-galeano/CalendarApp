//calendar y login page van a mostrar las rutas
//AppRouter tiene la validacion de si esta o no auntenticado
//se hace la instalacion y config de React-big-calendar https://www.npmjs.com/package/react-big-calendar?activeTab=readme

import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // doc CSS de react-big-calendar

import { NavBar } from "../components/NavBar";
import { CalendarEventBox } from '../components/CalendarEventBox';
import { CalendarModal } from '../components/CalendarModal';
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesEs } from '../getMessages';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';
import { FabDeleteEvent } from '../components/FabDeleteEvent';


//se le pueden agregar los eventos con la data que desee, la UNICA OBLIGATORIA ES EL TITTLE, EL START Y EL END
//los eventos estan en el store


export const CalendarPage = () => {
  
  const{ openDateModal} = useUiStore(); //hook importado para el doble click, y voy a usar el metodo openDateModal, lo voy as usar en el evento onDoubleClik
  const {events, setActiveEvent } = useCalendarStore();

  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month');//se coloca en el local storage para que almacene el valor requrido que esta en el onView


  //esta fn me maneja el estilo de los eventos del calendario
  const eventStyleGetter = (event, start, final, isSelected) => { //son los nombres de los arg qie se quieren dar, estan definidos en el calendar
    // console.log({event,start, final, isSelected});

    const style = {
      backgroundColor: '#020819',
      borderRadious: '1px',
      opacity: 0.8,
      color: '#44F8EC',
    }

    return {
      style
    }
  }

  //conectar estos tres eventos cuando algo suceda en el calendar
  const onDoubleClick = (event) => {
    // console.log({ doubleClick: event });
    openDateModal();
  }

  const onSelectClick = (event) => { //este evento activa el evento de lla nota
    // console.log({ click: event });
    setActiveEvent(event);

  }

  const onViewchanged = (event) => { //cuando cambia la vista ,, se usa el State
    localStorage.setItem('lastView', event); //evento es "mes, dia o semana... "
  }




  return (
    <>
      <NavBar />

      <Calendar
        culture='es' //va a buscar un objeto en la var locales "calendarLocalizer.js" para cambiar el idioma a español
        localizer={localizer}
        events={events} //cambiar el eventr list con el que viene por mis propios eventos, con la const events
        defaultView={lastView} //AL RECARGAR colocar por defecto la view de agenda (dia, semana,mes) o con el lastView uqe se creo con un STATE, me mantiene el estado de la ultima pag en la que estuve " mes, dia año..."
        startAccessor="start"
        endAccessor="final"
        style={{ height: 500 }} //calcule el 100% del view hight y restele 80px  '100vh - 80px'
        messages={getMessagesEs()}  //fn en los helper getMessages.js
        eventPropGetter={eventStyleGetter} //el evento del calendario me muestra uqe eventos se disparan con ella
        components={{  // componentes:se pueden especificar un objeto donde esten todos los posibles eventos o componentes que se pueden sobreescribir, es. cambiar la fecha la hora, el dia
          event: CalendarEventBox // esta mandando la ref al copm calendarEventBox (no se manda como componente, espera un srtring, pero se recibe igual)
        }}
        onDoubleClickEvent={onDoubleClick} //los que emita el onSelectClick lo va a recibir el onDoubleClick
        onSelectEvent={onSelectClick}
        onView={onViewchanged}

      />
      <CalendarModal/>
       <FabAddNew/> {/*boton flotante - agredar evento*/}
       <FabDeleteEvent/> {/*boton flotante eliminar evento */}
       
        
    </>

  )  
}



// dateFnsLocalizer: me ayuda a colocar el idioma que yo necesite
//eventos en el calendario: eventPropGetter , eventStyleGetter

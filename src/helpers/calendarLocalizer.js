
// estas importaciones se encontraban en el CalendarPage. se pasaron para que el componente no iqede tan pesado de leer 


import { format, parse, startOfWeek, getDay } from 'date-fns';

import esES from 'date-fns/locale/es';
import { dateFnsLocalizer } from 'react-big-calendar';

const locales = { //idioma ser pasa a español
  'es': esES,  //
}

//esta fn se va a utilizar en el calendarPAage <calendar/>
export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});


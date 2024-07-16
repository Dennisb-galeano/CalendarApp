
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


//pasa con date-fns las letras a mayuscula la primera

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formats = { //cada fn de formats utiliza el localizer.format para formatear la fecha de ser necesario asegurando que la primera letra quede en mayuscula con  charAt(0).toUpperCase() junto con slice(1) para el resto del texto. 

  //muestra como se ven los encabezados del mes
  monthHeaderFormat: (date, culture, localizer) => {
    return capitalizeFirstLetter(localizer.format(date, 'MMMM yyyy', culture));
  },
  //muestra los dias de la semana en mayuscula, en la "Hoja" mes
  weekdayFormat: (date, culture, localizer) => {
    return capitalizeFirstLetter(localizer.format(date, 'EEEE', culture)); //
  },
  //muestra como se ven los ragos de los dias
  dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, 'MMMM dd', culture).charAt(0).toUpperCase() +
    localizer.format(start, 'MMMM dd', culture).slice(1) +
    ' a ' +
    localizer.format(end, 'MMMM dd', culture).charAt(0).toUpperCase() +
    localizer.format(end, 'MMMM dd', culture).slice(1),

  //muestra como se ven los encabezados de los dias
  dayHeaderFormat: (date, culture, localizer) =>
    localizer.format(date, 'EEEE dd', culture).charAt(0).toUpperCase() +
    localizer.format(date, 'EEEE dd', culture).slice(1) + ' de ' +
    localizer.format(date, 'MMMM', culture).charAt(0).toUpperCase() +
    localizer.format(date, 'MMMM', culture).slice(1),
};




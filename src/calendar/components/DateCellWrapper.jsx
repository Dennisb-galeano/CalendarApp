//componente usado en calendar page

import { colombianHolidays } from "colombian-holidays";
import React, { useMemo } from "react";
import { useCalendarStore } from "../../hooks/useCalendarStore";


export const DateCellWrapper = ({ value, children }) => {
  
  const holidays = useMemo(() => { // Calcula los días festivos solo una vez por cada año y almacena el resultado en memoria.
    return colombianHolidays(new Date().getFullYear()).map((colombianHoliday) => {
      
      const holidayDate = new Date(colombianHoliday.date);
      const nextMonday = (colombianHoliday.nextMonday);
      
      if(nextMonday ){ //si, next monday es true, pasar el dia festivo al lunes, de lo contrario no
        holidayDate.setUTCDate( holidayDate.getUTCDate() + ((8 - holidayDate.getUTCDay()) % 7 )); //calcula los dias restantes hasta el proximo lunes
        }

      return {
        title: colombianHoliday.name.es,
        nextMonday: nextMonday,
        date: new Date(Date.UTC(
          holidayDate.getUTCFullYear(),
          holidayDate.getUTCMonth(),
          holidayDate.getUTCDate()
        )),
      };
    });
  });

  const holidayInfo = holidays.find(holiday => 
    holiday.date.getUTCDate() === value.getUTCDate() &&
    holiday.date.getUTCMonth() === value.getUTCMonth() &&
    holiday.date.getUTCFullYear() === value.getUTCFullYear()
  );
  
  const isHoliday = Boolean(holidayInfo);

// date-cell, holiday y normal son mis estilos en CSS 
  const className = `date-cell ${isHoliday ? 'holiday' : 'normal'}`;



  return (
    
    <div className={className} >
      {isHoliday && holidayInfo && `${holidayInfo.title}`}
      {children}
    </div>
  );
};

//contatenado fecha_festivo
// (${holidayInfo.date.getUTCDate()}/${holidayInfo.date.getUTCMonth() + 1}/${holidayInfo.date.getUTCFullYear()})



//si, el evento esta activo, entonces DateCellWraper es null 
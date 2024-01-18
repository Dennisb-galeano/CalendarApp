//Esta fn la voyt a unsar en la opcion de messages del calendarPage
// estos valores 

export const getMessagesEs = () => {
  return {
    allDay: 'Todo el día',
    previous: '<',  //anteriormente back
    next: '>', //anteriormente Next
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango',
    showMore: total => `+ Ver más (${total})`
   };
}


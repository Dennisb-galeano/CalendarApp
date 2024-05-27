//majejara el store del calendario y los eventos 1 paso para enviar al Store. 2 imopoertar este slice en store.js

import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

//
// const temporalEvent = {
//   _id: new Date().getTime(),  //todas las notas deben tener _id: por evento para facilitar con el back
//   title: 'Cumpleaños Encito',
//   notes: 'Comprarle las Wischquitas',
//   start: new Date(), //momenti enn que empueza el evento
//   final: addHours(new Date(), 2), //puedo tomar un numero y una fecha y le sumo 2 horas 
//   bgColor: '#fafafa',
//   user: {  //se le pueden agregar los eventos con la data que desee, la UNICA OBLIGATORIA ES EL TITTLE, EL START Y EL END
//     _id: '123',
//     name: 'cheuz precioso',
//   }
// }

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true, //mi store sepa uqe estoy cargando, esta propiedad, cuando se crea el calendar slice va a empezar a cargar los enventos, cuando se mande a llamar el onLoadEvents se vana a empezar a cargar los eventos
    events: [
      //  temporalEvent
    ],
    activeEvent: null
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => { //se recibe el state una accion de aho extraemos el {payload} . acá va a estar el id de la nota uqe quiero activar
      state.activeEvent = payload; //lo uqe le mande se va a activar por el null line 24
    },
    onAddNewEvent: (state, { payload }) => { // en esta fn tengo el state y el action pero se ahi se desestructura el {payload}, este sería la nueva NOTA - lista para insertar a mis eventos 
      state.events.push(payload);  //por el toolkit es que se puede hacer el push, sin este NO es posible, por la mutacion de codigo que me permite hacer.
      state.activeEvent = null; //una vez se cierra el modal, hace una limpieza del evento activo
    },
    onUpdateEvent: (state, { payload }) => { //(se usa en el useCalndarStore) tenemos el state, la accion y de ahi {se extrae el payload}, si yo estoy actualizando un evento (debe tener un id ), perooo tengo uqe saber cual es el evento uqe quiero actualizar o reemplazar. el tookkit me deja tomar los eventos y sobreesqcribirlos, se usa el .MAP ( regresa un nuevo arreglo basado en EL VALOR DE RETORNO de ese arreglo )
      state.events = state.events.map(event => {
        if (event.id === payload.id) { //en el caso que el event.id sea exactamente igual a lo que me manda el payload regreso el payload ( es todo el evento activo)
          return payload; //este serpia el nuevo evento
        }

        return event;
      });
    },
    //si tenemos una nota activa, que la elimine
    onDeleteEvent: (state) => { //no es necesario el payload por uqe la eliminacion es elimiar la nota activa 
      if (state.activeEvent) { //si no tenemos una nota activa no debemos llegar al siguiente punto ( event => event._id !== state.activeEvent._id) por que genera un error en consola
        state.events = state.events.filter(event => event.id !== state.activeEvent.id); //regresa todos los eventos cuyo event._id sea diferente al state.active.... regresa todos los eventos cuyo id sea diferente al de la nota activa. entonces se va a eliminar del arreglo
        state.activeEvent = null; // pra no tener ninguna nota activa
      }
    },
    onLoadEvents: (state, { payload = [] }) => { //reducer, usado en useCalendarStore en ( fn startLoadingEvents  )cada vez uqe tenga eventos nuevo pueda reutilizar la fn
      state.isLoadingEvents = false; //isLoadingEvents es una propiedad uqe por defecto va a estar en true, en su estado inicial.  sin embargo cuando llega aca, cuando se mande llamar  va a estar en false,  por que ya voy a tener los enventos

      payload.forEach(event => { //forEach por que es un evento..
        const exists = state.events.some(dbEvent => dbEvent.id === event.id);   //crea flag  que me dice si el evento que estoy iterando en al payload ya existe en mi store, si existe NO voy a hacern nada, si no existe lo voy a insertar.
        if (!exists) {
          state.events.push(event)
        }
      })
    }, onLogoutCalendar: ( state) => { //se usa en el useAuthStore .se copia del initialstate, para dejar los valores  del estado inicial
      state.isLoadingEvents =  true, 
      state.events = [],
      state.activeEvent = null
    }

  }
});


// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;




//todas las notas deben tener _id: por evento para facilitar con el back
//al hacer lick se active la nota, se modificara el hook y el slice
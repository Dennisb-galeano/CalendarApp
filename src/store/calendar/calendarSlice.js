//majejara el store del calendario y los eventos 1 paso para enviar al Store. 2 imopoertar este slice en store.js

import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


const temporalEvent = {
  _id: new Date().getTime(),  //todas las notas deben tener _id: por evento para facilitar con el back
  title: 'Cumpleaños Encito',
  notes: 'Comprarle las Wischquitas',
  start: new Date(), //momenti enn que empueza el evento
  final: addHours(new Date(), 2), //puedo tomar un numero y una fecha y le sumo 2 horas 
  bgColor: '#fafafa',
  user: {  //se le pueden agregar los eventos con la data que desee, la UNICA OBLIGATORIA ES EL TITTLE, EL START Y EL END
    _id: '123',
    name: 'cheuz',
  }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [ temporalEvent ],
        activeEvent: null
    },
    reducers: {
      onSetActiveEvent: ( state, {payload} ) => { //se recibe el state una accion de aho extraemos el {payload} . acá va a estar el id de la nota uqe quiero activar
        state.activeEvent = payload; //lo uqe le mande se va a activar por el null line 24
      }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent } = calendarSlice.actions;




//todas las notas deben tener _id: por evento para facilitar con el back
//al hacer lick se active la nota, se modificara el hook y el slice
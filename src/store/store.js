import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { calendarSlice } from "./calendar/calendarSlice";

export const store = configureStore ({
  reducer: {
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer //tengo que mandar el reducer, no el Slice directo
  },
  //configuracion DEL middleware usando redux toolkit
  middleware: (GetDefaultMiddleware) => GetDefaultMiddleware({
    serializableCheck:false //configuracion para que no revise las fechas, si la puede serializar
  })
})



/*primera parte de config del toolkit
  - en el life "store.js", crear fn store usando el configureStore
    - crear file - uiSlices.js
     Crear Slices - con los reducer  (folder dentro del store)
      crear las acciones de los reducer
          sninpet slice - reduxSlice
          recucer, acciones ya se definen con ese snipet uqe se creo anteriormente, exportaracciomes
  - Store.js: importar en ui el reducer del Slice  dentro del configure store. "ui: uiSlice.reducer"
en la parte mas alta de mi proyecto (main ó calendarApp)
  - importar FN <provider store={store} /> mandandole todo el store, por encima del browserRouter o todos los componentes
  - VALIDAR DEVTOOLS en el navegador, debe contener lols valores del uiSlice, los valores del estado inicial "initialState"
*/



/* 
El middleware es software que permite uno o más tipos de comunicación o conectividad entre aplicaciones o componentes de aplicaciones en una red distribuida.
  es un tipo de software (middle significa “medio”) se coloca entre las diferentes aplicaciones y el sistema operativo que las tiene que ejecutar, con el objetivo de facilitar la comunicación de datos entre ellos.

  CONFIGURACION DEL middleware; para solucionar issue "A non-serializable value was detected in the state, in the path: `calendar.events.0.start`. Value: Tue Feb 20 2024 18:35:09 GMT-0500 (hora estándar de Colombia) "
  */
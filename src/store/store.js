import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { calendarSlice } from "./calendar/calendarSlice";

export const store = configureStore ({
  reducer: {
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer //tengo que mandar el reducer, no el Slice directo

  }

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
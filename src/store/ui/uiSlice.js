//mantener la infomracion del ui, si el modal esta abierto, cerrado, informacion del navegador que usa el cliente... etc
//sninpet slice - reduxSlice
    // recucer, acciones ya se definen con ese snipet uqe se creo anteriormente


import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false
    },
    reducers: { //acciones
        onOpenDateModal: ( state) => { //cuando se quiera abrir el modal se llama
          state.isDateModalOpen = true; //toolik me permite mutar el codigo (me geneera un nuevo state)
        },
        onCloseDateModal: (state) =>{
          state.onCloseDateModal = false;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
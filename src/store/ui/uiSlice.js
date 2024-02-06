//mantener la infomracion del ui, si el modal esta abierto, cerrado, informacion del navegador que usa el cliente... etc
//sninpet slice - reduxSlice
    // recucer, acciones ya se definen con ese snipet uqe se creo anteriormente


import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false //si se lococa en true, el modal aparecer desde el momento en uqe se recarga
    },
    reducers: { //acciones
        onOpenDateModal: ( state) => { //cuando se quiera abrir el modal se llama con un dispatch, en este caso se estan usando en el hook useUiStore
          state.isDateModalOpen = true; //toolik me permite mutar el codigo (me geneera un nuevo state)
        },
        onCloseDateModal: (state) =>{
          state.isDateModalOpen = false;
        }
    }
});

// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
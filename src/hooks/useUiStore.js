// este Custom hook: manejará y hará  dispatch de acciones además de controlar lo relacionado con el ui en el Store

import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

//useSelector me permite tomar PROPIEDADES del store
//el valor del ui se esta obteniendi del store.js, el isDateModalOpen de uiSlice.js (state=al Store)
// se utikliza en el calendar.modal.jsx, es el componente que necesita conocer el estado del modal si esta abuerto no no

export const useUiStore = () =>{

  const dispatch = useDispatch();

  const { isDateModalOpen} = useSelector( state => state.ui  ); //tengo acceso al state. y de ahi me interesa que me regrese el ui

  const openDateModal = () =>{
    dispatch( onOpenDateModal() ) //el onOpen.. esta dentroel store ... ui . en el uiSlice.js
    //para llegar a ese reducer necesit hacer el dispatc de una accion
  }

  const closeDateModal = () =>{
    dispatch( onCloseDateModal() )
  }

  return{ // return o exportar
    //propiedades 
      isDateModalOpen,

    //metodos
      closeDateModal, //se usa en el calendarModal.
      openDateModal, //puedo abrir el modal solo usando esta fn, se unsa en el calendarPage
  }
}
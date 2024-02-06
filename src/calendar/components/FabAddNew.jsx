// Floating Action Button (FAB) is a high-emphasis button that lets the user perform a primary action in an application

import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";



export const FabAddNew = () => {

    const {openDateModal} = useUiStore(); //abre el modal con el boton.
    const { setActiveEvent}= useCalendarStore();//limpiar la nota anterior en el nuevo modal
    
    const handleClickNewModal =() => {
      setActiveEvent({  //el nuevo evento activo que quiero antes que se abra el modal.. vienen del useCalendarStore... calendarSlice la data
        title: '',
        notes: '',
        start: new Date(), //momenti enn que empueza el evento
        final: addHours(new Date(), 2), //puedo tomar un numero y una fecha y le sumo 2 horas 
        bgColor: '#fafafa',
        user: {  //se le pueden agregar los eventos con la data que desee, la UNICA OBLIGATORIA ES EL TITTLE, EL START Y EL END
          _id: '123',
          name: 'cheuz',
        }      
      });
        openDateModal();
    }

  return (
    <button
      className="btn btn-primary fab" //fab: Floating Action Button, clase en styles
      onClick={ handleClickNewModal }
    >
       <i className="fas fa-plus"> </i>  {/*icono de font awsome */}

    </button>
  )
}


//si tiene ID me identifica si estoy creando uno nuevo o solo lo estoy actualizando
//si tengo _id : lo estoy actualizado
// si no tiene esta creando una nueva note,, en este caso NO va a llevar _id el objeto

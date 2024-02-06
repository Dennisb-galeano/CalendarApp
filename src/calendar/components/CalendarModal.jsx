//este FC tiene la configuracion inicial del modal de npm https://www.npmjs.com/package/react-modal
//se utilza en el calendar page


import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker'; //componente, se ca a usar en las fechas,, registerLocale: fn que necisto para cambiar lenguaje
import "react-datepicker/dist/react-datepicker.css"; //estilos del datePicker

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import es from 'date-fns/locale/es';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root'); //la informacion q contiene, es la info del ELEMENTO DEL HTML, que contiene la informacion de react.. en este caso el ROOT, Tiene la informacion del paquete

export const CalendarModal = () => {

  const { isDateModalOpen,closeDateModal } = useUiStore(); //propiedad fn en es useUiStore
  const [formSubmitted, setformSubmitted] = useState(false); //Si el titulo es incorrecto no me permita postear-submit // como esta en false. no se ha hecho el submit del formulario, y va a cambiar cuando la persona intente subir el formulario
  const { activeEvent } = useCalendarStore();


  //manejo del formulario tradicional - unsando la config de React-modal
  //realizar las conecciones del state con el formulario, en el input, formValues.xxx
  //actualizar el formulario con del useState para uqe se refleje el cambio. creo una fn onInputChanged, que es usada en el onchange
  //importar el 
  const [formValues, setformValues] = useState({ //cuando se crea un nuevo evento me saldra con la hora definida, unicamente
    title: '',
    notes: '',
    start: new Date(),  //react-modal requiere fecha inicio y fecha fin
    end: addHours(new Date(), 2), //agregarle 2 horas a la fecha con el addHours- se importan de 'date-fns'
  });

  const titleClass = useMemo(() => { // este hook lo uso en el input, para dar el color verdeo rojo uqeme informa si el  titulo cumple con las condiciones
     if (!!formSubmitted) return ''; //si formsubmit.. no se ha disparado, entonces return string vacio, si se disp.

      return( formValues.title.length > 2 )
        ?'is-valid'
        :'is-invalid';

    }, [ formValues.title, formSubmitted]); //2 dependencias 1.vuelve a memorizar si el titulo cambia 2. si el formSubmitted cambia 
      //el valor del tittle class se va a guardar solo si el titulo o el formSubmitt cambia  


      useEffect(() => {
        if (activeEvent !== null){
          setformValues({ ...activeEvent }) //fn del useState.. el spread rompe la ref... pasando las propiedades y creando un nuevo evento 

        }

      }, [ activeEvent]) //dependencia, el activeEvent, se toma del useCalendarStore. este efecgto se va a disparar cada vez que la nota cambie. PERO !! SI ES NULL 
      

  //asi actualiuzo el valor que viene el el target, lo uso en el titulo y en notes . con el onchange
  const onInputChanged = ({ target }) => {  //recibo el (event).. pero se va a desestructurar de aho el target ({ target})
    setformValues({
      ...formValues,
      [target.name]: target.value
    }) //esparcir todos los valores que tiene el formVlaue para no sbreesquibir el tiltulo o el start. o el end (todos los valores del objeto) sino un valor en especifico. en este caso el TARGET.name, con el valor de : target.value

  }
  const onDateChanged = (event, changing) => {
    setformValues({
      ...formValues,
      [changing]: event //tomo la propuedad changing "start o end" y va a erecibir la propiedad del evento
    })
  }


  const onCloseModal = () => {
    // console.log('cerrando el Modal');
    closeDateModal();
    // setisModalOpen(false); //cierra el modal,con el use state y modal isModalOpen
  }

  //posteo del formulario - va a recibirel evento del formulario, este se le manda al onSubit del Formulario. asi no hace refresh completo en las fechas y horario
  const onSubmit = (event) => {
    event.preventDefault(); //detener la propagacion  
    setformSubmitted(true); //la persona trato de hacer el posteo, por eso se deja en true


    //fecha final siemopre > a la inicial --- differenceInSeconds se importa de date-fns
    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) { //NaN - fecha no permitida o no exiset ya es de JS NO SE DEBE IMPORTAR NADA
      Swal.fire('Fechas incorrectas', 'Revisa las fechas ingresadas', 'error');
      return;
    }

    if (formValues.title.length <= 0) return;

    console.log(formValues);

  }

  return (

    <Modal
      isOpen={isDateModalOpen} //como el isOpen que de debe determinar si se deja abierto o cerrado, se crea el hook useUiStore.js que me provee desde el store si el modal se encuentra abierto o no
      onRequestClose={onCloseModal} //onrequiestClose, cierra el modal picando fuera de el en cualquier lugar
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200} //para que se cierre el modal con la animacion que defini en modal.
    >


      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker   /*componente importade de paquete, y enviarle info  */
            selected={formValues.start} //selected(fecha seleccionada) state
            onChange={(event) => onDateChanged(event, 'start')} //esra fn, me actualiza el valor selec en el calendario.Datepicker tiene el onchenge me va a dar el evento, uqe es la fecha que yo necesito llamar, el valor de la nueva fecha seleccioanda, creo fn onDateChanged, uqe recibe el evento(nueva fecha), el start o el end(changing)
            className='form-control'
            dateFormat='Pp' //hora minuto y seg
            showTimeSelect//propiedD - sale cuadro de seleccion de hora
            locale='es'
            timeCaption="Hora" //cambio de idioma toca manual 'Hora'



          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker   /*componente importade de paquete, y enviarle info  */
            minDate={formValues.start}//fecha minima a seleccionar
            selected={formValues.end} //selected(fecha seleccionada) state
            onChange={(event) => onDateChanged(event, 'end')} //esra fn, me actualiza el valor selec en el calendario.Datepicker tiene el onchenge me va a dar el evento, uqe es la fecha que yo necesito llamar, el valor de la nueva fecha seleccioanda, creo fn onDateChanged, uqe recibe el evento(nueva fecha), el start o el end(changing)
            className='form-control'
            dateFormat='Pp' //hora minuto y seg
            showTimeSelect //sale cuadro de seleccion de hora
            locale='es'
            timeCaption="Hora" //cambio de idioma toca manual 'Hora'

          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={ `form-control ${titleClass}` } //punta rojo el cuadro, se va a controlar el is invalid con el use memo 
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}


          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>

  )
}

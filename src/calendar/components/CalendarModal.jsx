//este FC tiene la configuracion inicial del modal de npm https://www.npmjs.com/package/react-modal
//se utilza en el calendar page


import { useState } from 'react';
import Modal from 'react-modal';
import { addHours } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker'; //componente, se ca a usar en las fechas,, registerLocale: fn que necisto para cambiar lenguaje
import "react-datepicker/dist/react-datepicker.css";  //estilos del datePicker
import es from 'date-fns/locale/es';

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

  const [isModalOpen, setisModalOpen] = useState(true)//un modal se debe manejar desde un store global,por di necesito abrirla en otros lugares

  //manejo del formulario tradicional - unsando la config de React-modal
  //realizar las conecciones del state con el formulario, en el input, formValues.xxx
  //actualizar el formulario con del useState para uqe se refleje el cambio. creo una fn onInputChanged, que es usada en el onchange
  //importar el 
  const [formValues, setformValues] = useState({
    title: 'Encito',
    notes: 'soy hermoso',
    start: new Date(),  //react-modal requiere fecha inicio y fecha fin
    end: addHours(new Date(), 2), //agregarle 2 horas a la fecha con el addHours- se importan de 'date-fns'
  })

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
    console.log('cerrando el Modal');
    setisModalOpen(false); //cierra el modal,con el use state y modal isModalOpen

  }


  return (

    <Modal
      isOpen={isModalOpen} //el react-modal necesita cuiertas propiedades, como el isOpen que de debe determinar si se deja abierto o cerrado  
      onRequestClose={onCloseModal} //es una fn uqe se va a disparar cuando se llame la forma de cerrar el MODAL "Dando click afuera o cerrandolo"
      style={customStyles}
      className={'modal'}
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200} //para que se cierre el modal con la animacion que defini en modal.
    >


      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker   /*componente importade de paquete, y enviarle info  */
            selected={formValues.start} //selected(fecha seleccionada) state
            onChange={(event) => onDateChanged(event, 'start')} //esra fn, me actualiza el valor selec en el calendario.Datepicker tiene el onchenge me va a dar el evento, uqe es la fecha que yo necesito llamar, el valor de la nueva fecha seleccioanda, creo fn onDateChanged, uqe recibe el evento(nueva fecha), el start o el end(changing)
            className='form-control'
            dateFormat='Pp' //hora minuto y seg
            showTimeSelect//sale cuadro de seleccion de hora
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

          />    </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
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

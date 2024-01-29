//este FC tiene la configuracion inicial del modal de npm https://www.npmjs.com/package/react-modal
//se utilza en el calendar page


import { useState } from 'react';
import Modal from 'react-modal';


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

  const onCloseModal = () =>{
    console.log( 'cerrando el Modal');
    setisModalOpen(false); //cierra el modal,con el use state y modal isModalOpen

  }

 
  return (
    
      <Modal
        isOpen={ isModalOpen} //el react-modal necesita cuiertas propiedades, como el isOpen que de debe determinar si se deja abierto o cerrado  
        onRequestClose={onCloseModal} //es una fn uqe se va a disparar cuando se llame la forma de cerrar el MODAL "Dando click afuera o cerrandolo"
        style={customStyles} 
        className={'modal'}
        overlayClassName={'modal-fondo'}
        closeTimeoutMS={200} //para que se cierre el modal con la animacion que defini en modal.
      >

        <h1> hola mundo</h1>
        <hr/>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident blanditiis, sed alias culpa, sequi cumque voluptate fugit perspiciatis deserunt est officia a vero, animi illo sunt dolore perferendis incidunt vel.  </p>
      </Modal>
    
    

    )
}

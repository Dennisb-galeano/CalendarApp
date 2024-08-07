import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';
import Swal from 'sweetalert2';
import background from '../../assets/Fondo_Calendar_page.jpg';


//Se Tienen dos Formularios en la misma pantalla, ENTONCES se van a crear dos formas para mantener el REGISTRO y el LOGIN de forma independiente. el custom hook mer permite tener tantas instancias DE FORMULARIOS en la pantalla como yo necesite.
//fields: campos

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}



export const LoginPage = () => {

    const { startLogin, errorMessage, startRegister } = useAuthStore(); //para estar pendientes del error message se crea el useEffect

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields); // importa el use Form de los Custom Hooks. el estaado inicial sera (...). se cambia el nombre del onImputchange por que este va a manejar el estado que tiene el loginFormFields, y se va a crear otra variable con la misma informacion con el  registerFormFields, se cambia para poder usar las dos. luego de crear esta variable se realizan las conexiones respectivas en el return del formulario
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields);

    const loginSubmit = (event) => { //este on submit me va a permitir recibir los valores solicitados y realizar el submit de los mismos
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword }); // esta fn viene del useAuthStore, esta para uqe interaccione el aunth con el store
        // console.log({ loginEmail, loginPassword });   
    }

    const registerFormSubmit = (event) => {
        event.preventDefault();
        if (registerPassword !== registerPassword2) { //en caso que sean diferentes se envia el return
            Swal.fire('Error en registro', 'Las Contraseñas no coinciden', 'error');
            return;
        }
        startRegister({ name: registerName, email: registerEmail, password: registerPassword, });
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la Autenticacion', errorMessage, 'error');
        }

    }, [errorMessage]) //dependencia es el errormessage, solo se va a mostrar si este es diferente de null



    return (
        <>
            <div className='background-image'
                style={{ backgroundImage: `url(${background}) ` }}
            >
                <div className="container login-container">
                    <div className='title'>
                        <h1> Shared calendar </h1>
                    </div>

                    <div className="container-forms">
                        
                        <div className="col-md-6 login-form-1">
                            
                            <h3>Ingreso</h3>
                            <form onSubmit={loginSubmit}>
                                <div className="form-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control border-3"
                                        placeholder="Correo"
                                        name="loginEmail"
                                        value={loginEmail}
                                        onChange={onLoginInputChange}


                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <input
                                        type="password"
                                        className="form-control border-3"
                                        placeholder="Contraseña"
                                        name="loginPassword"
                                        value={loginPassword}
                                        onChange={onLoginInputChange}
                                    />
                                </div>
                                <div className="d-grid gap-2">  {/*alarga el boton  */}
                                    <input
                                        type="submit"
                                        className="bg-dark btnSubmit" //tiene el estilo de btnSubmit
                                        value="Login"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className=" bg-dark col-md-6 login-form-2">
                            <h3>Registro</h3>
                            <form onSubmit={registerFormSubmit}>
                                <div className="form-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre"
                                        name="registerName"
                                        value={registerName}
                                        onChange={onRegisterInputChange}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Correo"
                                        name="registerEmail"
                                        value={registerEmail}
                                        onChange={onRegisterInputChange}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        name="registerPassword"
                                        value={registerPassword}
                                        onChange={onRegisterInputChange}

                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirme la contraseña"
                                        name="registerPassword2"
                                        value={registerPassword2}
                                        onChange={onRegisterInputChange}
                                    />
                                </div>

                                <div className="d-grid gap-2">
                                    <input
                                        type="submit"
                                        className="btnSubmit"
                                        value="Crear cuenta" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}






// export const LoginPage = () => {
//   return (
//       <div className="container login-container">
//           <div className="">
//               <div className="">
//                   <h3>Ingreso</h3>
//                   <form>
//                       <div className="">
//                           <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Correo"
//                           />
//                       </div>
//                       <div className="">
//                           <input
//                               type="password"
//                               className="form-control"
//                               placeholder="Contraseña"
//                           />
//                       </div>
//                       <div className="d-grid gap-2">
//                           <input
//                               type="submit"
//                               className="btnSubmit"
//                               value="Login"
//                           />
//                       </div>
//                   </form>
//               </div>

//               <div className="">
//                   <h3>Registro</h3>
//                   <form>
//                       <div className="">
//                           <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Nombre"
//                           />
//                       </div>
//                       <div className="">
//                           <input
//                               type="email"
//                               className="form-control"
//                               placeholder="Correo"
//                           />
//                       </div>
//                       <div className="">
//                           <input
//                               type="password"
//                               className="form-control"
//                               placeholder="Contraseña"
//                           />
//                       </div>

//                       <div className="">
//                           <input
//                               type="password"
//                               className="form-control"
//                               placeholder="Repita la contraseña"
//                           />
//                       </div>

//                       <div className="">
//                           <input
//                               type="submit"
//                               className="btnSubmit"
//                               value="Crear cuenta" />
//                       </div>
//                   </form>
//               </div>
//           </div>
//       </div>
//   )
// }
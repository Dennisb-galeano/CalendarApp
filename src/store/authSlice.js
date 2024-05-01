// redux-slice : Snipet que se creo para facilitar la creacion de los SLICES.
// authSlice nos ayudara a mantener el estado de la autenticacion en mi STORE; saber que mi usuario esta conectado.



import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {  //como va a lucir nuestro estado

    status: 'checking', //el estado inicial valida si esta o no autenticado
    user: {}, //user vacio para uqe siempre tengamos acceso a el
    errorMessage: undefined,
  },
  reducers: {  //generan un nuevo state, gracias al tooklot se puede mutar el codigo

    onChecking: (state, /* action */) => { //establecer mi estado de la autenticacion, un estado 'validando'
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => { //del action tomo el payload
      state.status = 'authenticated'; //cuandi mande llamar este reducer, quiere decir uqe l apersona estaautenticada
      state.user = payload; //el state.user va a ser lo que recibo del payload
      state.errorMessage = undefined; //en caso que quiera limpiar
    },
    onLogout: (state, { payload}) => { 
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = payload; //el error message, lo voy a extrar del payload,  
    },
    clearErrorMessage: (state) =>{ //limpiar el error
      state.errorMessage = undefined;
    }
  }

});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { store } from "./store/store";

//este es el componente mas alto en mi app


export const CalendarApp = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </>
  )
}

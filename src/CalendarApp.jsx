import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";

//este es el componente mas alto en mi app


export const CalendarApp = () => {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  )

}

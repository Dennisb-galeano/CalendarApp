//este componete  va a recibir variaas props



export const CalendarEventBox = ({ event} ) => {  //del evento se va a usar el usuario y el titulo de la nota

    const { user, title} =event;

  return (
    <>
    <span>{ user.name}</span>
    <strong>- { title} </strong>

    </>
  )
}

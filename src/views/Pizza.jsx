import React from 'react'
import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Context from '../Context'

const Pizza = () => {
  const {globalPizzaId, añadirPizza} = useContext(Context)
  const {id} = useParams()
 
  const {pizzaId} = globalPizzaId
  console.log(pizzaId)

  return (
    <>
    {pizzaId.id !== id?(
      <div>
        <h1>Pizza no encontrada...</h1>
      </div>
    ):(
      <div className='pizza'>
      <img src={pizzaId?.img} alt="imagen de pizza" className='img'/>
      <div className='container-pizza'>
        <h2>{pizzaId?.name}</h2>
        <p className='pizza-desc'>{pizzaId?.desc}</p>
        <p className='ingredients'>Ingredientes:</p>
        <ul>
          {
            pizzaId.ingredients?.map((p, index) =>{
              return <li key={index}>🍕{p}</li>
            })
          }
        </ul>
        <div className='container'>
        <span className='precio'>Precio: ${pizzaId?.price}</span>
        <div className='container--button'>
        <Link to='/home'><button className='button--volver'>Volver 🏠</button></Link>
        <button className='button añadir' onClick={() => añadirPizza(pizzaId)}>Añadir 🛒</button>
        </div>
        </div>
      </div>
    </div>
    )
  }
    </>
    
  )
}

export default Pizza
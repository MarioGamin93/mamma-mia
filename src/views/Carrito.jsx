import React from 'react'
import { useContext } from 'react'
import Context from '../Context'

const Carrito = () => {
  const {globalCarrito, globalTotal, globalIncrementar} = useContext(Context)
  const {carrito, setCarrito} = globalCarrito;
  const {total, setTotal} = globalTotal
  const {incrementar, setIncrementar } = globalIncrementar
  console.log(carrito)
  console.log(incrementar)

  //* usamos una función para incrementar la multiplicación del precio con la cantidad y ir aumentando la cantidad cada vez que le des click al botón +.
  const incrementarPizza = (pizza, index) =>{
    
    //* nombramos una variable y la igualamos con el estado carrito
    let nuevoCarrito = carrito

    //* nombramos una variable como cantidad para ir aumentando la cantidad a 1 cada vez que le demos click al boton
    let cantidad = pizza.cantidad +=1

    //* aqui igualamos el indice del carrito con la pizza 
    nuevoCarrito[index] = pizza

    console.log('el indice es '+index)

    //* aqui actualizamos el estado carrito llamando la variable nuevoCarrito
    setCarrito(nuevoCarrito)
    
    console.log(carrito)

    //* aqui actualizamos el estado incrementar llamando la variable cantidad
    setIncrementar(cantidad)

    //* aqui tenemos una variable de acumulador que comienza con 0, luego la usaremos en el ciclo para ir multiplicando el precio de la pizza con la cantidad
    let acumulador = 0;
      carrito.forEach((pizza) => {
        acumulador += pizza.price*cantidad;
        console.log(acumulador);
      });

      //* aqui finalmente actualizamos el estado de total llamando la variable acumulador
      setTotal(acumulador);
  }

  //* usamos una función para decrementar la multiplicación del precio con la cantidad y ir disminullendo la cantidad cada vez que le des click al botón - y ademas con una condicion de que cuando la cantidad sea igual o menor a 0 que se elimine la pizza.
  const decrementarPizza = (pizza, index) =>{
    let nuevoCarrito = carrito

    pizza.cantidad -=1
    nuevoCarrito[index] = pizza
    console.log('el indice es '+index)
    setCarrito(nuevoCarrito)
    
    console.log(carrito)
    setIncrementar(pizza.cantidad)
    let acumulador = 0;
      carrito.forEach((pizza) => {
        acumulador += pizza.price*pizza.cantidad;
        console.log(acumulador);
      });
      setTotal(acumulador);

      //* aqui tenemos una condición de que cuando la cantodad de la pizza sea menor o igual a 0 que sea eliminada junto con la cantidad y la suma acumulada de la pizza
      if(pizza.cantidad <= 0){
        let eliminar = carrito.filter((elemento) => elemento.id !== pizza.id)
        setCarrito(eliminar)
        pizza.cantidad = 0
        let acumulador = 0;
      carrito.forEach((pizza) => {
        acumulador += pizza.price*pizza.cantidad;
        console.log(acumulador);
      });
        setTotal(acumulador);
      }

  }

  //* usamos una contidicion para que cuando le des click al boton eliminar, que la pizza sea eliminada del carrito.
  const eliminarPizza = (pizza) =>{

    //* aqui usamos el metodo filter para filtrar el elemento y con la condicion de que si el id del elemento no sea indentico al id de pizz que se elimine 
    let eliminar = carrito.filter((elemento) => elemento.id !== pizza.id)

    //* aqui actualizamos el estado llamando la variable eliminar
    setCarrito(eliminar)

    //* aqui tenemos dos variables nombradas cantidad y acumulador con un valor de 0
    let cantidad = pizza.cantidad = 0
    let acumulador = 0;
    //* aqui usamos un ciclo para el carrito para que cuando la pizza que eliminemos, se elimine toda la suma acumulado con la cantidad
      carrito.forEach((pizza) => {
        acumulador += pizza.price*cantidad;
        console.log(acumulador);
      });

      //* aqui actualizamos el estado total llamando el acumulador
      setTotal(acumulador);
    console.log(pizza)
  }


  return (
    <div className='carrito'>
      <h1>Detalles de pedido:</h1>
      <div className='container-carrito'>
        {
          carrito.map((pizza, index) =>{
            return(
              <div className='carrito-card' key={pizza.id}>
                <div className='container-img'>
                  <img src={pizza.img} alt="imagen de pizza" className='carrito-img' />
                  <h3>{pizza.name}</h3>
                </div>

                <div className='container-price'>
                <span className='carrito-price' >${pizza.price*pizza.cantidad}</span>
                  <button className='button-carrito decrementar-carrito' onClick={()=> decrementarPizza(pizza, index)} >-</button>
                  <span className='cantidad'>{pizza.cantidad}</span>
                  <button className='button-carrito incrementar-carrito' onClick={ () => incrementarPizza(pizza, index)}>+</button>
                  <button className='eliminar' onClick={() => eliminarPizza(pizza)}>Eliminar</button>
                </div>
              </div>
            )
          })
        }
        <p className='total'>Total: $ {total} </p>
        <button className='pagar'>Ir a Pagar</button>

      </div>
      </div>
  )
}

export default Carrito
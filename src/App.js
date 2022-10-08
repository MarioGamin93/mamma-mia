import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Context from "./Context";
import Carrito from "./views/Carrito";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Pizza from "./views/Pizza";
import swal from 'sweetalert'

function App() {

  //* Estados de React 
  const [listaPizzas, setListaPizzas] = useState([]);
  const [pizzaId, setPizzaId] = useState([])
  const [carrito, setCarrito] = useState([])
  const [total, setTotal] = useState(0)
  const [incrementar, setIncrementar] = useState([])

  const globalPizzas = {listaPizzas, setListaPizzas}
  const globalPizzaId = {pizzaId, setPizzaId};
  const globalCarrito = {carrito, setCarrito};
  const globalTotal = {total, setTotal}
  const globalIncrementar = {incrementar, setIncrementar} 

  console.log(pizzaId)

  //* Usando una llamada asincrona con un metodo fetch para usar los datos de pizzas 
  const pizzasRender = async() =>{
    const url = '/pizzas.json';
    const response = await fetch(url);
    const data = await response.json()
    console.log(data)
    setListaPizzas(data)
  }

  //* Usando el efecto para mostrar por pantalla cuando las pizzas sean renderizadas
  useEffect(() =>{
    pizzasRender()
  }, [])

  //* usando una función para añadir las pizzas al carro
  const añadirPizza = (pizza) => {

    //* usamos el metodo findIndex para retornar el indice de la pizza
    let pizzaExistente = carrito.findIndex(
      (pizzaCarrito) => pizzaCarrito.id === pizza.id
    );
    console.log(pizzaExistente);

    //* aqui usamos una condición para que solo se añada la pizza cuando no se encuentre en el carro de compra 
    if (pizzaExistente === -1) {
      console.log("pizza no estaba en carrito");

      //* Aqui usamos una constante para añadir la pizza al carrito usando el spread operator para expandir el contenido del array
      const añadir = [...carrito, pizza];

      //* aqui actualizamos el estado de carrito y llamomos la constante añadir
      setCarrito(añadir);

      //* aqui tenemos una variable para añadir una cantidad a la pizza que sea añadida comenzando con un 1
      let cantidad = pizza.cantidad = 1

      //* aqui tenemos una variable llamada acumulador comenzando con 0 para luego utilizarlo con el ciclo para multiplicar el precio de la pizza con la cantidad
      let acumulador = 0;
      añadir.forEach((pizza) => {
        acumulador += pizza.price*cantidad;
        console.log(acumulador);
      //* aqui tenemos una alerta personalizada 
        swal({
          title: `Pizza ${pizza.name} añadida`,
          text: 'Revisa tu carro de compra 🛒',
          icon: 'success',
          button: 'Aceptar',
          timer: '2000'
        })
      });

      //* aqui actualizamos el estado total llamando el acumlador para mostrar el total cuando se este sumado cada precio que se esté añadiendo al carro
      setTotal(acumulador);
    }
  };

  return (
    <div className="App">
      <Context.Provider value={{globalPizzas, globalPizzaId, globalCarrito, globalTotal, globalIncrementar, añadirPizza}}>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/pizza/:id" element={<Pizza/>} />
          <Route path="/carrito" element={<Carrito/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;

import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Context from "../Context";

const Home = () => {
  const { globalPizzas, globalPizzaId, añadirPizza } = useContext(Context);
  const { listaPizzas } = globalPizzas;
  const { setPizzaId } = globalPizzaId;
  const navigate = useNavigate();

  const irAPizza = (pizza) => {
    navigate(`/pizza/${pizza.id}`);
    console.log(pizza);
    setPizzaId(pizza);
  };

  return (
    <>
      <Hero />
      <div className="container-pizzas">
        {listaPizzas.map((pizza) => {
          return (
            <div key={pizza.id} className="pizza-card">
              <img
                src={pizza.img}
                alt="imagen de pizza"
                className="pizza-img"
              />
              <h2 className="pizza-name">{pizza.name}</h2>
              <p className="pizza-ingredients">Ingredientes:</p>
              <ul>
                {pizza.ingredients.map((ingrediente, index) => {
                  return <li key={index}>🍕{ingrediente}</li>;
                })}
              </ul>
              <p className="pizza-price">${pizza.price}</p>
              <button
                className="button ver-mas"
                onClick={() => irAPizza(pizza)}
              >
                👀 Ver más
              </button>
              <button
                className="button añadir"
                onClick={() => añadirPizza(pizza)}
              >
                Añadir 🛒
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;

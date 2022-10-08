import React from 'react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Context from '../Context'

const Navbar = () => {
  const {globalTotal} = useContext(Context)
  const {total} = globalTotal
  return (
    <nav className='navbar'>
        <ul>
            <li>
                <NavLink to='/home'>🍕Pizzeria Mamma Mia!</NavLink>
            </li>
            <li>
                <NavLink to='/carrito'>🛒$ {total}</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
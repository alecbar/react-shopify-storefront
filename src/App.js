import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Products from './Products'
import Cart from './Cart'

const App = () => {

  // Fetch products
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  // Update product state

  // Add to cart
  const addToCart = (variant) => {
    setCart([...cart, variant])
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/">
            <div>
              <div>
                <p>Cart: {cart.length}</p>
              </div>
              <h1>Shop</h1>
              <Products addToCart={addToCart} />
            </div>
          </Route>
        </Switch>

      </div>
    </Router>
  )
}

export default App;

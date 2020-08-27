import React, {useState, useEffect} from 'react';
import Products from './Products'

const App = () => {

  // Fetch products
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  // Update product state

  // Add to cart
  const addToCart = (variant) => {
    setCart([...cart, variant])
  }

  return(
    <div>
      <div>
      <p>Cart: {cart.length}</p>
      </div>
      <h1>Shop</h1>
      <Products addToCart={addToCart}/>
    </div>
  )
}

export default App;

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

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  // Add to cart
  const addToCart = (variant) => {
    setCart([...cart, variant])
  }

  // Fetch Products
  const url = "https://alec-barnard-test-store.myshopify.com/api/2019-07/graphql.json"
  const query = `query {
    products(first: 10) {
      edges {
        node {
          title
          id
          images(first: 1) {
            edges {
              node {
                src
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                title
                id
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          description
        }
      }
    }
  }
  `
  const options = {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "X-Shopify-Storefront-Access-Token": "ddb9566657b8505494a79b2dc35212cc"
    },
    body: JSON.stringify({ "query": query })
  }

  useEffect(() => {

    // Fetch products
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        let products = data.data.products.edges.map(edge => {
          return {
            title: edge.node.title,
            _id: edge.node.id,
            description: edge.node.description,
            images: edge.node.images.edges,
            price: edge.node.priceRange.maxVariantPrice.amount,
            variants: edge.node.variants.edges,
          }
        })
        // Set products state
        console.log(JSON.stringify(products))
        setProducts(products)
      })
  }, [])

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Shop</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/cart">
            <Cart items={cart} />
          </Route>
          <Route path="/">
            <div>
              <div>
                <p>Cart: {cart.length}</p>
              </div>
              <Products products={products} addToCart={addToCart} />
            </div>
          </Route>
        </Switch>

      </div>
    </Router>
  )
}

export default App;

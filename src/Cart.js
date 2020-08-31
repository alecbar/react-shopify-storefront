import React, { useState, useEffect } from 'react'
import './cart.css'

const Cart = (props) => {

    const [checkoutUrl, setCheckoutUrl] = useState()

    // Create checkout 
    const url = "https://alec-barnard-test-store.myshopify.com/api/2019-07/graphql.json"
    const items = props.items.map(item => { return `{variantId: "${item.variant_id}", quantity: 1}`})
    console.log(items)
    const query = `mutation {
    checkoutCreate(input: {
      lineItems: [${items}]
    }) {
      checkout {
         webUrl
      }
    }
  }`

    const options = {
        method: "POST",
        headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "X-Shopify-Storefront-Access-Token": "ddb9566657b8505494a79b2dc35212cc"
        },
        body: JSON.stringify({ "query": query })
    }

    useEffect(()=> {
        if (props.items.length > 0) {
            
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    setCheckoutUrl(data.data.checkoutCreate.checkout.webUrl)
                })
        }
    }, [])

    return (
        <div>
            <p>Cart: {props.items.length}</p>
            <div>
                <ul className="cart">
                    {props.items.map((item, i) =>
                        <li key={i} className="cart-item">Name:{item.title} Size:{item.variant_title}</li>
                    )}
                </ul>
            </div>
            {props.items.length > 0 ? <a className="button" href={checkoutUrl}>Checkout</a> : <p>No items added yet.</p>}
        </div>
    )
}

export default Cart
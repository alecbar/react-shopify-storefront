import React, { useState, useEffect } from 'react'
import './cart.css'

const Cart = (props) => {

    const [checkoutUrl, setCheckoutUrl] = useState()

    useEffect(() => {
        if (props.items.length > 0) {

            // Create checkout 
            const url = "https://alec-barnard-test-store.myshopify.com/api/2019-07/graphql.json"
            const items = props.items.map(item => { return `{variantId: "${item.variant_id}", quantity: 1}` })
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

            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    setCheckoutUrl(data.data.checkoutCreate.checkout.webUrl)
                })
        }
    }, [props.items])

    return (
        <div>
            <div className="cart-div">
                {props.items.length > 0 ? <p>Items: {props.items.length}</p> : <p>Nothing in your cart yet. Start shopping <a href="/">here</a>.</p>}
                <ul className="cart">
                    {props.items.map((item, i) =>
                        <li key={i}
                            className="cart-item">
                            <div className="cart-details">
                                <div className="cart_title">{item.title}</div>
                                <div className="cart-image">
                                    <img src={item.image} alt={item.title}></img>
                                </div>
                                <div>
                                    Size: {item.variant_title}
                                </div>
                                <div>
                                    {item.description}
                                </div>
                                <div>
                                    ${item.price}
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
                {props.items.length > 0 ? <a className="button" href={checkoutUrl}>Checkout</a> : null}
            </div>
        </div>
    )
}

export default Cart
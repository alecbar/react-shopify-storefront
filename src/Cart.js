import React from 'react'
import './cart.css'


const Cart = (props) => {
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
            {props.items.length > 0 ? <button disabled="true">Checkout</button> : <p>No items added yet.</p>}
        </div>
    )
}

export default Cart
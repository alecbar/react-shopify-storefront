import React from 'react'
import './cart.css'

const Cart = (props) => {
    return (
        <div>
            <p>Cart: {props.items.length}</p>
            <div>
                <ul className="cart">
                    {props.items.map((item, i) => <li key={i}>- {item.title}</li>)}
                </ul>
            </div>
            {props.items.length > 0 ? <button>Checkout</button>: <p>No items added yet.</p>}
        </div>
    )
}

export default Cart
import React from 'react'
import './products.css';

const Product = () => {

    const addToCart = () => {
        console.log("Add to cart.")
    }

    const selectVariant = (e) => {
        console.log(e.target.id)
    }

    return (
        <div className="product">
            <h3>Product Title</h3>
            <p>Product Description</p>
            <p>$100</p>
            <img></img>
            <div>
                <ul className="variants">
                    <li id={9.5} onClick={selectVariant}>9.5</li>
                    <li>10</li>
                    <li>10.5</li>
                    <li>11</li>
                    <li>11.5</li>
                    <li>12</li>
                </ul>
            </div>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    )
}

const Products = () => {
    
    return (
        <div>
            <Product />
        </div>
    )
}

export default Products
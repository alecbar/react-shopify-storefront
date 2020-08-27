import React, { useState } from 'react'
import './products.css';

const Variant = (props) => {

    const [selected, setSelected] = useState(false)

    const handleClick = () => {
        // Set as selected variant on click
        // Do opposite if already selected
        if (selected) {
            setSelected(false)
            props.onClick(null)
        }
        else{
            setSelected(true)
            props.onClick(props.variant)
        }
    }

    return <li className={selected ? "selected" : null} onClick={handleClick}>{props.name}</li>
}

const Product = (props) => {

    // Selected variant to use for add to cart
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [error, setError] = useState(false)

    const addToCart = () => {
        if (selectedVariant) {
            props.addToCart(selectedVariant)
            console.log(selectedVariant, "added to cart.")
        }
        else {
            setError(true)
        }
    }

    const selectVariant = (variant) => {
        if(error){setError(false)}
        setSelectedVariant(variant)
    }

    return (
        <div className="product">
            <h3>Product Title</h3>
            <p>Product Description</p>
            <p>$100</p>
            <img></img>
            <div>
                <ul className="variants">
                    <Variant variant="9.5" name="9.5" onClick={selectVariant} />
                </ul>
            </div>
            <button className={selectedVariant ? "enabled" : "disabled"} onClick={addToCart}>Add to Cart</button>
            {error ? <p>Please select a size.</p> : null}
        </div>
    )
}

const Products = (props) => {

    return (
        <div>
            <Product addToCart={props.addToCart}/>
        </div>
    )
}

export default Products
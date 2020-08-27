import React, { useState } from 'react'
import './products.css';

const Variant = (props) => {

    const [selected, setSelected] = useState(props.selected)

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

    return <li className={props.selected ? "selected" : null} onClick={handleClick}>{props.name}</li>
}

const Product = (props) => {

    // Selected variant to use for add to cart
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [error, setError] = useState(false)

    const addToCart = () => {
        if (selectedVariant) {
            props.addToCart({title: props.product.title, id: selectedVariant})
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
            <p>{props.product.title}</p>
            <p>{props.product.price}</p>
            <img></img>
            <div>

                <ul className="variants">
                    {props.product.variants.map(variant => <Variant selected={selectedVariant == variant.node.id ? true: false} variant={variant.node.id} name={variant.node.title} onClick={selectVariant}/>)}
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
            {props.products.map(product => <Product product={product} addToCart={props.addToCart}/>)}
        </div>
    )
}

export default Products
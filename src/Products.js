import React, {useState} from 'react'
import './products.css';

const Variant = (props) => {
    return <li variant={props.variant} onClick={() => props.onClick(props.variant)}>{props.name}</li>
}

const Product = () => {

    // Selected variant to use for add to cart
    const [selectedVariant, setSelectedVariant] = useState(null)

    const addToCart = () => {
        console.log("Add to cart.")
    }

    const selectVariant = (variant) => {
        console.log(variant)
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
                    <li id={9.5} onClick={selectVariant}>9.5</li>
                    <Variant variant="9.5" name="Test" onClick={selectVariant}/>
                </ul>
            </div>
            <button className={selectedVariant? "enabled": "disabled"} onClick={addToCart}>Add to Cart</button>
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
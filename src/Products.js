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
            props.onClick(props.variant, props.name)
        }
    }

    return <li className={props.selected ? "selected" : null} onClick={handleClick}>{props.name}</li>
}

const Product = (props) => {

    // Selected variant to use for add to cart
    const [selectedVariant, setSelectedVariant] = useState({id: null, name: null})
    const [error, setError] = useState(false)

    const addToCart = () => {
        if (selectedVariant.id){
            // Might want to change what varlues are added here, both from main product and variant 
            props.addToCart({title: props.product.title, variant_id: selectedVariant.id, variant_title: selectedVariant.name})
            console.log(selectedVariant, "added to cart.")
        }
        else {
            // Error if no variant is selected
            setError(true)
        }
    }

    const selectVariant = (id, name) => {
        if(error){setError(false)}

    
        setSelectedVariant({id: id, name: name})
    }

    return (
        <div className="product">
            <div className="product-title"> 
                <h3>{props.product.title}</h3>
            </div>
            <img src="https://stockx-360.imgix.net//adidas-Yeezy-Boost-350-V2-Earth/Images/adidas-Yeezy-Boost-350-V2-Earth/Lv2/img01.jpg"></img>
            <div className="variants">

                <ul className="variants">
                    {props.product.variants.map(variant => <Variant selected={selectedVariant.id == variant.node.id ? true: false} variant={variant.node.id} name={variant.node.title} onClick={selectVariant}/>)}
                </ul>
            </div>
            <p>${props.product.price}</p>
            <button disabled={selectedVariant.id ? false : true} className={selectedVariant.id ? "enabled" : "disabled"} onClick={addToCart}>Add to Cart</button>
            {error ? <p>Please select a size.</p> : null}
        </div>
    )
}

const Products = (props) => {

    return (
        <div className="products">
            {props.products.map(product => <Product product={product} addToCart={props.addToCart}/>)}
        </div>
    )
}

export default Products
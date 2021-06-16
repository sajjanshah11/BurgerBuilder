import React from 'react';
import classes from './Order.css';

const Order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }
    const ingredientOutput = ingredients.map(igkey => {
        return <span
            style={{
                textTransform: 'capitalize',
                display:'inline-block',
                padding: '5px',
                margin: '5px',
                border:'1px solid #ccc'
            }}
            key={igkey.name}
        >{igkey.name} ({igkey.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients : {ingredientOutput}</p>
            <p> Price : <strong> USD {props.price} </strong></p>
        </div>
    );
}


export default Order;
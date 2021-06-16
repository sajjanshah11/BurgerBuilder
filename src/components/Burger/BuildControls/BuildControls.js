import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Vegetable', type: 'vegetable' }
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p> CurrentPrice: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientsAddition(ctrl.type)}
                removed={() => props.ingredientsRemover(ctrl.type)}
                disabled={props.disabled[ctrl.type]}

            />
        ))}
    
    <button 
    className= {classes.OrderButton}
    disabled = {!props.purchasable}
    onClick = {props.ordered}
    > ORDER NOW </button>
    </div>
)

export default buildControls;   
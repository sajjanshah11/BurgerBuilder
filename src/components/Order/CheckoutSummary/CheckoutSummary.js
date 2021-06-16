import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Modal/Button/Button';
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Yess!! We are ready to go </h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients = {props.ingredients} />
            </div>
            <Button 
                clicked={props.checkoutCancelled} 
                btntype="Danger" > CANCEL </Button >
            <Button 
                clicked={props.checkoutContinued} 
                btntype="Success" > CONTINUE </Button >
        </div>

    )
}


export default checkoutSummary;
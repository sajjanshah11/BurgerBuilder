import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Modal/Button/Button';


class OrderSummary extends Component {
    
    componentDidUpdate(){
        console.log('[OrderSummary will update]');
    }
    render() {
        const ingredientSummary = Object
            .keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span> : {this.props.ingredients[igKey]}
                </li>
            })
        return (
            <Auxiliary>
                <h3> Your Orders </h3>
                <p> A delicious burgers with following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout ?</p>
                <Button clicked={this.props.purchaseCancelled} btntype="Danger">CANCEL ORDER</Button>
                <Button clicked={this.props.purchaseContinued} btntype="Success">CONTINUE ORDER</Button>
            </Auxiliary>
        )
    }
} 

export default OrderSummary;
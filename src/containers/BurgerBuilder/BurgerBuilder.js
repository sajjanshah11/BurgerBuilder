import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Modal/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {

    state = {
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        // axios.get('https://react-my-burger-562da-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => {
        //         this.setState({ error: true })
        //     })
    }

    continueOrderHandler = () => {
        this.props.history.push('/checkout');

    }

    modalCloseHandler = () => {
        this.setState({ purchasing: false })
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true })
    }

    updatePurchaseState(ingredients) {
        const sum = Object
            .keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0;
    }


    render() {
        let orderSummary = null;

        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
            // console.log(disabledInfo[key]);
        }
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientsAddition={this.props.onIngredientAdded}
                        ingredientsRemover={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchasingHandler}
                    />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                price={this.props.price}
                ingredients={this.props.ings}
                purchaseCancelled={this.modalCloseHandler}
                purchaseContinued={this.continueOrderHandler} />

        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Auxiliary>
                <Modal
                    show={this.state.purchasing}
                    modelClosed={this.modalCloseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToprops = dispatch => {
    return {
        onIngredientAdded: (igName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: igName }),
        onIngredientRemoved: (igName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: igName})
    }

}

export default connect(mapStateToProps,mapDispatchToprops)(withErrorHandler(BurgerBuilder, axios));
import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        vegetable: 0
    },
    totalPrice: 4
}

//Global Constants
const INGREDIENT_PRICES = {
    vegetable: 0.3,
    salad: 0.8,
    bacon: 1.2,
    cheese: 0.9
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },

                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        default:
            return state;
    }

    // return state;
}

export default reducer;
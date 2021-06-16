import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';

const burger = (props) => {
    console.log(props);
    let transformedIngredients = Object
        .keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])]
                .map((_, i) => {
                    return <BurgerIngredient key={igKey + i} type={igKey} />
                })
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, [])
    
      console.log(transformedIngredients);   
    if (transformedIngredients.length < 1) {
        transformedIngredients = <p className={classes.p}>Please Start Adding Ingredients!</p>
    }
   
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default withRouter(burger);
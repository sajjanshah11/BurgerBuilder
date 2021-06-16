import React from 'react'; 
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

const navigationItems  = ()=> (
    <div>
        <ul className = {classes.NavigationItems}>
            <NavigationItem link = '/' exact> Burger Builder </NavigationItem>
            <NavigationItem link = '/orders'> Orders </NavigationItem>
        </ul>
    </div>
);

export default navigationItems;
import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Toolbar/NavigationItems/NavigationItems.js'
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Modal/BackDrop/BackDrop'
import Auxiliary from '../../../hoc/Auxiliary'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer , classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer , classes.Open];
    }


    return (
        <Auxiliary>
            <Backdrop show  = {props.open} clicked = {props.closed}/>
                <div className={attachedClasses.join(' ')}>
                    <div className={classes.Logo}>
                        <Logo />
                    </div>
                    <nav>
                        <NavigationItems />
                    </nav>
                </div>
        </Auxiliary>
    );
}

export default sideDrawer;
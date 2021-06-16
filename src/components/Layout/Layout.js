import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer:true
    }

    SideDrawerClosedHandler = ()=>{
        this.setState({showSideDrawer:false});
    }

    sideDrawerToogleHandler = () =>{
        this.setState((prevState)=>{
           return{showSideDrawer:!prevState.SideDrawer}
        })
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar drawerToogleClicked = {this.sideDrawerToogleHandler}/>
                <SideDrawer
                    open = {this.state.showSideDrawer}
                    closed = {this.SideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>

        )
    }
} 

export default Layout;
import React, { Component } from 'react';
import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary';
import BackDrop from '../Modal/BackDrop/BackDrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps , nextState){
        return nextProps.show  !== this.props.show || nextProps.children !== this.props.children;
    }
    
    componentWillUpdate(){
        console.log('[Model.js] will update')
    }
    render() {
        return (
            <Auxiliary>
                <BackDrop
                    show={this.props.show}
                    clicked={this.props.modelClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Auxiliary>
        )
    }
} 
export default Modal;
import React, { Component } from 'react';
import Button from '../../../../components/UI/Modal/Button/Button'
import { connect } from 'react-redux';
import classes from './ContactData.css';
import axios from '../../../../axios-orders';
import Spinner from '../../../../components/UI/Modal/Spinner/Spinner';
import Input from '../../../../components/UI/Modal/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation:{
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value:'',
                valid : true,
                validation:{}
            },
        },
        formisValid: false,
        loading: false,   
    }
    
    
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        
        const formData  = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false, })
            })
    }

    checkValidity(value , rules) {
        let isValid = true;
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        console.log(this.state.orderForm);
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        // console.log(updatedOrderForm);
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        // console.log(updatedFormElement);
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value ,updatedFormElement.validation );
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
           formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        // console.log(formIsValid);
        this.setState({ orderForm: updatedOrderForm, formIsValid:formIsValid});
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        // console.log(formElementArray);
        let form = (
            <form 
                onSubmit = {this.orderHandler}
                className={classes.Form}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid = {!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        touched = {formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btntype="Success" disabled = {!this.state.formIsValid}> ORDER </Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Fill this contact form </h4>
                {form}

            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.ingredients,
        price: state.price
    }
}

export default connect(mapStateToProps)(ContactData);
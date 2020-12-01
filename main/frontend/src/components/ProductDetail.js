import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'


export default class ProductDetail extends Component{
    constructor(props){
        super (props);
        this.state = {
            name: "",
            category_name: "",
            image: "",
            description: "",
            price: "",
            available: false
        }
        this.id = this.props.match.path.split("/product/")[1]
        this.getProductDetails();        
    }

    getProductDetails() {
        fetch(`http://127.0.0.1:8000/api/products/${this.id}`).then((response) =>
        response.json()).then((data) => {
            console.log(data)
            this.setState({
                name : data.name,
                category_name : data.category_name,
                image : data.image,
                description: data.description,
                price : data.price,
                available: data.available,
            });
        });
    }


    render(){
        let image = String(this.state.image).split('frontend')[1]
        return(
            <div>
                <h3>{this.state.name}</h3>
                <p>{this.state.category_name}</p>
                <p>{this.state.description}</p>
                <div><img src={image} width="200" height="200"/></div>
                <p>{this.state.price}</p>
                <p>{this.state.available}</p>
            </div>
        );
    }

}

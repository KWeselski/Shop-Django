import React, {Component} from 'react';
import {render} from 'react-dom';
import Navbar from './NavBar';
import ProductDiv from './ProductDiv';
import Grid from '@material-ui/core/Grid';
export default class ProductList extends Component{
    constructor(props){
        super (props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
         };
        }   
        
        componentDidMount(){
           fetch("api/products/").then(response => {
               if (response.status > 400) {
                   return this.setState(() => {
                       console.log('error')
                       return { placeholder: "Something went wrong"};
                   });
               }
               return response.json();
           })
         .then(data => {
             this.setState(() => {
                 return { 
                     data,
                     loaded:true
                 };
             });
         });
        }
    
    render(){
        if (this.state.loaded == true){
            let data_ = this.state.data;
        return(   
            <Grid container spacing={24}>
                {data_.map((value,index) => {                    
                return(
                    <div>
                    <Grid item xs={6}> <ProductDiv temp={data_[index]}/></Grid>
                    </div>)          
                })}
            </Grid>);
        }
        else{
            return(
                <div>Data not working</div>
            )
        };
        }
    }



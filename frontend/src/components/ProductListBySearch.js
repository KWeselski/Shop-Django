import React, {Component} from 'react';
import ProductDiv from './ProductDiv';
import Grid from '@material-ui/core/Grid';
import {productListBySearchURL} from './constants';
import {connect} from 'react-redux'
import axios from 'axios'

class ProductListBySearch extends Component{
    constructor(props){
        super (props);
        this.state = {
         data:[],
        };      
    }

    getProducts(){
        const { match : {params} } = this.props;
        console.log("Params",{params})
        axios.get(productListBySearchURL(params.query),{
            params: {query:params.query}
            }).then(res => {
            console.log(res.data)
            this.setState({data: res.data})          
        })

    }
             
    componentDidMount(){
        this.getProducts();
    }
    
    componentDidUpdate(prevProps){
        if(this.props.location !== prevProps.location){             
            this.getProducts()
        }
    } 

    render(){   
        const {data} = this.state; 
        console.log('Data:', data)   
        return(   
            <Grid container spacing={1} style={{marginTop:10}}>
                {data.map((value,index) => {                    
                return(
                    <Grid item> <ProductDiv temp={data[index]}/></Grid>
                    )          
                })}
            </Grid>);
        }
        };
const mapStateToProps = state => ({
        products: state.items,
        loading: state.loading,
        error: state.error
});

 
export default connect(mapStateToProps)(ProductListBySearch);    
import React , {Component} from 'react';
import Button from '@material-ui/core/Button';
import {categoryListURL} from "./constants";
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'
import {Link} from 'react-router-dom';




class CategoryList extends Component{
    constructor(props){
        super (props)

        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading",
         }; 
        }             
        async componentDidMount(){
           fetch(categoryListURL).then(response => {
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
            const { classes } = this.props;
            const {data, loaded} = this.state;
            if (this.state.loaded == true){
                let item = data;
            return(
                <div id="categoryList">
                    <ul>
                        {item.map((value,index) => {                    
                            return(
                                <div id="categoryButton">     
                                    <Button className={classes.btn} variant="contained">{value.name}</Button>
                                
                                </div>)          
                        })}
                    </ul>
                </div>
            )
            }
            else{return(<h1>Data is not working</h1>)}
        }
}
export default withStyles(styles)(CategoryList);

//<Link to={`/category/${value.slug}`}
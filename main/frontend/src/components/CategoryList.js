import React, {Component} from 'react';
import {categoryListURL} from "./constants";
import {Link, BrowserRouter as Router, Switch} from 'react-router-dom';
import {List, ListItem, ListItemText, Button,Typography, Paper,Divider} from "@material-ui/core/"
import {withStyles} from "@material-ui/core/styles";


const styles = theme => ({
    linkItem: {
        textDecoration: 'none',
        flexGrow:1,
    },
    listItem: {    
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        height:'60',
    }
});


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
            const {classes} = this.props;
            const {data} = this.state;
            if (this.state.loaded == true){
                let item = data;     
            return(
                    <List id='categoryList'>
                    <div style={{display:'flex'}}>               
                        <Link className={classes.linkItem} to={'/'}>
                            <ListItem  className={classes.listItem} button>
                                    <ListItemText disableTypography primary={<Typography variant='h9'>Wszystkie</Typography>}/> 
                            </ListItem> 
                        </Link>                                   
                        {item.map((value,index) => {                   
                            return(                                                         
                                <Link className={classes.linkItem} to={`/category/${value.slug}`}>  
                                    <ListItem className={classes.listItem} button>
                                        <ListItemText disableTypography primary={<Typography variant='h9'>{value.name}</Typography>}/> 
                                    </ListItem> 
                                </Link>                                                                                                                  
                            )          
                        })}
                        </div>
                    </List>                       
            )
            }
            else{return(<h1></h1>)}
        }
}
export default withStyles(styles)(CategoryList);


import React, {Component} from 'react';
import {categoryListURL} from "./constants";
import {Link, BrowserRouter as Router, Switch} from 'react-router-dom';
import {List, ListItem, ListItemText, Button,Typography, Paper} from "@material-ui/core/"
import {withStyles} from "@material-ui/core/styles";


const styles = theme => ({
    linkItem: {
        textDecoration: 'none',
    },
    listItem: {    
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'left',
        marginLeft: 20
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
                    <List >
                        <div>
                        <Paper elevation={3}>   
                        <Typography align='center' color='primary' variant='h4'>Categories</Typography>
                        <ListItem  className={classes.listItem} button>
                        <Link className={classes.linkItem} to={'/'}>
                                <ListItemText primary="Wszystkie"/>
                            </Link>
                        </ListItem>               
                        {item.map((value,index) => {                   
                            return(
                            <ListItem className={classes.listItem} button>
                                <Link className={classes.linkItem} to={`/category/${value.slug}`}>  
                                    <ListItemText  primary={value.name}/> 
                                </Link>          
                            </ListItem>                      
                            )          
                        })}
                        </Paper>
                        </div>
                    </List>                       
            )
            }
            else{return(<h1>Data is not working</h1>)}
        }
}
export default withStyles(styles)(CategoryList);


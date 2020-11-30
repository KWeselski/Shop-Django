import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


export default class ProductDiv extends Component {
    constructor(props){
        super (props);
        this.state = {
        } 
    }    
      
    render(){
        console.log(this.props)
        this.props.temp.image = String(this.props.temp.image).split('frontend')[1]
        return(   
        <Card className="ProductDiv">
            <CardActionArea>
                <CardMedia id="ProductImg" component={'img'}
                alt="Product"
                height="160"
                image={this.props.temp.image}
                title={this.props.temp.name}
                />
            </CardActionArea>
            <CardContent>
                 <Typography variant="body2" color="textSecondary" component="p">
                    {this.props.temp.category_name}
                </Typography>
                <Typography gutterBottom varian='h5' component='h2'>
                    {this.props.temp.name}
                </Typography>       
                <Typography gutterBottom varian='h5' component='h2'>
                    {this.props.temp.price} zł
                </Typography> 
            </CardContent>
        </Card>
    );
    }
}
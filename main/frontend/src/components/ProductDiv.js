import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {addToCart} from './actions/cartActions'


class ProductDiv extends Component {
    constructor(props){
        super (props);
        this.state = {
        }
        
    }
    render(){
        
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
                 <Typography style={{align:"center" }} variant="body2" color="textSecondary" component="p">
                    {this.props.temp.category_name}
                </Typography>
                <Typography  style={{align:"center" }}gutterBottom varian='h5' component='h2'>
                    {this.props.temp.name}
                </Typography>       
                <Typography style={{align:"center" }} gutterBottom varian='h5' component='h2'>
                    {this.props.temp.price} zł
                </Typography>
                <div>
                <Link to={`/product/${this.props.temp.id}`}>
                    <Button style={{width:100 }} variant="contained"  color='primary'>
                        Detail
                    </Button>
                </Link>
                
                </div>
            </CardContent>
        </Card>
    );
}
}


export default (ProductDiv)

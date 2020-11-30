import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


export default function ProductDiv() {

    return(
        <Card className="ProductDiv">
            <CardActionArea>
                <CardMedia component='img'
                alt="Product"
                height="120"
                image="./static/images/product.jpg"
                title="Product"
                />
            </CardActionArea>
            <CardContent>
                 <Typography variant="body2" color="textSecondary" component="p">
                    Category
                </Typography>
                <Typography gutterBottom varian='h5' component='h2'>
                    Product Name
                </Typography>       
                <Typography gutterBottom varian='h5' component='h2'>
                    Price
                </Typography> 
            </CardContent>
        </Card>
    );
}
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
import CartModal from './CartModal'


class ProductDiv extends Component {
    constructor(props){
        super (props);
        this.state = {
            hover: false,
            showModal: false
        }       
    }

    showModal = () => {
        this.setState({
            showModal: !this.state.showModal })
        
    }

    handleHoverOn = () => {
        this.setState({
            hover:true        
        });
    }
    handleHoveroff = () => {
        this.setState({
            hover:false           
        });
    }

    handleClick = (id) => {    
        this.props.addToCart(id);
        //this.showModal();
    }

    
    render(){     
        let image = String(this.props.temp.image).split('frontend')[1]
        let available = String(this.props.temp.available) ? 'Dostępny' : 'Niedostępny'  
        
        const backIsActive = this.state.hover ? 'shadow' : '';
        return(
        <div>  
        <div className={`ProductDiv ${backIsActive}`} onMouseEnter={this.handleHoverOn} onMouseLeave={this.handleHoveroff}> 
            <div className={`CardDescription`}>   
                <Typography variant="body2" color="textSecondary" component="p">
                    {this.props.temp.description}
                </Typography>
             </div>
             <div className={`CardContent`}>
                
                <div>
                    <CardMedia id="ProductImg" component={'img'}
                    alt="Product"
                    height="90"
                    image={image}
                    title={this.props.temp.name}
                    />
                </div>
                <CardContent>
                <Link style={{textDecoration:'none'}} to={`/product/${this.props.temp.id}`}>
                    <Typography color="primary" gutterBottom varian='h5' component='h2'>
                        {this.props.temp.name}     
                    </Typography>
                    </Link>  
                    <div className={"CardItems"}>
                        <Typography variant="body2" color="textSecondary" component="h2">
                            {this.props.temp.category_name}
                        </Typography>
                        {this.props.temp.on_discount ? (
                            <div style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
                            <Typography style={{color:'grey', textDecorationLine: 'line-through'}} gutterBottom component='h1'>{this.props.temp.price}$</Typography>
                            <Typography style={{color:'red'}} gutterBottom variant='h5' component='h6'>{this.props.temp.discount_price} $</Typography></div>)
                             : <Typography gutterBottom variant='h6' component='h1'>
                            {this.props.temp.price} $
                        </Typography>
                        }                      
                    </div>
                    
                <div className={`ProductContent`}>                            
                    <Button onClick={() => {this.handleClick(this.props.temp.id)}} style={{height:20, width:100}} variant="contained"  color='primary'>
                        Add                 
                    </Button>
                      
                </div>       
                </CardContent>                                
            </div>
            
        </div>
        <CartModal onClose={() =>{this.showModal()}} temp={this.props.temp} show={this.state.showModal}></CartModal> 
        </div>
    );
}
}

const mapDispatchToProps = (dispatch) => {
    return{  
      addToCart: (id) => {dispatch(addToCart(id))
      }
    }
}

export default connect(null,mapDispatchToProps)(ProductDiv);    

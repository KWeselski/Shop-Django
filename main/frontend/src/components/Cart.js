import React , {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeItem} from './actions/cartActions'


class Cart extends Component{

    handleRemove = (id) =>{
        this.props.removeItem(id);
    }

    render(){
        console.log(this.props)
        let addedItems = this.props.items.length ?
            (
                this.props.items.map(item => {
                    return(
                        <li key={item.id}>
                            <div>
                                <span>{item.name}</span>
                                <p>{item.description}</p>
                                <p><b>Price {item.price}$</b></p>
                                <p>
                                    <b></b>
                                </p>
                                <div className="add-remove">
                                    <Link to="/cart"><i className="material-icons" >arrow_drop_up</i></Link>
                                </div>
                            </div>
                            <button onClick={()=>{this.handleRemove(item.id)}}>Remove</button>
                        </li>
                    )
                })
            ):(
                <p>Nothing.</p>
            )
            return(
                <div className="container">
                    <div className="cart">
                        <h5>You have ordered: </h5>
                        <ul className="collection">
                            {addedItems}
                        </ul>
                    </div>
                </div>              
            )
    }
}

const mapStateToProps = (state) => {
    return{
        items: state.addedItems,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        removeItem: (id) => {dispatch(removeItem(id))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING, PRODUCTS_NAMES, ORDERS_NAMES} from './action-types/cart-actions'
import {productListURL,productDetailURL} from "../constants";
import axios from 'axios'

export function fetchProducts() {
    return dispatch => {
      dispatch(startFetchProducts());
      return fetch(productListURL).
        then(handleErrors)
        .then(res => res.json())
        .then(json => {       
            dispatch(
                finishFetchProducts(json));        
            return json;
        })
        .catch(error => dispatch(failFetchProducts(error)));
    };
}
export function fetchProductsID(id) {
    return dispatch => {
      dispatch(startFetchProducts());
      return fetch(productDetailURL(id)).
        then(handleErrors)
        .then(res => res.json())
        .then(json => {       
            dispatch(
                finishFetchProducts(json));
            
            return json;
        })
        .catch(error => dispatch(failFetchProducts(error)));
    };
}

export const orderAdd = (order_items) =>{  
    return dispatch => {
        dispatch(startAddOrder());
        axios.post("http://127.0.0.1:8000/api/create_order/",{
            order_items:order_items,            
            },
            {headers: {
                Authorization: `${localStorage.getItem("token")}`}
        }).then(()=>{     
            dispatch(finishAddOrder())
        }).catch(error => dispatch(failAddOrder(error)));
    };
};
   

function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  };

export const addToCart = (id) => {
    return{
        type:ADD_TO_CART,
        id
    }
};

export const removeItem = (id) => {
    return{
        type:REMOVE_ITEM,
        id
    }
};

export const subtractQuantity=(id)=>{
    return {
        type: SUB_QUANTITY,
        id
    }
};

export const addQuantity=(id)=>{
    return {
        type: ADD_QUANTITY,
        id
    }
};

export const startFetchProducts = () => ({
    type: PRODUCTS_NAMES.START_FETCH
});
export const failFetchProducts = error => ({
    type: PRODUCTS_NAMES.FAIL_FETCH,
    payload: {error}
});
export const finishFetchProducts = products => ({
    type: PRODUCTS_NAMES.FINISH_FETCH,
    payload:{products}
});

export const startAddOrder = () => ({
    type: ORDERS_NAMES.START_ORDER
})
export const finishAddOrder = () => ({
    type: ORDERS_NAMES.FINISH_ORDER,   
})
export const failAddOrder = error => ({
    type: ORDERS_NAMES.FAIL_ORDER,
    error: error
})
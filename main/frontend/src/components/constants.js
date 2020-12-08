const localhost = "http://127.0.0.1:8000";

const apiURL = "/api";
const AuthUrl = "/rest-auth"

export const endpoint = `${localhost}${apiURL}`;
export const authEndpoint = `${localhost}${AuthUrl}`;

export const productListURL = `${endpoint}/products/`;
export const productDetailURL = id => `${endpoint}/products/${id}`;
export const categoryListURL =`${endpoint}/category/`;
export const productListByCategoryURL = id =>`${endpoint}/category/${id}`;


export const loginUrl = `${authEndpoint}/login/`;
export const signUpUrl = `${authEndpoint}/registration/`;
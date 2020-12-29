const apiURL = "/api";
const AuthUrl = "/rest-auth"

export const endpoint = `${apiURL}`;
export const authEndpoint = `${AuthUrl}`;

export const productListURL = `${endpoint}/products/`;
export const productDetailURL = id => `${endpoint}/products/${id}`;
export const categoryListURL =`${endpoint}/category/`;
export const productListByCategoryURL = id =>`${endpoint}/category/${id}`;
export const productListByTypeURL = id =>`${endpoint}/type/${id}`;
export const productListBySearchURL = id => `${endpoint}/search/${id}`;

export const loginUrl = `${authEndpoint}/login/`;
export const signUpUrl = `${authEndpoint}/registration/`;

export const addCodeURL = `${endpoint}/add_code/`;
export const lastOrderURL = `${endpoint}/get_last_order/`;
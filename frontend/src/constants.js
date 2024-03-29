const apiURL = '/api';
const AuthUrl = '/rest-auth';

export const authEndpoint = `${AuthUrl}`;

export const productListURL = `${apiURL}/products/`;
export const productDetailURL = id => `${apiURL}/products/${id}`;
export const categoryListURL = `${apiURL}/category/`;
export const productListByCategoryURL = id => `${apiURL}/category/${id}`;
export const productListByTypeURL = id => `${apiURL}/type/${id}`;
export const productListBySearchURL = id => `${apiURL}/search/${id}`;
export const wishlistUrl = `${apiURL}/wishlist/`;
export const addToWishlistUrl = id => `${apiURL}/wishlist/add/${id}`;
export const deleteFromWishlistUrl = id => `${apiURL}/wishlist/delete/${id}`;

export const loginUrl = `${authEndpoint}/login/`;
export const signUpUrl = `${authEndpoint}/registration/`;

export const addCodeURL = `${apiURL}/add_code/`;

export const lastOrderURL = `${apiURL}/get_last_order/`;
export const createOrderURL = `${apiURL}/create_order/`;

export const getOpinionsURL = id => `${apiURL}/get_opinions/${id}`;
export const postOpinionURL = id => `${apiURL}/post_opinion/${id}`;

export const stripeURL = `${apiURL}/create_payment/`;
export const awsURL = 'https://valee-shop-bucket.s3.eu-central-1.amazonaws.com';

export const addAddressURL = `${apiURL}/add_address/`;
export const payOrderURL = `${apiURL}/pay_order/`;

export const MONTHS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12'
];

export const CREDIT_CARD_YEARS = [
  2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034,
  2035, 2036, 2037, 2038, 2039
];

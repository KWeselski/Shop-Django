import * as actionTypes from './action-types/auth-actions';
import {loginUrl, signUpUrl} from '../constants'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }

}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    return { type: actionTypes.AUTH_LOGOUT }
}

chectAuthTimeout = expirationTime => {
    return dispatch => { 
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    const data = {'username': username, 'password': password};
    return dispatch => {
        dispatch(authStart());
        fetch(loginUrl,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
            })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
                localStorage.setItem('token',token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
                dispatch(chectAuthTimeout(3600));
            })
            .then(data => {
                console.log('Succes:', data)
            })
            .catch(error => {
                dispatch(authFail(error))
            })
    }
}

export const authSignup = (username,email, password1, password2) => {
    const data = {'username': username,'email':email,'password1': password1, 'password2': password2};
    return dispatch => {
        dispatch(authStart());
        fetch(signUpUrl,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
            })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
                localStorage.setItem('token',token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
                dispatch(chectAuthTimeout(3600));
            })
            .then(data => {
                console.log('Succes:', data)
            })
            .catch(error => {
                console.log('Error', error)
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
      const token = localStorage.getItem("token");
      if (token === undefined) {
        dispatch(logout());
      } else {
        const expirationDate = new Date(localStorage.getItem("expirationDate"));
        if (expirationDate <= new Date()) {
          dispatch(logout());
        } else {
          dispatch(authSuccess(token));
          dispatch(
            checkAuthTimeout(
              (expirationDate.getTime() - new Date().getTime()) / 1000
            )
          );
        }
      }
    };
  };
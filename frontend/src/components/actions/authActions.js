import * as actionTypes from "./action-types/auth-actions";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    username: username
  };
};

export const resetPass = () => {
  return {
    type: actionTypes.RESET_PASS
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const authLogout = () => {
  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("/rest-auth/login/", {
        email: email,
        password: password
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token, email));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("/rest-auth/registration/", {
        username: email,
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token, email));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err.response.data));
      });
  };
};

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
        axios
          .get("/api/user_by_token/", {
            headers: { Authorization: `${localStorage.getItem("token")}` }
          })
          .then(res => {
            dispatch(authSuccess(token, res.data));
            dispatch(
              checkAuthTimeout(
                (expirationDate.getTime() - new Date().getTime()) / 1000
              )
            );
          });
      }
    }
  };
};

export const authResetPassword = email => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("/rest-auth/password/reset/", {
        email: email
      })
      .then(res => {
        dispatch(resetPass());
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authResetPasswordConfirm = (uid, token, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("/rest-auth/password/reset/confirm/", {
        uid: uid,
        token: token,
        new_password1: password1,
        new_password2: password2
      })
      .then(() => {
        dispatch(resetPass());
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

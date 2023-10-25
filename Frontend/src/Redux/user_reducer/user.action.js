import axios from "axios";
import Cookies from 'js-cookie';

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_REQUEST_SUCCESS = "USER_LOGIN_REQUEST_SUCCESS";
export const USER_LOGIN_REQUEST_FAIL = "USER_LOGIN_REQUEST_FAIL";
export const USER_LOGIN_REQUEST_ERROR = "USER_LOGIN_REQUEST_ERROR";

export const USER_SIGNUP_REQUEST = "USER_SIGNUP_REQUEST";
export const USER_SIGNUP_REQUEST_SUCCESS = "USER_SIGNUP_REQUEST_SUCCESS";
export const USER_SIGNUP_REQUEST_FAIL = "USER_SIGNUP_REQUEST_FAIL";
export const USER_SIGNUP_REQUEST_ERROR = "USER_SIGNUP_REQUEST_ERROR";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_REQUEST_SUCCESS = "USER_LOGOUT_REQUEST_SUCCESS";
export const USER_LOGOUT_REQUEST_FAIL = "USER_LOGOUT_REQUEST_FAIL";
export const USER_LOGOUT_REQUEST_ERROR = "USER_LOGOUT_REQUEST_ERROR";

export const USER_DETAIL_REQUEST = "USER_DETAIL_REQUEST";
export const USER_DETAIL_REQUEST_SUCCESS = "USER_DETAIL_REQUEST_SUCCESS";
export const USER_DETAIL_REQUEST_FAIL = "USER_DETAIL_REQUEST_FAIL";
export const USER_DETAIL_REQUEST_ERROR = "USER_DETAIL_REQUEST_ERROR";

export const userLoginAction = () => async (dispatch) => { };
export const userLogoutAction = () => async (dispatch) => { 
  dispatch({ type: USER_LOGOUT_REQUEST_SUCCESS });
};


export const getUserDetailAction = () => async (dispatch) => {
  const userToken = Cookies.get("userToken");
   dispatch({type:USER_DETAIL_REQUEST})
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`, {
      headers: headers,
    });
      console.log(response);
      dispatch({type:USER_DETAIL_REQUEST_SUCCESS,payload:response.data})
    // const blogResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/blogs?user=${userID}`)
    // console.log(response);
  } catch (error) {}
};

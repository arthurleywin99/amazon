import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
} from '../constants/userConstants'
import Axios from 'axios'

export const signup = (user) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: user,
  })
  try {
    const { data } = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,
      user
    )
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const signin = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: user })
  try {
    const { data } = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/signin`,
      user
    )
    localStorage.setItem('userInfo', JSON.stringify(data))
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

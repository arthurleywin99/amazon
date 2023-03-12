import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import {
  getProductByCategoryReducer,
  getProductByIdReducer,
  getProductTopDiscountReducer,
  getSamsungTopDiscountReducer,
} from './reducers/productReducers'
import { userRegisterReducer, userLoginReducer } from './reducers/userReducers'
import { getWebInfoReducer } from './reducers/webInfoReducers'

const initialState = {}

const reducer = combineReducers({
  getProductByCategory: getProductByCategoryReducer,
  getWebInfo: getWebInfoReducer,
  getProductTopDiscount: getProductTopDiscountReducer,
  getSamsungTopDiscount: getSamsungTopDiscountReducer,
  userRegister: userRegisterReducer,
  userSignin: userLoginReducer,
  getProductById: getProductByIdReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
)

export default store

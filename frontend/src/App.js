import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import HomeScreen from './screens/HomeScreen'
import {
  AccessoryComponent,
  CellphoneComponent,
  LaptopComponent,
  PcAndPrinterComponent,
  SmartwatchComponent,
  TabletComponent,
  UsedphoneComponent,
  WatchComponent,
} from './components/category/index'
import AccountScreen from './screens/AccountScreen'
import OrderCheckingScreen from './screens/OrderCheckingScreen'
import CartScreen from './screens/CartScreen'
import SearchScreen from './screens/SearchScreen'
import SigninScreen from './screens/SigninScreen'
import ProductScreen from './screens/ProductScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import CategoryScreen from './screens/CategoryScreen'
import PrivateRoute from './components/shared/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <div className='grid-container'>
        <Header />
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/category' element={<CategoryScreen />}>
            <Route path='cell-phones/order/:order' element={<CellphoneComponent />} />
            <Route path='laptops/order/:order' element={<LaptopComponent />} />
            <Route path='tablets/order/:order' element={<TabletComponent />} />
            <Route path='accessories/order/:order' element={<AccessoryComponent />} />
            <Route path='smart-watches/order/:order' element={<SmartwatchComponent />} />
            <Route path='watches/order/:order' element={<WatchComponent />} />
            <Route path='used-phones/order/:order' element={<UsedphoneComponent />} />
            <Route path='pc-printers/order/:order' element={<PcAndPrinterComponent />} />
          </Route>
          <Route
            path='/my-account'
            element={
              <PrivateRoute>
                <AccountScreen />
              </PrivateRoute>
            }
          />
          <Route path='/order-checking' element={<OrderCheckingScreen />} />
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/checkout' element={<CheckoutScreen />} />
          <Route path='/search' element={<SearchScreen />} />
          <Route path='/signin' element={<SigninScreen />} />
          <Route path='/product/:id' element={<ProductScreen />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

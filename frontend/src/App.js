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
import ActivatedScreen from './screens/ActivatedScreen'
import RatingScreen from './screens/RatingScreen'
import PrivateRoute from './components/shared/PrivateRoute'
import TokenRoute from './components/shared/TokenRoute'
import AdminScreen from './screens/AdminScreen'
import {
  AdminAccountComponent,
  AdminBrandComponent,
  AdminOrderComponent,
  AdminPermissionComponent,
  AdminProductComponent,
  AdminWebConfigComponent,
} from './components/admin/index'

function App() {
  return (
    <BrowserRouter>
      <div className='grid-container'>
        <Header />
        <Routes>
          {/* ADMIN ROUTE */}
          <Route path='/admin' element={<AdminScreen />}>
            <Route path='products' element={<AdminProductComponent />} />
            <Route path='brands' element={<AdminBrandComponent />} />
            <Route path='orders' element={<AdminOrderComponent />} />
            <Route path='accounts' element={<AdminAccountComponent />} />
            <Route path='web-configs' element={<AdminWebConfigComponent />} />
            <Route path='permissions' element={<AdminPermissionComponent />} />
          </Route>
          {/* USER ROUTE */}
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
                <TokenRoute>
                  <AccountScreen />
                </TokenRoute>
              </PrivateRoute>
            }
          />
          <Route
            path='/order-checking'
            element={
              <PrivateRoute>
                <TokenRoute>
                  <OrderCheckingScreen />
                </TokenRoute>
              </PrivateRoute>
            }
          />
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/checkout' element={<CheckoutScreen />} />
          <Route path='/search/:content/order/:order' element={<SearchScreen />} />
          <Route path='/signin' element={<SigninScreen />} />
          <Route path='/product/:id' element={<ProductScreen />} />
          <Route path='/activated' element={<ActivatedScreen />} />
          <Route
            path='/rating/order/:order/product/:product'
            element={
              <PrivateRoute>
                <TokenRoute>
                  <RatingScreen />
                </TokenRoute>
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

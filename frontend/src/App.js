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
  AdminOrderComponent,
  AdminPermissionComponent,
} from './components/admin/index'
import {
  AdminWebConfigDetailsComponent,
  AdminWebConfigUpdateComponent,
} from './components/admin/webinfo/index'
import {
  AdminBrandCreateComponent,
  AdminBrandDetailsComponent,
  AdminBrandUpdateComponent,
} from './components/admin/brand/index'
import {
  AdminProductCreateComponent,
  AdminProductDetailsComponent,
  AdminProductUpdateComponent,
} from './components/admin/product/index'

function App() {
  return (
    <BrowserRouter>
      <div className='grid-container'>
        <Header />
        <Routes>
          {/* ADMIN ROUTE */}
          <Route
            path='/admin'
            element={
              <PrivateRoute>
                <AdminScreen />
              </PrivateRoute>
            }
          >
            <Route path='products'>
              <Route
                path=''
                element={
                  <PrivateRoute>
                    <TokenRoute>
                      <AdminProductDetailsComponent />
                    </TokenRoute>
                  </PrivateRoute>
                }
              />
              <Route
                path='create'
                element={
                  <PrivateRoute>
                    <TokenRoute>
                      <AdminProductCreateComponent />
                    </TokenRoute>
                  </PrivateRoute>
                }
              />
              <Route
                path='update/:id'
                element={
                  <PrivateRoute>
                    <TokenRoute>
                      <AdminProductUpdateComponent />
                    </TokenRoute>
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path='brands'>
              <Route
                path=''
                element={
                  <PrivateRoute>
                    <TokenRoute>
                      <AdminBrandDetailsComponent />
                    </TokenRoute>
                  </PrivateRoute>
                }
              />
              <Route
                path='create'
                element={
                  <PrivateRoute>
                    <TokenRoute>
                      <AdminBrandCreateComponent />
                    </TokenRoute>
                  </PrivateRoute>
                }
              />
              <Route
                path='update/:id'
                element={
                  <PrivateRoute>
                    <TokenRoute>
                      <AdminBrandUpdateComponent />
                    </TokenRoute>
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path='orders'
              element={
                <PrivateRoute>
                  <TokenRoute>
                    <AdminOrderComponent />
                  </TokenRoute>
                </PrivateRoute>
              }
            />
            <Route
              path='accounts'
              element={
                <PrivateRoute>
                  <TokenRoute>
                    <AdminAccountComponent />
                  </TokenRoute>
                </PrivateRoute>
              }
            />
            <Route path='web-configs'>
              <Route
                path=''
                element={
                  <PrivateRoute>
                    <TokenRoute>
                      <AdminWebConfigDetailsComponent />
                    </TokenRoute>
                  </PrivateRoute>
                }
              />
              <Route
                path='update/:id'
                element={
                  <PrivateRoute>
                    <TokenRoute>
                      <AdminWebConfigUpdateComponent />
                    </TokenRoute>
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path='permissions'
              element={
                <PrivateRoute>
                  <TokenRoute>
                    <AdminPermissionComponent />
                  </TokenRoute>
                </PrivateRoute>
              }
            />
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

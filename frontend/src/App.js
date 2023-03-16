import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import HomeScreen from './screens/HomeScreen'
import CellphoneScreen from './screens/CellphoneScreen'
import LaptopScreen from './screens/LaptopScreen'
import TabletScreen from './screens/TabletScreen'
import AccessoryScreen from './screens/AccessoryScreen'
import SmartwatchScreen from './screens/SmartwatchScreen'
import WatchScreen from './screens/WatchScreen'
import UsedphoneScreen from './screens/UsedphoneScreen'
import PcAndPrinterScreen from './screens/PcAndPrinterScreen'
import AccountScreen from './screens/AccountScreen'
import OrderCheckingScreen from './screens/OrderCheckingScreen'
import CartScreen from './screens/CartScreen'
import SearchScreen from './screens/SearchScreen'
import SigninScreen from './screens/SigninScreen'
import ProductScreen from './screens/ProductScreen'
import CheckoutScreen from './screens/CheckoutScreen'

function App() {
  return (
    <BrowserRouter>
      <div className='grid-container'>
        <Header />
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route
            path='/category/cell-phones/order/:order'
            element={<CellphoneScreen />}
            exact
          />
          <Route
            path='/category/laptops/order/:order'
            element={<LaptopScreen />}
            exact
          />
          <Route
            path='/category/tablets/order/:order'
            element={<TabletScreen />}
            exact
          />
          <Route
            path='/category/accessories/order/:order'
            element={<AccessoryScreen />}
            exact
          />
          <Route
            path='/category/smart-watches/order/:order'
            element={<SmartwatchScreen />}
            exact
          />
          <Route
            path='/category/watches/order/:order'
            element={<WatchScreen />}
            exact
          />
          <Route
            path='/category/used-phones/order/:order'
            element={<UsedphoneScreen />}
            exact
          />
          <Route
            path='/category/pc-printers/order/:order'
            element={<PcAndPrinterScreen />}
            exact
          />
          <Route path='/category/my-account' element={<AccountScreen />} />
          <Route
            path='/category/order-checking'
            element={<OrderCheckingScreen />}
          />
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

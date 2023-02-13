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
import SimAndCardScreen from './screens/SimAndCardScreen'
import UtilityScreen from './screens/UtilityScreen'
import AccountScreen from './screens/AccountScreen'
import OrderCheckingScreen from './screens/OrderCheckingScreen'
import CartScreen from './screens/CartScreen'
import SearchScreen from './screens/SearchScreen'

function App() {
  return (
    <BrowserRouter>
      <div className='grid-container'>
        <Header />
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/cell-phones' element={<CellphoneScreen />} />
          <Route path='/laptops' element={<LaptopScreen />} />
          <Route path='/tablets' element={<TabletScreen />} />
          <Route path='/accessories' element={<AccessoryScreen />} />
          <Route path='/smart-watches' element={<SmartwatchScreen />} />
          <Route path='/watches' element={<WatchScreen />} />
          <Route path='/used-phones' element={<UsedphoneScreen />} />
          <Route path='/pc-printers' element={<PcAndPrinterScreen />} />
          <Route path='/sim-cards' element={<SimAndCardScreen />} />
          <Route path='/utilities' element={<UtilityScreen />} />
          <Route path='/my-account' element={<AccountScreen />} />
          <Route path='/order-checking' element={<OrderCheckingScreen />} />
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/search' element={<SearchScreen />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

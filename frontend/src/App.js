import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <BrowserRouter>
      <div className='grid-container'>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import Jobs from './components/Jobs'
import DetailPage from './components/DetailPage'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<Home />} />
        <Route path='/jobs/:id' element={<DetailPage />} />
        <Route path='/jobs' element={<Jobs />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App

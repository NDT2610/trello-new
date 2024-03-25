import Board from './pages/Boards/_id'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignInSide from './pages/Auth/Login/Login'
import SignUp from './pages/Auth/SignUp/Signup'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Board />}></Route>
          <Route path='/Login' element={<SignInSide/>}></Route>
          <Route path='/Signup' element={<SignUp/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

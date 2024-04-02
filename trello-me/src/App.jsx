import Board from './pages/Boards/_id'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignInSide from './pages/Auth/Login/Login'
import SignUp from './pages/Auth/SignUp/Signup'
import Workspace from './pages/WorkSpace'
import { useEffect, useState } from 'react'

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'))


  useEffect(() => {
    // Check if accessToken exists in localStorage
    const token = localStorage.getItem('accessToken')
    setAccessToken(token)
  }, [])
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={accessToken ? <Navigate to="/" /> : <Navigate to="/login" />} />
          <Route path="/" element={<Board />}></Route>
          <Route path='/Login' element={<SignInSide/>}></Route>
          <Route path='/Signup' element={<SignUp/>}></Route>
          <Route path='/HomePage' element={<Workspace/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/Auth'
import {login,logout}  from './redux/authSlice'
import {Footer, Header} from './components/index'
import { Outlet } from 'react-router-dom'




function App() {
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) =>{
      if(userData) {
        dispatch(login({userData}))
      } else{
        dispatch(logout())
      }
    })
    .finally(() =>{
      setLoading(false)
    })
  },[])

  return !loading ? (
    <div className='min-h-screen bg-gray-200 absolute w-full left-0 top-0'>
      <div className=''>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App

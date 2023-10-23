import React from 'react'
import {Container,Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
   const authStatus = useSelector(state => state.auth.status)
   const navigate = useNavigate()

   // usually when people create navigate people create an array
   
   const navItems = [
    {
      name:"Home",
      url:"/",
      active:true
    },
    {
      name:"Login",
      url:"/login",
      active:!authStatus
    },

    {
      name:"Signup",
      url:"/signup",
      active:!authStatus
    },
    {
      name:"All Posts",
      url:"/All-Posts",
      active:authStatus
    },
    {
      name:"Add Post",
      url:"/Add-post",
      active:authStatus
    }
    
   ]
  return (
    <header className='py-5 bg-gray-300 absolute top-0 left-0 w-full '>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to='/'>
            <Logo/>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {
              navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                  className='hover:bg-blue-100 mr-3 px-6 py-2 rounded-full'
                  onClick={() => navigate(item.url)}
                  >{item.name}</button>
                </li>
              ) : null
              )
            }

            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header

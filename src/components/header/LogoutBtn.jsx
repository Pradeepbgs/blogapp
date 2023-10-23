import React from 'react'
import {useDispatch} from 'react-redux'
import authServie from '../../appwrite/Auth'
import {logout} from '../../redux/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () =>{
        authServie.logout()
        .then(() =>{
            dispatch(logout())
        })
        .catch((error) =>{
            console.log("error",error)
        })
    }

  return (
    <>
    <button className='px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default LogoutBtn

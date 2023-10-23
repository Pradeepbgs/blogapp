import { useState } from 'react'
import React from 'react'
import authService from '../appwrite/Auth'
import { Link, useNavigate } from 'react-router-dom'
import {login} from '../redux/authSlice'
import { useDispatch } from 'react-redux'
import {Button, Input, Logo} from '../components/index'
import {set, useForm} from 'react-hook-form'
import Rolling from '../assets/Rolling-1s-200px.svg'

function SignUp() {
    const[loading, setLoading] = useState(false)
    
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const[error , setError] = useState('')

    const signup = async (data) => {
        setLoading(true)
        setError('')
        try {
           const userData=  await authService.createAccount(data)
           if(userData){
             const userData = await authService.getCurrentUser()
             if(userData){
                dispatch(login(userData))
                navigate('/')
             }
           }
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
        setLoading(false)
    }

  return (
     <div className='flex items-center justify-center mt-[7%]'
     >
        <div className={`mx-auto w-full max-w-lg
         bg-gray-100 rounded-xl p-10
          border border-black/10`}
        > 
        <div className='mb-2 flex justify-center'
        >
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100px'/>
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'
        >Sign in to your account</h2>
        <p className='mt-2 text-center text-base text-black/60'
        >
            Don&apaos;t have any account?&nbsp;
            <Link
            to='/signup'
            className='font-medium text-primary
             transtition-all duration-200 
             hover:underline'
            >Sign up</Link>
        </p>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(signup)}>
            <div className='space-y-5'>
                <Input
                label='Name: '
                placeholder='Enter your name'
                type='text'
                {...register("name",{
                    required:true,
                })}
                />
                <Input
                label='Email: '
                placeholder='Enter your email'
                type='email'
                {...register("email",{
                    required:true,
                })}
                />
                <Input
                label='Password: '
                placeholder='Enter your password'
                type='password'
                {...register("password",{
                    required:true,
                })}
                />
                {
                    loading && <img src={Rolling} alt='loading' className='absolute top-[68%] left-[42%] text-red-600' />
                }
                <Button
                type="submit"
                className='w-full'
                >Create account</Button>
            </div>
        </form>
         </div>
     </div>
  )
}

export default SignUp

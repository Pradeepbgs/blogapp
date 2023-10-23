import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../redux/authSlice'
import {Button , Input, Logo} from '../components/index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/Auth'
import {useForm} from 'react-hook-form'
import Rolling from '../assets/Rolling-1s-200px.svg'

function Login() {
    const[loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()
    const[error , setError] = useState('')

    const login = async (data) => {
        setLoading(true)
        setError('')
        try {
           const session =  await authService.login(data)
           if(session){
            const userData = await authService.getCurrentUser()
            if(userData){
                dispatch(authLogin(userData))
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
    <div
    className='flex items-center justify-center w-full mt-[10%]'
    >
      <div className={`mx-auto max-w-lg w-full
       bg-gray-100 rounded-xl
       p-10 border border-black/10
       `}>
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
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label='Email: '
                placeholder='Enter your email'
                type='email'
                {...register("email",{
                    required:true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
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
                    loading && <img src={Rolling} alt='loading' className='absolute top-[61%] left-[42%] text-red-600' />
                }
                <Button
                disabled={loading}
                type='submit'
                className='w-full'
                >Sign in</Button>
            </div>
        </form>
       </div>
    </div>
  )
}

export default Login

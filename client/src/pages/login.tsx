import { FormEvent, Fragment, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Axios from 'axios'
import { useRouter } from "next/router";
import InputGroup from '../components/InputGroup';

import { useAuthDispatch, useAuthState } from '../context/auth'

export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<any>({})
  
  const dispatch = useAuthDispatch()
  const { authenticated, loading } = useAuthState()

  const router = useRouter()
  if (authenticated) router.push('/')

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    const escapedUsername = escape(username)
    const escapedpassword = escape(password)

    try {
      dispatch('LOADING')
      const res = await Axios.post('/auth/login', {
        username: escapedUsername,
        password: escapedpassword
      });

      dispatch('LOGIN', res.data)

      setErrors({})
      dispatch('STOP_LOADING')
      router.back()
  
      
    } catch(err) {
      console.log(err)
      setErrors(err.response.data)
    }
  }

  let renderLogin = !loading && !authenticated ? (
    <Fragment>
      <div className="h-screen bg-center bg-cover w-36" style={{backgroundImage: "url('/images/bricks.jpg')"}}></div>
        <div className="flex flex-col justify-center pl-6 pr-6 max-w-72">
          <div className="w-70">
            <h1 className='mb-2 text-lg font-medium'>Login</h1>
            <p className="mb-10 text-xs">
              By continuing, you agree to our User Agreement and Privacy Policy
            </p>
            <form onSubmit={submitForm}>
              <InputGroup
                className='mb-2'
                value={username}
                placeholder='Username'
                error={errors.username}
                type='text'
                setValue={setUsername}
              />
              <InputGroup
                className='mb-4'
                value={password}
                placeholder='Password'
                error={errors.password}
                type='password'
                setValue={setPassword}
              />
              <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
                Login
              </button>
            </form>
            <p className="mb-10 text-xs">
              Forgot your username or password? Too bad.
            </p>
            <small>
              New to Readit?
              <Link href='/register'>
                <a className="ml-1 text-blue-500 uppercase">
                  Sign Up
                </a>
              </Link>
            </small>
          </div>
        </div>
      </Fragment>
  ) : (
    <p>Loading...</p>
  )
  


  return (
    <div className="flex bg-white">
      <Head>
        <title>Login</title>
      </Head>
      {renderLogin}
    </div>
  )
}

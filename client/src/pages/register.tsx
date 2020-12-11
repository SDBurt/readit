import { FormEvent, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Axios from 'axios'
import { useRouter } from "next/router";
import InputGroup from '../components/InputGroup';

export default function Register() {

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [agreement, setAgreement] = useState(false)
  const [errors, setErrors] = useState<any>({})
  
  const router = useRouter()

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    if (!agreement) {
      setErrors({...errors, agreement: 'You must agree to T&Cs'})
      return
    }

    try {
      await Axios.post('/auth/register', {
        email,
        password,
        username
      });

      setErrors({})
      router.push('/login')
  
      
    } catch(err) {
      console.log(err)
      setErrors(err.response.data)
    }
    

  }

  return (

    <div className="flex bg-white">
          <Head>
      <title>Register</title>
    </Head>
      <div className="h-screen bg-center bg-cover w-36" style={{backgroundImage: "url('/images/bricks.jpg')"}}></div>
      <div className="flex flex-col justify-center pl-6 pr-6 max-w-72">
        <div className="w-70">
          <h1 className='mb-2 text-lg font-medium'>Signup</h1>
          <p className="mb-10 text-xs">
            If this was a real website, signing up would show that you agree 
            to our User Agreement
          </p>
          <form onSubmit={submitForm}>
            <div className="mb-6">
              <input type="checkbox" className="mr-1 cursor-pointer" id="agreement" checked={agreement} onChange={e => setAgreement(e.target.checked)}/>
              <label htmlFor="agreement" className="text-xs cursor-pointer">
                I would agree to get emails and cool stuff on Readit
              </label>
              {errors.agreement ? <small className="block font-medium text-red-600">{errors.agreement}</small> : null}
            </div>
            <InputGroup
              className='mb-2'
              value={email}
              placeholder='Email'
              error={errors.email}
              type='email'
              setValue={setEmail}
            />
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
              Continue
            </button>
          </form>
          <small>
            Already a Readitter?
            <Link href='/login'>
              <a className="ml-1 text-blue-500 uppercase">
                Log in
              </a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  )
}


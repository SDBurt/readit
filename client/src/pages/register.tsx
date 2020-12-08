import Head from 'next/head'
import Link from 'next/link'

export default function Register() {
  return (
    <div className="flex">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-40 h-screen bg-center bg-cover" style={{backgroundImage: "url('/images/bricks.jpg')"}}></div>
      <div className="flex flex-col justify-center pl-6 w-72">
        <div className="w-70">
          <h1 className='mb-2 text-lg font-medium'>Signup</h1>
          <p className="mb-10 text-xs">
            If this was a real website, signing up would show you agree 
            to our User Agreement
          </p>
          <form>
            <div className="mb-6">
              <input type="checkbox" className="mr-1 cursor-pointer" id="agreement" />
              <label htmlFor="agreement" className="text-xs cursor-pointer">
                I would agree to get emails and cool stuff on Readit
              </label>
            </div>
            <div className="mb-2">
              <input 
                type="email"
                className="w-full px-3 py-2 border rounded bg-grey-100 border-grey-400"
                placeholder="Email"
              />
            </div>
              <div className="mb-2">
                <input 
                  type="text"
                  className="w-full px-3 py-2 border rounded bg-grey-100 border-grey-400"
                  placeholder="Username"
                />
            </div>
            <div className="mb-2">
              <input 
                type="password"
                className="w-full px-3 py-2 border rounded bg-grey-100 border-grey-400"
                placeholder="Password"
              />
            </div>
            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
              Signup
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


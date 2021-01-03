import { Fragment } from 'react'
import Link from 'next/link'
import RedditLogo from '../images/reddit.svg'

import { useAuthState, useAuthDispatch } from '../context/auth'
import Axios from 'axios'

const Navbar: React.FC = () => {
    const { authenticated, loading } = useAuthState()
    const dispatch = useAuthDispatch()

    const logoutHandler = () => {
        Axios.get('/auth/logout')
        .then(() => {
            dispatch('LOGOUT')
            // window.location.reload()
        })
        .catch(err => {
            console.error(err)
        })
    }

    return (
        <div className="fixed inset-x-0 top-0 z-10 flex flex-row items-center justify-center h-12 px-5 bg-white">
            {/* Logo and Title */}
            <div className="flex items-center">
            <Link href='/'>
                <a>
                <RedditLogo className='w-8 h-8 mr-2'/>
                </a>
            </Link>
            <span className='text-2xl font-semibold'>
                <Link href='/'>Readit</Link>
            </span>
            </div>
            {/* Search Input*/} 
            <div className="flex items-center w-full mx-4 bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
                <i className="px-2 text-gray-500 fas fa-search"></i>
                <input type='text' placeholder='Search' className='py-1 pr-3 bg-transparent rounded max-w-160 focus:outline-none' />
            </div>
            {/* Auth Buttons */}
            <div className="flex">
                {!loading && (authenticated ? (
                    // show logout
                    <button
                        className='w-32 py-1 mr-4 leading-5 hollow blue button'
                        onClick={() => logoutHandler()}
                    >
                        LOGOUT
                    </button>
                ) : (
                    <Fragment>
                         <Link href='/login'>
                        <a className='w-32 py-1 mr-4 leading-5 hollow blue button'>
                        Log in
                        </a>
                        </Link>
                        <Link href='/register'>
                            <a className='w-32 py-1 leading-5 blue button'>
                            Sign up
                            </a>
                        </Link>
                    </Fragment>
                ))}    
            </div>
        </div>
    )
}

export default Navbar
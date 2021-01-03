import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="mt-10 mb-4 text-4xl text-gray-800">
                Page Not Found
            </h1>
            <Link href="/">
                <a className="px-4 py-2 blue button">
                    Back to Home
                </a>
            </Link>
        </div>
    )
}

export default NotFound

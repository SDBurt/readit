import Axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

import { Post } from '../types'

dayjs.extend(relativeTime)

export default function Home() {

  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    Axios.get('/posts')
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className='pt-12'>
      <Head>
        <title>Readit: the front page of the internet</title>
      </Head>
      <div className="container flex pt-4">
        {/* Posts feed */}
        <div className="w-160">
          {posts.map((post) => (
            <div key={post.identifier} className='flex mb-4 bg-white border border-gray-400 rounded hover:border-gray-600'>
              {/* Vote Section */}
              <div className="flex flex-col items-center justify-start w-10 text-center bg-gray-200 rounded-l">
                <div className='mt-1'>
                <i className="text-gray-500 fas fa-arrow-up"></i>
                </div>
                <div className='text-xs font-bold text-gray-900'>10</div>
                <div className=''>
                <i className="text-gray-500 fas fa-arrow-down"></i>
                </div>
              </div>

              {/* Post Data Section */}
              <div className="w-full p-2">
                <div className="flex items-center">
                  <Link href={`/r/${post.subName}`}>
                    <Fragment>
                      <img 
                        src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                        className='w-6 h-6 mr-1 rounded-full cursor-pointer'
                      />
                      <a className='text-xs font-bold cursor-pointer hover:underline'>
                        /r/{post.subName}
                      </a>
                    </Fragment>
                  </Link>
                  <p className="text-xs text-gray-500">
                    <span className="mx-1">•</span>
                    Posted by
                    <Link href={`/u/${post.username}`}>
                      <a className='mx-1 hover:underline'>/u/{post.username}</a>
                    </Link>
                    <Link href={`/r/${post.subName}/${post.identifier}/${post.slug}`}>
                      <a className='mr-1 hover:underline'>
                        {dayjs(post.createdAt).fromNow()}
                      </a>
                    </Link>
                  </p>
                </div>
                <Link href={post.url}>
                  <a className='my-1 text-lg font-medium'>
                    { post.title }
                  </a>
                </Link>
                { post.body && <p className='my-1 text-sm'>{post.body}</p>}
                <div className="flex">
                  <Link href={post.url}>
                    <a>
                      <div className="px-2 py-1 mr-1 text-xs text-gray-500 rounded cursor-pointer hover:bg-gray-200">
                        <i className='mr-1 fas fa-comment-alt fa-xs'></i>
                        <span className='font-bold'>20 Comments</span>
                      </div>
                    </a>
                  </Link>
                  <div className="px-2 py-1 mr-1 text-xs text-gray-500 rounded cursor-pointer hover:bg-gray-200">
                    <i className='mr-1 fas fa-share fa-xs'></i>
                    <span className='font-bold'>Share</span>
                  </div>
                  <div className="px-2 py-1 mr-1 text-xs text-gray-500 rounded cursor-pointer hover:bg-gray-200">
                    <i className='mr-1 fas fa-bookmark fa-xs'></i>
                    <span className='font-bold'>Save</span>
                  </div>
                </div>
              </div>
            </div>
          ))
          }
        </div>
        {/* Sidebar */}
       
      </div>
    </div>
  )
}

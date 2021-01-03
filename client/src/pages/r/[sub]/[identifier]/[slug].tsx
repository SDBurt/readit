import classNames from 'classnames'
import React from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import Axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Post } from '../../../../types'
import SideBar from '../../../../components/SideBar'
import ActionButton from '../../../../components/ActionButton'
import { useAuthState } from '../../../../context/auth'

dayjs.extend(relativeTime)


export default function PostPage() {

    // Local

    // Global
    const { authenticated } = useAuthState()

    // utils

    const router = useRouter()
    const { identifier, sub, slug } = router.query

    const { data: post, error } = useSWR<Post>(
        identifier && slug ? `/posts/${identifier}/${slug}` : null
    )

    if (error) router.push('/')

    const vote = async (value:number) => {
        // if not logged in, go to login
        if (!authenticated) router.push('/login')

        // if vote is the same, reset vote
        if (value === post.userVote) value = 0

        try {
          const res = await Axios.post('/misc/vote', {identifier,slug, value})
          console.log(res.data)
        } catch( err ) {
          console.error(err)
        }
      }

    return (
        <div>
            <Head>
                <title>{post ? post.title : null}</title>
            </Head>
            <Link href={`/r/${sub}`}>
                <a>
                    <div className="flex items-center w-full h-20 p-8 bg-blue-500">
                        <div className="container flex items-center">
                            {post && (
                                <div className="w-8 h-8 mr-2 overflow-hidden rounded-full">
                                    <Image
                                        src={post.sub.imageUrl}
                                        height={32}
                                        width={32}
                                        />
                                </div>
                            )}
                            <p className="text-xl font-semibold text-white">
                                /r/{sub}
                            </p>
                        </div>
                    </div>
                </a>
            </Link>
            
            <div className="container flex pt-5">
                <div className="w-160">
                    <div className="bg-white rounded">
                        {
                            post && (
                                <div className='flex'>
                                    <div className="flex flex-col items-center justify-start w-10 text-center rounded-l">
                                        <div className='w-6 mx-auto mt-1 text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-600'
                                            onClick={() => vote(1)}
                                        >
                                            <i className={classNames('fas fa-arrow-up', {'text-red-500' : post.userVote === 1})}></i>
                                        </div>
                                        <div className='text-xs font-bold text-gray-900'>
                                            <p>{post.voteScore || 0}</p>
                                        </div>
                                        <div className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600'
                                            onClick={() => vote(-1)}
                                        >
                                            <i className={classNames('fas fa-arrow-down', {'text-blue-600' : post.userVote === -1})}></i>
                                        </div>
                                    </div>

                                    <div className="p-2">
                                        <div className="flex items-center">
                                            <Link href={`/r/${post.subName}`}>     
                                                <img 
                                                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                                className='w-6 h-6 mr-1 rounded-full cursor-pointer'
                                                />
                                            </Link>
                                            <Link href={`/r/${post.subName}`}>
                                            <a className='text-xs font-bold cursor-pointer hover:underline'>
                                                /r/{post.subName}
                                            </a>
                                            </Link>
                                            <p className="text-xs text-gray-500">
                                            <span className="mx-1">•</span>
                                            Posted by
                                            <Link href={`/u/${post.username}`}>
                                                <a className='mx-1 hover:underline'>/u/{post.username}</a>
                                            </Link>
                                            <Link href={`/r/${post.subName}/${identifier}/${slug}`}>
                                                <a className='mr-1 hover:underline'>
                                                {dayjs(post.createdAt).fromNow()}
                                                </a>
                                            </Link>
                                            </p>
                                        </div>
                                       <h1 className='my-1 text-lg font-medium'>
                                            { post.title }
                                        </h1> 
                                        { post.body && <p className='my-3 text-sm'>{post.body}</p>}
                                        <div className="flex">
  
                                        <div className='px-2 py-1 mr-1 text-xs text-gray-500'>
                                        <i className='mr-1 fas fa-comment-alt fa-xs'></i>
                                        <span className='font-bold'>{post.commentCount} Comments</span>
                                        </div>
                            
                                        <ActionButton>
                                        <i className='mr-1 fas fa-share fa-xs'></i>
                                        <span className='font-bold'>Share</span>
                                        </ActionButton>
                                        <ActionButton>
                                        <i className='mr-1 fas fa-bookmark fa-xs'></i>
                                        <span className='font-bold'>Save</span>
                                        </ActionButton>
                                    </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                
                {post && <SideBar sub={post.sub} />}
            </div>
            
        </div>
    )
}
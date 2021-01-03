import classNames from 'classnames'
import React, { FormEvent, Fragment, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import Axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Post, Comment } from '../../../../types'
import SideBar from '../../../../components/SideBar'
import ActionButton from '../../../../components/ActionButton'
import { useAuthState } from '../../../../context/auth'

dayjs.extend(relativeTime)


export default function PostPage() {

    // Local
    const [newComment, setNewComment] = useState('')

    // Global
    const { authenticated, user } = useAuthState()

    // utils

    const router = useRouter()
    const { identifier, sub, slug } = router.query

    const { data: post, error } = useSWR<Post>(
        identifier && slug ? `/posts/${identifier}/${slug}` : null
    )

    const { data: comments, revalidate } = useSWR<Comment[]>(
        identifier && slug ? `/posts/${identifier}/${slug}/comments` : null
    )

    if (error) router.push('/')

    const vote = async (value:number, comment?: Comment) => {
        // if not logged in, go to login
        if (!authenticated) router.push('/login')

    
        // if vote is the same, reset vote
        if ((!comment && (post.userVote === value)) || (comment && (comment.userVote === value))) value = 0
        

        try {
            await Axios.post('/misc/vote', {
                identifier,
                slug,
                commentIdentifier: comment?.identifier,
                value
            })

            revalidate()
          
        } catch( err ) {
          console.error(err)
        }
    }

    const submitComment = async(event: FormEvent) => {
        event.preventDefault()

        if (newComment.trim() === '') return

        const cleanComment = escape(newComment)

        try {

            await Axios.post(`/posts/${post.identifier}/${post.slug}/comments`, { body: cleanComment })
            setNewComment('')
            revalidate()

        } catch (err) {

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
                                <Fragment>
                                    <div className='flex'>
                                        <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
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

                                        <div className="py-2 pr-2">
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
                                    {/* Comment Input Area */}
                                    <div className="pl-10 pr-6 mb-4">
                                        {authenticated ? (
                                            <div>
                                                <p className="mb-1 text-xs">
                                                    Comment as <Link href={`/u/${user.username}`}>
                                                        <a className="font-semibold text-blue-500 hover:underline">
                                                            {user.username}
                                                        </a>
                                                    </Link>
                                                </p>
                                                <form onSubmit={submitComment}>
                                                    <textarea
                                                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
                                                        onChange={e => setNewComment(e.target.value)}
                                                        value={newComment}
                                                        >

                                                        </textarea>
                                                        <div className="flex justify-end">
                                                            <button className="px-3 py-1 blue button disabled:cursor-not-allowed" disabled={newComment.trim() === ''}>
                                                                Comment
                                                            </button>
                                                        </div>
                                                </form>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between px-2 py-3 border border-gray-200">
                                                <p className="font-semibold text-gray-400">Log in or sign up to leave a comment</p>
                                                <div>
                                                    <Link href='/login'>
                                                        <a className="px-4 py-1 mr-2 hollow blue button">Login</a>
                                                    </Link>
                                                    <Link href='/signup'>
                                                        <a className="px-4 py-1 blue button">Signup</a>
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <hr/>
                                    {/* Comment Feed */}
                                    {
                                        comments?.map(comment => (
                                            <div key={`${comment.identifier}-${comment.username}`} className='flex'>
                                                {/* Vote arrows and number */}
                                                <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
                                                    <div className='w-6 mx-auto mt-1 text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-600'
                                                        onClick={() => vote(1, comment)}
                                                    >
                                                        <i className={classNames('fas fa-arrow-up', {'text-red-500' : comment.userVote === 1})}></i>
                                                    </div>
                                                    <div className='text-xs font-bold text-gray-900'>
                                                        <p>{comment.voteScore || null}</p>
                                                    </div>
                                                    <div className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600'
                                                        onClick={() => vote(-1, comment)}
                                                    >
                                                        <i className={classNames('fas fa-arrow-down', {'text-blue-600' : comment.userVote === -1})}></i>
                                                    </div>
                                                </div>
                                                <div className="py-2 pr-2">
                                                    <p className="mb-1 text-xs leading-none">
                                                        <Link href={`/u/${comment.username}`}>
                                                            <a className="mr-1 font-bold hover:underline">
                                                                {comment.username}
                                                            </a>
                                                        </Link>
                                                        <span className="text-gray-600">
                                                            {`
                                                                ${comment.voteScore}
                                                                points •
                                                                ${dayjs(comment.createdAt).fromNow()}

                                                            `}
                                                        </span>
                                                    </p>
                                                    <p>{comment.body}</p>
                                                    <div className="flex">
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
                                        ))
                                    }
                                </Fragment>
                            )
                        }
                    </div>
                </div>
                {post && <SideBar sub={post.sub} />}
            </div>
            
        </div>
    )
}
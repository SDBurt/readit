import React, { useState } from 'react'
import router from 'next/router';
import Link from 'next/link'
import Axios from 'axios'
import classNames from "classnames";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Post } from '../types'
import { useAuthState } from '../context/auth'
import ActionButton from './ActionButton'

dayjs.extend(relativeTime)

interface PostCardProps {
  post: Post
}

const PostCard = ({post: {identifier, slug, title, body, subName, createdAt, voteScore, userVote, commentCount, url, username} }:PostCardProps) => {

  const [ voting, setVoting ] = useState(false)
  const { authenticated } = useAuthState()

  const vote = async (value:number) => {

    // if not logged in, go to login
    if (!authenticated) router.push('/login')

    setVoting(true)

    // if vote is the same, reset vote
    if (value === userVote) value = 0

    try {
      const res = await Axios.post('/misc/vote', {identifier,slug, value})
      setVoting(false)
    } catch( err ) {
      console.error(err)
      setVoting(false)
    }
  }

  return (
      <div key={identifier} className='flex mb-4 bg-white border border-gray-400 rounded hover:border-gray-600'>
            {/* Vote Section */}
            <div className="flex flex-col items-center justify-start w-10 text-center bg-gray-200 rounded-l">
              <div className='w-6 mx-auto mt-1 text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-600'
                onClick={() => vote(1)}
              >
                  {/* Arrow up */}
                  <i className={classNames('fas fa-arrow-up', {'text-red-500' : userVote === 1})}></i>      
              </div>
              {/* Vote value */}
              { voting ? (
                <i className='fas fa-spinner'></i>  
              ) : (
                <div className='text-xs font-bold text-gray-900'>
                  <p>{voteScore || 0}</p>
                </div>
              )}
              
              <div className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600'
                onClick={() => vote(-1)}
              >
                  {/* Arrow up */}
                  <i className={classNames('fas fa-arrow-down', {'text-blue-600' : userVote === -1})}></i>
              </div>
            </div>

            {/* Post Data Section */}
            <div className="w-full p-2">
              <div className="flex items-center">
                <Link href={`/r/${subName}`}>     
                    <img 
                      src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                      className='w-6 h-6 mr-1 rounded-full cursor-pointer'
                    />
                </Link>
                <Link href={`/r/${subName}`}>
                <a className='text-xs font-bold cursor-pointer hover:underline'>
                    /r/{subName}
                  </a>
                </Link>
                <p className="text-xs text-gray-500">
                  <span className="mx-1">•</span>
                  Posted by
                  <Link href={`/u/${username}`}>
                    <a className='mx-1 hover:underline'>/u/{username}</a>
                  </Link>
                  <Link href={`/r/${subName}/${identifier}/${slug}`}>
                    <a className='mr-1 hover:underline'>
                      {dayjs(createdAt).fromNow()}
                    </a>
                  </Link>
                </p>
              </div>
              <Link href={url}>
                <a className='my-1 text-lg font-medium'>
                  { title }
                </a>
              </Link>
              { body && <p className='my-1 text-sm'>{body}</p>}
              <div className="flex">
                <Link href={url}>
                  <a>
                    <ActionButton>
                      <i className='mr-1 fas fa-comment-alt fa-xs'></i>
                      <span className='font-bold'>{commentCount} Comments</span>
                    </ActionButton>
                  </a>
                </Link>
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

export default PostCard

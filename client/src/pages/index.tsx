import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'
import useSWR from 'swr'
import PostCard from '../components/PostCard'
import { Sub } from '../types'
import classNames from 'classnames'
export default function Home() {

  const { data: posts } = useSWR('/posts')
  const { data: topSubs } = useSWR('/misc/top-subs')

  return (
    <Fragment>
      <Head>
        <title>Readit: the front page of the internet</title>
      </Head>
      <div className="flex justify-center pt-4 mx-4">
        {/* Posts feed */}
        <div className="w-160">
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier}/>
          ))
          }
        </div>
        {/* Sidebar */}
        <div className="ml-6 w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                Top Communities
              </p>
              <div>
                {
                  topSubs?.map((sub: Sub, index: number) => (
                    <div key={sub.name} className={classNames('flex items-center px-4 py-2 text-xs', {'border-b': index < topSubs.length-1})} >
                      <Link href={`/r/${sub.name}`}>
                        <a className="hover:cursor-pointer">
                          <Image 
                            className="rounded-full"
                            src={sub.imageUrl}
                            alt="Sub"
                            width={24}
                            height={24}
                          />
                        </a>
                      </Link>
                      <Link href={`/r/${sub.name}`}>
                        <a className="ml-2 font-bold hover:cursor-pointer">
                          /r/{sub.name}
                        </a>
                      </Link>
                      <p className="ml-auto font-med">{sub.postCount}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

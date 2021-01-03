export interface Post {
    identifier: string
    title: string
    slug: string
    body: string
    subName: string
    createdAt: string
    updatedAt: string
    username: string
    sub?: Sub

    // virtual
    url: string
    voteScore?: number
    commentCount?: number
    userVote?:number
}

export interface User {
    username: string
    email: string
    createdAt: string
    updatedAt: string
}

export interface Sub {
    createdAt: string
    updatedAt: string
    name: string
    title: string
    description: string
    imageUrn:  string
    bannerUrn:  string
    username:  string
    posts:  Post[]

    // virtuals
    imageUrl:  string
    bannerUrl:  string
    postCount?: number
}

export interface Comment {
    identifier: string
    body: string
    createdAt: string
    updatedAt: string
    username: string

    // Virtuals
    voteScore: number
    userVote:number
}
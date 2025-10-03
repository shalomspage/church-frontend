import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/redux/baseQuery'
import { Post, CreatePostData } from '@/types'

interface PostsResponse {
  posts: Post[]
  total: number
  page: number
  limit: number
}

interface PostsQueryParams {
  page?: number
  limit?: number
  category?: string
  featured?: boolean
}

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery,
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, PostsQueryParams | undefined>({
      query: (params) => ({
        url: '/posts/list',
        params: params || {},
      }),
      providesTags: ['Post'],
    }),
    getPostBySlug: builder.query<Post, string>({
      query: (slug) => `/posts/slug/${slug}`,
      providesTags: ['Post'],
    }),
    createPost: builder.mutation<Post, CreatePostData>({
      query: (postData) => ({
        url: '/posts/create',
        method: 'POST',
        body: postData,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
})

export const { useGetPostsQuery, useGetPostBySlugQuery, useCreatePostMutation } = newsApi
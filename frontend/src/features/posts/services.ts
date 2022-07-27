import { QueryFunctionContext } from '@tanstack/react-query'
import { postsClient } from '../../api/AxiosClients'
import { PostViewModel } from '../../models/Posts/PostViewModel'
import { PaginatedPostsViewModel } from '../../models/Posts/PaginatedPostsViewModel'
import { PostDataViewModel } from '../../models/Posts/PostDataViewModel'
import { AlertViewModel } from '../../models/Alert/AlertViewModel'
import { ObjectId } from 'mongoose'

export const getUserPosts = async (): Promise<PostViewModel[]> => {
  const { data } = await postsClient.get('/')
  return data
}

export const getApprovedPosts = async ({
  queryKey,
}: QueryFunctionContext<
  [
    string,
    {
      pagination?: {
        page?: number
        limit?: number
        genre?: string
        user?: string
      }
    }
  ]
>): Promise<PaginatedPostsViewModel> => {
  const { data } = await postsClient.get('/approved', {
    params: { ...queryKey[1].pagination },
  })
  return data
}

export const getUnapprovedPosts = async (): Promise<PostViewModel[]> => {
  const { data } = await postsClient.get('/unapproved')
  return data
}

export const getPostDetails = async ({
  queryKey,
}: QueryFunctionContext<
  [string, { postId: string }]
>): Promise<PostViewModel> => {
  const { data } = await postsClient.get(`/${queryKey[1].postId}`)
  return data
}

export const createPost = async (
  post: PostDataViewModel
): Promise<{ post: PostViewModel; alert: AlertViewModel }> => {
  const { data } = await postsClient.post('/', { data: post })
  return data
}

export const updatePost = async (postData: {
  postId: ObjectId
  post: PostDataViewModel
}): Promise<{ post: PostViewModel; alert: AlertViewModel }> => {
  const { data } = await postsClient.put(`/${postData.postId}`, {
    data: postData.post,
  })
  return data
}

export const deletePost = async (
  postId: ObjectId
): Promise<{ post: PostViewModel; alert: AlertViewModel }> => {
  const { data } = await postsClient.delete(`/${postId}`)
  return data
}

export const approvePost = async (
  postId: ObjectId
): Promise<{ post: PostViewModel; alert: AlertViewModel }> => {
  const { data } = await postsClient.patch(`/${postId}/approve`)
  return data
}

export const rejectPost = async (postData: {
  postId: ObjectId
  message: string
}): Promise<{ post: PostViewModel; alert: AlertViewModel }> => {
  const { data } = await postsClient.patch(`/${postData.postId}/reject`, {
    message: postData.message,
  })
  return data
}

export const likePost = async (postId: ObjectId): Promise<PostViewModel> => {
  const { data } = await postsClient.patch(`/${postId}/like`)
  return data
}

export const applyToContribute = async (postData: {
  postId: ObjectId
  message: string
}): Promise<{ post: PostViewModel; alert: AlertViewModel }> => {
  const { data } = await postsClient.patch(`/${postData.postId}/contributors`, {
    message: postData.message,
  })
  return data
}

export const approveContributor = async (postData: {
  postId: ObjectId
  contributorId: ObjectId
}): Promise<PostViewModel> => {
  const { data } = await postsClient.patch(
    `/${postData.postId}/contributors/${postData.contributorId}/approve`
  )
  return data
}

export const rejectContributor = async (postData: {
  postId: ObjectId
  contributorId: ObjectId
}): Promise<PostViewModel> => {
  const { data } = await postsClient.patch(
    `/${postData.postId}/contributors/${postData.contributorId}/reject`
  )
  return data
}

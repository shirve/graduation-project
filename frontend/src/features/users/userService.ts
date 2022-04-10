import axios from 'axios'

const API_URL = '/api/users/'

// Get user
const getUser = async (userId: string) => {
  const response = await axios.get(API_URL + `user/${userId}`)

  return response.data
}

const userService = {
  getUser,
}

export default userService

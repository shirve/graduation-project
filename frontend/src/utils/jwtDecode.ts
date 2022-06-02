import jwt_decode from 'jwt-decode'
import { UserViewModel } from '../models/Users/UserViewModel'
import { DecodedTokenViewModel } from '../models/Token/DecodedTokenViewModel'

export const jwtDecode = (token: string): UserViewModel | null => {
  try {
    const decodedData: DecodedTokenViewModel = jwt_decode(token)
    if (decodedData) {
      const { exp, iat, ...userData } = decodedData
      return {
        ...userData,
      }
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

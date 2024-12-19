import React, { createContext } from 'react'
import { AuthContext } from '../../Provider/AuthProvider'

const useAuth = () => {
  const auth = createContext(AuthContext)
  return auth;
}

export default useAuth
import React from 'react'
import { useSelector } from 'react-redux'

function AccountScreen() {
  const { userInfo } = useSelector((state) => state.userSignin)

  return userInfo && <div className='mx-auto container'>s</div>
}

export default AccountScreen

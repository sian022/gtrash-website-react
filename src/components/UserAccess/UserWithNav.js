import React from 'react'
import TopNavNoToggle from './TopNavNoToggle'
import { Outlet } from 'react-router'
import { useUserAuth } from '../../context/UserAuthContext'

function UserWithNav() {
  const { user } = useUserAuth()
  return (
    <div>
        <TopNavNoToggle/>
        <Outlet/>
    </div>
  )
}

export default UserWithNav
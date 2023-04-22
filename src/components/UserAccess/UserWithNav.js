import React from 'react'
import Header from '../TopNav'
import UserSidebar from './UserSidebar'
import { Outlet } from 'react-router'
import { useUserAuth } from '../../context/UserAuthContext'

function UserWithNav() {
  const { user } = useUserAuth()
  return (
    <div>
        <Header/>
        <UserSidebar/>
        <Outlet/>
    </div>
  )
}

export default UserWithNav
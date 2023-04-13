import React from 'react'
import Header from '../TopNav'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router'
import { useUserAuth } from '../../context/UserAuthContext'

function AdminWithNav() {
  const { user } = useUserAuth()
  console.log(user)
  return (
    <div>
        <Header/>
        <AdminSidebar/>
        <Outlet/>
    </div>
  )
}

export default AdminWithNav
import React from 'react'
import Header from '../TopNav'
import StoreOwnerSidebar from './StoreOwnerSidebar'
import { Outlet } from 'react-router'

function StoreOwnerWithNav() {
  return (
    <div>
        <Header/>
        <StoreOwnerSidebar/>
        <Outlet/>
    </div>
  )
}

export default StoreOwnerWithNav
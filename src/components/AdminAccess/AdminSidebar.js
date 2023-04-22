import React from 'react'

import { Link } from 'react-router-dom'

function AdminSidebar() {
  return (
    <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion" id="sidenavAccordion" style={{backgroundColor: "#d0d3d6"}}> 
            <div className="sb-sidenav-menu">
                <div className="nav" >
                    <div className="sb-sidenav-menu-heading" style={{color: "black"}}><i className="fas fa-tachometer-alt"></i> &nbsp; Dashboard</div>

                    {/*Admin Access*/}
                    <Link to='/admin' className="nav-link">
                        <div className="sb-nav-link-icon" style={{color:"black"}}><i className="fa-solid fa-arrow-trend-up"></i></div>
                        Statistics
                    </Link>
                    <Link to='/admin/users' className="nav-link">
                        <div className="sb-nav-link-icon" style={{color:"black"}}><i className="fa-solid fa-users"></i></div>
                        Users
                    </Link>
                    <Link to='/admin/storeowners' className="nav-link">
                        <div className="sb-nav-link-icon" style={{color:"black"}}><i className="fa-solid fa-store"></i></div>
                        Store Owners
                    </Link>
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Admin
            </div>
        </nav>
    </div>
  )
}

export default AdminSidebar
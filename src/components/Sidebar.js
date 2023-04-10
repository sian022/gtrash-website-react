import React from 'react'

import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion" id="sidenavAccordion" style={{backgroundColor: "#d0d3d6"}}> 
            <div className="sb-sidenav-menu">
                <div className="nav" >
                    <div className="sb-sidenav-menu-heading" style={{color: "black"}}><i className="fas fa-tachometer-alt"></i> &nbsp; Dashboard</div>

                    {/*Admin Access*/}
                    <div className="sb-sidenav-menu-heading" style={{color: "black"}}> &nbsp; Admin Access</div>
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
                    {/*Store Owner Access*/}
                    <div className="sb-sidenav-menu-heading" style={{color: "black"}}> &nbsp; Store Owner Access</div>
                    <Link to='/storeowner/users' className="nav-link">
                        <div className="sb-nav-link-icon" style={{color:"black"}}><i className="fa-solid fa-users"></i></div>
                        Users
                    </Link>
                    <Link to='/storeowner/rewards' className="nav-link">
                        <div className="sb-nav-link-icon" style={{color:"black"}}><i className="fa-solid fa-clipboard-list"></i></div>
                        Rewards
                    </Link>

                    {/*User Access*/}
                    <div className="sb-sidenav-menu-heading" style={{color: "black"}}> &nbsp; User Access</div>
                    <Link to='/users/myprofile' className="nav-link">
                        <div className="sb-nav-link-icon" style={{color:"black"}}><i className="fa-solid fa-users"></i></div>
                        User Profile
                    </Link>

                    {/*Login Temp
                    <div className="sb-sidenav-menu-heading" style={{color: "black"}}> &nbsp; Login Temp</div>
                    <Link to='/login' className="nav-link">
                        <div className="sb-nav-link-icon" style={{color:"black"}}><i className="fa-solid fa-users"></i></div>
                        Login
                    </Link>
                    */}
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

export default Sidebar
import React from 'react'

import { Link } from 'react-router-dom'

function UserSidebar() {
  return (
    <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion" id="sidenavAccordion" style={{backgroundColor: "#d0d3d6"}}> 
            <div className="sb-sidenav-menu">
                <div className="nav" >
                    <div className="sb-sidenav-menu-heading" style={{color: "black"}}><i className="fas fa-tachometer-alt"></i> &nbsp; Dashboard</div>

                    <Link to='/user' className="nav-link">
                        <div className="sb-nav-link-icon" style={{color:"black"}}><i className="fas fa-user"></i></div>
                        My Profile
                    </Link>
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Student
            </div>
        </nav>
    </div>
  )
}

export default UserSidebar
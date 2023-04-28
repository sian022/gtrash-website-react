import React from 'react'

import { Link } from 'react-router-dom'

function StoreOwnerSidebar() {
  return (
    <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion" id="sidenavAccordion" style={{backgroundColor: "#d0d3d6"}}> 
            <div className="sb-sidenav-menu">
                <div className="nav" >
                    <div className="sb-sidenav-menu-heading" style={{color: "black"}}><i className="fas fa-tachometer-alt"></i> &nbsp; Dashboard</div>

                    {/*Store Owner Access*/}
                    <Link to='/storeowner' className='nav-link'>
                        <div className='sb-nav-link-icon' style={{color:"black"}}><i className='fa-solid fa-gift'></i></div>
                        Redeem
                    </Link>
                    <Link to='/storeowner/users' className="nav-link">
                        <div className="sb-nav-link-icon" style={{color:"black"}}><i className="fa-solid fa-users"></i></div>
                        Users
                    </Link>
                    <Link to='/storeowner/rewards' className="nav-link">
                        <div className="sb-nav-link-icon" style={{color:"black"}}><i className="fa-solid fa-clipboard-list"></i></div>
                        Rewards
                    </Link>
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Store Owner
            </div>
        </nav>
    </div>
  )
}

export default StoreOwnerSidebar
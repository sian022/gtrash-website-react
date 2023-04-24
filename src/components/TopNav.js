import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'

function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const { logout } = useUserAuth()
    const navigate = useNavigate()

    useEffect(() => {
        // Check local storage to see if the sidebar toggle was enabled
        const isSidebarToggled = localStorage.getItem('sb|sidebar-toggle') === 'true'
        setIsSidebarOpen(isSidebarToggled)
    }, [])

    const handleSidebarToggle = () => {
        const isToggled = !isSidebarOpen;
        setIsSidebarOpen(isToggled);
        localStorage.setItem('sb|sidebar-toggle', isToggled)
        document.body.classList.toggle('sb-sidenav-toggled')
    }
    
    const handleLogout = async () => {
        try {
            await logout()
            navigate('/')
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className='sb-nav-fixed'>
            {/*Top Nav*/}
            <nav className="sb-topnav navbar navbar-expand navbar-dark" style={{backgroundColor: "#002476"}}>
                {/* Navbar Brand*/}
                <a className=
                "navbar-brand ps-3 col-4 pe-4 me-3">G-Trash</a>
                {/* Sidebar Toggle*/}
                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={handleSidebarToggle}><i className="fas fa-bars"></i></button>
                {/* Navbar*/}
                <ul className="navbar-nav ms-auto me-0 me-md-3 my-2 my-md-0">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" >Settings</a></li>
                            <li><a className="dropdown-item">Activity Log</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><div className="dropdown-item" onClick={handleLogout}>Logout</div></li>

                        </ul>
                    </li>
                </ul>
            </nav>
            {/*Top Nav End*/}

        </div>
    )
}

export default Header
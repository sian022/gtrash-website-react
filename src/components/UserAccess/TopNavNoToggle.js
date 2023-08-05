import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'

function TopNavNoToggle() {
    const { logout } = useUserAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await logout()
            navigate('/')
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        localStorage.setItem('sb|sidebar-toggle', true)
        document.body.classList.toggle('sb-sidenav-toggled', true)
    },[])

    return (
        <div>
            {/*Top Nav*/}
            <nav className="sb-topnav navbar navbar-expand navbar-dark" style={{backgroundColor: "#002476"}}>
                {/* Navbar Brand*/}
                <a className=
                "navbar-brand ps-3 col-4 pe-4 me-3">G-Trash</a>
                {/* Navbar*/}
                <ul className="navbar-nav ms-auto me-0 me-md-3 my-2 my-md-0">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><div className="dropdown-item" onClick={handleLogout}>Logout</div></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            {/*Top Nav End*/}

        </div>
    )
}

export default TopNavNoToggle
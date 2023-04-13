import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import Header from './components/TopNav'
import Sidebar from './components/AdminAccess/AdminSidebar'
import Statistics from './components/Statistics'
import UsersStoreOwner from './components/StoreOwnerAccess/UsersStoreOwner'
import RewardsStoreOwner from './components/StoreOwnerAccess/RewardsStoreOwner'
import UsersAdmin from './components/AdminAccess/UsersAdmin'
import StoreOwnersAdmin from './components/AdminAccess/StoreOwnersAdmin'
import UserProfile from './components/UserAccess/UserProfile'
import Login from './authentication/Login'
import Signup from './authentication/Signup'
import AdminWithNav from './components/AdminAccess/AdminWithNav'
import StoreOwnerWithNav from './components/StoreOwnerAccess/StoreOwnerWithNav'
import WithoutNav from './components/WithoutNav'

import './styles.css'
import { UserAuthContextProvider } from './context/UserAuthContext'
import ProtectedRoute from './authentication/ProtectedRoute'

function App() {
  return (
      <div>
        <Router>
          <UserAuthContextProvider>
            <Routes>
              <Route element={<WithoutNav />}>
                <Route exact path='/' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
              </Route>
            </Routes>
          
            <div id='layoutSidenav'>
              <div id='layoutSidenav_content'>
                <main>
                  <div className='container-fluid px-4'>
                    <Routes>
                      <Route element={<ProtectedRoute><AdminWithNav/></ProtectedRoute>}>
                        <Route path='/admin' element={<Statistics />} exact/>
                        <Route path='/admin/users' element={<UsersAdmin />} />
                        <Route path='/admin/storeowners' element={<StoreOwnersAdmin />} />
                        <Route path='/users/myprofile' element={<UserProfile />} />
                      </Route>
                      <Route element={<StoreOwnerWithNav/>}>
                        <Route path='/storeowner/users' element={<UsersStoreOwner />} />
                        <Route path='/storeowner/rewards' element={<RewardsStoreOwner />} />
                      </Route>
                    </Routes>
                  </div>
                </main>
              </div>
            </div>
          </UserAuthContextProvider>
        </Router>
      </div>
  );
}

export default App;
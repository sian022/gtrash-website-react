import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import Header from './components/TopNav'
import Sidebar from './components/Sidebar'
import Statistics from './components/Statistics'
import UsersStoreOwner from './components/StoreOwnerAccess/UsersStoreOwner'
import RewardsStoreOwner from './components/StoreOwnerAccess/RewardsStoreOwner'
import UsersAdmin from './components/AdminAccess/UsersAdmin'
import StoreOwnersAdmin from './components/AdminAccess/StoreOwnersAdmin'
import UserProfile from './components/UserAccess/UserProfile'
import Login from './authentication/Login'

import './styles.css'

function App() {
  return (
      <div>
        <Router>
          <Routes>
            <Route exact path='/login' element={<Login/>}></Route>
          </Routes>
            <Header/>
            <div id='layoutSidenav'>
            <Sidebar/>
              <div id='layoutSidenav_content'>
                <main>
                  <div className='container-fluid px-4'>
                    <Routes>
                      <Route path='/admin' element={<Statistics />} exact/>
                      <Route path='/admin/users' element={<UsersAdmin />} />
                      <Route path='/admin/storeowners' element={<StoreOwnersAdmin />} />
                      <Route path='/storeowner/users' element={<UsersStoreOwner />} />
                      <Route path='/storeowner/rewards' element={<RewardsStoreOwner />} />
                      <Route path='/users/myprofile' element={<UserProfile />} />
                    </Routes>
                  </div>
                </main>
              </div>
            </div>
        </Router>
      </div>
  );
}

export default App;
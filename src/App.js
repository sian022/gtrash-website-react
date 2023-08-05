import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Statistics from './components/AdminAccess/Statistics'
import UsersStoreOwner from './components/StoreOwnerAccess/UsersStoreOwner'
import RewardsStoreOwner from './components/StoreOwnerAccess/RewardsStoreOwner'
import UsersAdmin from './components/AdminAccess/UsersAdmin'
import StoreOwnersAdmin from './components/AdminAccess/StoreOwnersAdmin'
import UserProfile from './components/UserAccess/UserProfile'
import Login from './authentication/Login'
import AdminWithNav from './components/AdminAccess/AdminWithNav'
import StoreOwnerWithNav from './components/StoreOwnerAccess/StoreOwnerWithNav'
import RedeemReward from './components/StoreOwnerAccess/RedeemReward'
import WithoutNav from './components/WithoutNav'
import './styles.css'
import { useUserAuth } from './context/UserAuthContext'
import AdminProtectedRoute from './authentication/AdminProtectedRoute'
import StoreProtectedRoute from './authentication/StoreProtectedRoute'
import UserWithNav from './components/UserAccess/UserWithNav'

function App() {
  const { user } = useUserAuth()
  return (
      <div>
        <Router>
            <Routes>
              <Route element={<WithoutNav />}>
                <Route exact path='/' element={<Login />}/>
              </Route>
            </Routes>
            {user && 
            <div className='sb-nav-fixed'>
              <div id='layoutSidenav'>
                <div id='layoutSidenav_content'>
                  <main>
                    <div className='container-fluid px-4'>
                      <Routes>
                        <Route element={<AdminProtectedRoute><AdminWithNav/></AdminProtectedRoute>}>
                          <Route path='/admin' element={<Statistics />} exact/>
                          <Route path='/admin/users' element={<UsersAdmin />} />
                          <Route path='/admin/storeowners' element={<StoreOwnersAdmin />} />
                          <Route path='/users' element={<UserProfile />} />
                        </Route>
                        <Route element={<StoreProtectedRoute><StoreOwnerWithNav/></StoreProtectedRoute>}>
                          <Route path='/storeowner' element={<RedeemReward />}/>
                          <Route path='/storeowner/users' element={<UsersStoreOwner />} />
                          <Route path='/storeowner/rewards' element={<RewardsStoreOwner />} />
                        </Route>
                        <Route element={<UserWithNav/>}>
                          <Route path='/user' element={<UserProfile />} />
                        </Route>
                      </Routes>
                    </div>
                  </main>
                </div>
              </div>
            </div>}
        </Router>
      </div>
  )
}

export default App
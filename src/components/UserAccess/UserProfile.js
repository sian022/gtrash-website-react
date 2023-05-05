import React, { useState, useEffect } from 'react'

import { db } from '../../firebase/firebase'
import { collection, getDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { useUserAuth } from '../../context/UserAuthContext'

import { MoonLoader } from 'react-spinners'
import StudentStatistics from './StudentStatistics'
import './nopic.png'

function UserProfile() {
  const usersRef = collection(db, 'Users')
  const q = query(usersRef, where("accessLevel", "==", "student"))

  const [topUsersByPoints, setTopUsersByPoints] = useState([])
  const [currentUserPointsRank, setCurrentUserPointsRank] = useState(null)
  const [topUsersByRedemption, setTopUsersByReedemption] = useState([])
  const [currentUserRedemptionRank, setCurrentUserRedemptionRank] = useState(null)

  const [usersData, setUsersData] = useState([])
  const [currentUserData, setCurrentUserData] = useState([])
  const [studentNumber, setStudentNumber] = useState('N/A')
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState('N/A')

  let { user } = useUserAuth()

  useEffect(() => {
    if(!user){
        return
    }
    const userRef = doc(collection(db, 'Users'), user.uid)
    const getUserData = async () => {
        const userData = await getDoc(userRef)
        setCurrentUserData(userData.data())
    }
    getUserData()

    const getUsersData = async () => {
      const studentsData = await getDocs(q)
      setUsersData(studentsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsersData()
  }, [])

  useEffect(() => {
    setTopUsersByPoints(usersData.sort((a, b) => b.totalPoints - a.totalPoints)
      .map((x) => {
      return {topName: x.name, topTotalPoints: x.totalPoints}
    }))
    setTopUsersByReedemption(usersData.sort((a, b) => b.timesRedeeming - a.timesRedeeming)
      .map((x) => {
      return {topName: x.name, topRedeeming: x.timesRedeeming}
    }))
  },[usersData])

  useEffect(() => {
    setCurrentUserPointsRank(topUsersByPoints.findIndex(user => user.topName === currentUserData.name)+1)
    setCurrentUserRedemptionRank(topUsersByRedemption.findIndex(user => user.topName === currentUserData.name)+1)
  },[topUsersByPoints, topUsersByRedemption, currentUserData])

  if(currentUserData.length === 0){
    return <div className='spinner'><MoonLoader/></div>
  }

  return (
    <div className='container-fluid mt-4'>
      <div className='row row-eq-height'>
        <div className='col-xl-8'>
          <div className="card mb-4 h-100" >
            <div className='card-header' style={{background: '#737678'}}>
              <h2 className='fw-b text-white'>Personal Information</h2>
            </div>
            <div className="card-body" style={{background: '#d0d3d6'}}>
              <div className='row'>
                <div className='col-xl-6'>
                  <p><strong>Name:</strong> <br/> {currentUserData.name}</p>
                  <p><strong>E-mail:</strong> <br/> {currentUserData.email}</p>
                </div>
                <div className='col-xl-6'>
                  <p><strong>Student #:</strong> <br/> {studentNumber}</p>
                  <p><strong>Phone #:</strong> <br/> {currentPhoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-4'>
          <div className="card mb-4 h-100">
            <div className='card-header' style={{background: '#737678'}}>
              <h2 className='fw-b text-white'>Total Points</h2>
            </div>
            <div className="card-body d-flex justify-content-center align-items-center" style={{background: '#d0d3d6'}}>
                <strong className='fs-1'>{currentUserData.totalPoints} Points</strong>
            </div>
          </div>
        </div>
      </div>

      <StudentStatistics currentUserData={currentUserData} 
      currentUserPointsRank={currentUserPointsRank} 
      currentUserRedemptionRank={currentUserRedemptionRank}
      />
    </div>
  )
}

export default UserProfile
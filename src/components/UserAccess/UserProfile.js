import React, { useState, useEffect } from 'react'

import { db } from '../../firebase/firebase'
import { collection, getDoc, doc } from 'firebase/firestore'
import { useUserAuth } from '../../context/UserAuthContext'

function UserProfile() {
  const [currentUserName, setCurrentUserName] = useState(null)
  let { user } = useUserAuth()

  useEffect(() => {
    if(!user){
        return
    }
    const userRef = doc(collection(db, 'Users'), user.uid)
    const getUserId = async () => {
        const userData = await getDoc(userRef)
        setCurrentUserName(userData.data().name)
    }
    getUserId()
}, [])

  return (
    <div>
        <h1 className="mt-4" style={{marginBottom: "20px"}}>My Profile</h1> 
        <h2>Hi {currentUserName}!</h2>
    </div>
  )
}

export default UserProfile
import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router'
import { useUserAuth } from '../context/UserAuthContext'

import { collection, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

function StoreProtectedRoute({children}) {
    const [userAccessLevel, setUserAccessLevel] = useState(null)
    let { user } = useUserAuth()
    
    //Protect Store Access Level Routes
    useEffect(() => {
        const getUser = async () => {
            const userRef = doc(collection(db, 'Users'), user.uid)
            const userData = await getDoc(userRef)
            setUserAccessLevel(userData.data().accessLevel)
        }
        getUser()
    }, [])

    if(!user){
        return <Navigate to="/"/>
    }else if(user && userAccessLevel == 'store'){
        return children
    }else if(user &&  userAccessLevel == 'admin'){
        return <Navigate to="/admin"/>
    }else if(user &&  userAccessLevel == 'student'){
        return <Navigate to="/user"/>
    }
}

export default StoreProtectedRoute
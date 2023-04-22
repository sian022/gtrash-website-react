import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router'
import { useUserAuth } from '../context/UserAuthContext'

import { collection, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

function AdminProtectedRoute({children}) {
    const [userAccessLevel, setUserAccessLevel] = useState(null)
    let { user } = useUserAuth()

    //Protect Admin Access Level Routes
    useEffect(() => {
        if(!user){
            return
        }
        const userRef = doc(collection(db, 'Users'), user.uid)
        const getUser = async () => {
            const userData = await getDoc(userRef)
            setUserAccessLevel(userData.data().accessLevel)
        }
        getUser()
    }, [])
    
    if(!user){
        return <Navigate to="/"/>
    }else if(userAccessLevel == 'admin'){
        return children
    }else if(userAccessLevel == 'student'){
        return <Navigate to="/user"/>
    }else if(userAccessLevel == 'store'){
        return <Navigate to="/storeowner"/>
    }
}

export default AdminProtectedRoute
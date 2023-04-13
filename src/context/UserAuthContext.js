import {createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../firebase/firebase'

const userAuthContext = createContext()

export function UserAuthContextProvider({children}) {
    const [user, setUser] = useState(null)
    function signUp(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }
    function logout(){
        return signOut(auth)
    }
    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    },[])

    return <userAuthContext.Provider value={{ user, login, signUp, logout }}>{children}</userAuthContext.Provider>
}

export function useUserAuth() {
    return useContext(userAuthContext)
}
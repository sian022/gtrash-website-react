import {createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateCurrentUser,
} from 'firebase/auth'
import { auth } from '../firebase/firebase'

import { collection, setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const userAuthContext = createContext()

export function UserAuthContextProvider({children}) {
    const [user, setUser] = useState(() => {
        // Check if there is an authenticated user in localStorage
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    })

    function signUp(email, password){
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            //Once the user creation has happened successfully, we can add the currentUser into firestore
            //with the appropriate details.
            const userSignUp = userCredential.user
            const userRef = doc(collection(db, 'Users'), userSignUp.uid);
            const createStudent = async (e) => {
                try {
                    await setDoc(userRef, {
                        email: email,
                        password: password,
                    })
                  } catch (err) {
                    console.log(err.message)
                  }
            }
            createStudent()
        })
    }

    function signUpStudent(name, email, password, rfid, loggedInUser){
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const userSignUp = userCredential.user
            const userRef = doc(collection(db, 'Users'), userSignUp.uid);
            const createStudent = async (e) => {
                try {
                    await setDoc(userRef, {
                        name: name,
                        email: email,
                        password: password,
                        rfid: rfid,
                        totalPoints: 0,
                        rewardsRedeemed: 0,
                        totalPetBottles: 0,
                        totalTinCans: 0,
                        timesRedeeming: 0,
                        accessLevel: 'student'
                    })
                  } catch (err) {
                    console.log(err.message)
                  }
            }
            createStudent().then(() => {
                updateCurrentUser(auth, loggedInUser)
            })
        })
    }
    
    function signUpStore(storeName, ownerName, email, password, loggedInUser){
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const userSignUp = userCredential.user
            const userRef = doc(collection(db, 'Users'), userSignUp.uid);
            const createStore = async (e) => {
                try {
                    await setDoc(userRef, {
                        storeName: storeName,
                        ownerName: ownerName,
                        email: email,
                        password: password,
                        accessLevel: 'store'
                    })
                  } catch (err) {
                    console.log(err.message)
                  }
            }
            createStore().then(() => {
                updateCurrentUser(auth, loggedInUser)
            })
        })
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password).then(() => {
            // Update the user state and store it in localStorage
            const currentUser = auth.currentUser
            setUser(currentUser)
            localStorage.setItem('user', JSON.stringify(currentUser))
        })
    }
    function logout(){
        return signOut(auth)
    }

    // function deleteUserAccount(uid){
    //     return deleteUser(uid)
    //     .then(() => {
    //         alert('Delete successful')
    //     })
    //     .catch((error) => {
    //         console.error('Error deleting user: ', error.message)
    //     })
    // }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            // Store the authenticated user in localStorage
            localStorage.setItem('user', JSON.stringify(currentUser))
        })
        return () => {
            unsubscribe()
        }
    },[])

    return <userAuthContext.Provider value={{ user, login, signUp, signUpStudent, signUpStore, logout }}>{children}</userAuthContext.Provider>
}

export function useUserAuth() {
    return useContext(userAuthContext)
}
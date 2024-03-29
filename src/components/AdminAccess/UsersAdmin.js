import React, { useState, useRef, useEffect } from 'react'
import { DataTable } from 'simple-datatables'
import 'simple-datatables/dist/style.css'

import EditUserModal from '../modals/EditUserModal'
import DeleteUserModal from '../modals/DeleteUserModal'
import AddUserModal from '../modals/AddUserModal'

import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

import { MoonLoader } from 'react-spinners'

function UsersAdmin() {
    const [users, setUsers] = useState([])
    const [selectedUserEdit, setSelectedUserEdit] = useState('')
    const [selectedUserDelete, setSelectedUserDelete] = useState('')
    const studentsRef = collection(db, "Users")
    const q = query(studentsRef, where("accessLevel", "==", "student"))

    useEffect(() => {
        const getUsers = async () => {
          await onSnapshot(q, (querySnapshot) => {
            const usersData = []
            querySnapshot.forEach((doc) => {
                usersData.push({...doc.data(), id: doc.id})
            })
            setUsers(usersData)
          })
        }
        getUsers()
    }, [])

    const tableRef = useRef(null)
    useEffect(() => {
        if (users.length > 0 && tableRef.current) {
          new DataTable(tableRef.current)
        }
    }, [users])

    if(users.length === 0){
        return <div className='spinner'><MoonLoader/></div>
    }

    return (
        <div>
        <h1 className="mt-4" style={{marginBottom: "20px"}}>Users</h1> 
            <div className="card mb-4">
                <div className="card-body table-responsive">
                    <table ref={tableRef}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Total Points</th>
                                <th>Times Redeemed</th>
                                <th>Total PET Bottles</th>
                                <th>Total Tin Cans</th>
                                <th>Actions</th>                         
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Total Points</th>
                                <th>Times Redeemed</th>
                                <th>Total PET Bottles</th>
                                <th>Total Tin Cans</th>
                                <th>Actions</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.totalPoints}</td>
                                    <td>{user.timesRedeeming}</td>
                                    <td>{user.totalPetBottles}</td>
                                    <td>{user.totalTinCans}</td>
                                    <td>
                                        <button 
                                        type="button" className="btn btn-primary btn-block btn-sm" title="Edit User" id="editUser" data-bs-toggle="modal" data-bs-target="#editUserModal" onClick={()=>{
                                            setSelectedUserEdit(user)
                                        }}>
                                            <i className="fa fa-pencil-square"></i>
                                        </button> &nbsp;
                                        <button type="button" className="btn btn-danger btn-block btn-sm" title="Delete User" id="deleteUser" data-bs-toggle="modal" data-bs-target="#deleteUserModal" onClick={() => {setSelectedUserDelete(user)}}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                    {users && <EditUserModal userInfo={selectedUserEdit}/>}
                    <DeleteUserModal userInfo={selectedUserDelete}/>
                </div>
            </div>

            <div className="btn btn-primary mb-4" type="button" data-bs-toggle="modal" data-bs-target="#addUserModal">
                Create new user
            </div>
            <AddUserModal/>
        </div>
    )
}

export default UsersAdmin
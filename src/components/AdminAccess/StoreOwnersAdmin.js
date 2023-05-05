import React, { useRef, useState, useEffect} from 'react'
import { DataTable } from 'simple-datatables'

import EditStoreModal from '../modals/EditStoreModal'
import DeleteStoreOwnerModal from '../modals/DeleteStoreOwnerModal'
import AddStoreModal from '../modals/AddStoreModal'
import SeeStoreRewardsModal from '../modals/SeeStoreRewardsModal'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

import { MoonLoader } from 'react-spinners'

function StoreOwnersAdmin() {
    const [stores, setStores] = useState([])
    const [selectedStoreEdit, setSelectedStoreEdit] = useState('')
    const [selectedStoreDelete, setSelectedStoreDelete] = useState('')
    const storesRef = collection(db, "Users")
    const q = query(storesRef, where("accessLevel", "==", "store"));

    //Simple Datatable Hooks
    const tableRef = useRef(null)

    //Stores useEffect
    useEffect(() => {
        const getStores = async () => {
            const data = await getDocs(q);
            setStores(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getStores()
    }, [])

    useEffect(() => {
        if (stores.length > 0 && tableRef.current) {
          const table = new DataTable(tableRef.current);
        }
    }, [stores]);

    if(stores.length === 0){
        return <div className='spinner'><MoonLoader/></div>
    }

    return (
        <div>
        <h1 className="mt-4" style={{marginBottom: "20px"}}>Store Owners</h1> 
            <div className="card mb-4">
                <div className="card-body table-responsive">
                    <table ref={tableRef}>
                        <thead>
                            <tr>
                                <th>Store Name</th>
                                <th>Representative</th>
                                <th>E-mail</th>
                                {/*<th>Rewards Offered</th>*/}
                                <th>Actions</th>                         
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Store Name</th>
                                <th>Representative</th>
                                <th>E-mail</th>
                                {/*<th>Rewards Offered</th>*/}
                                <th>Actions</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {stores.map(store => (
                                <tr key={store.id}>
                                    <td>{store.storeName}</td>
                                    <td>{store.ownerName}</td>
                                    <td>{store.email}</td>
                                    {/* 
                                    <td>
                                    <button 
                                        type="button" className="btn btn-primary btn-block btn-sm" title="View Store Rewards" id="seeStoreRewards" data-bs-toggle="modal" data-bs-target="#seeStoreRewardsModal">
                                            <i className="fa fa-store"></i> &nbsp; View Store Rewards
                                        </button>
                                    </td>
                                    */}
                                    <td>
                                        <button 
                                        type="button" className="btn btn-primary btn-block btn-sm" title="Edit Store" id="editStore" data-bs-toggle="modal" data-bs-target="#editStoreModal" onClick={()=>{
                                            setSelectedStoreEdit(store)
                                        }}>
                                            <i className="fa fa-pencil-square"></i>
                                        </button> &nbsp;
                                        <button type="button" className="btn btn-danger btn-block btn-sm" title="Delete Store" id="deleteStore" data-bs-toggle="modal" data-bs-target="#deleteStoreOwnerModal" onClick={() => {setSelectedStoreDelete(store)}}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                    <SeeStoreRewardsModal/>
                    <EditStoreModal storeInfo={selectedStoreEdit}/>
                    <DeleteStoreOwnerModal storeInfo={selectedStoreDelete}/>
                </div>
            </div>

            <div className="btn btn-primary mb-4" type="button" data-bs-toggle="modal" data-bs-target="#addStoreModal">
                Create new store
            </div>
            <AddStoreModal/>
        </div>
    )
}

export default StoreOwnersAdmin
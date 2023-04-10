import React, { useRef, useState, useEffect} from 'react'
import { DataTable } from 'simple-datatables'

import dummy from '../../dummy'
import EditStoreModal from '../modals/EditStoreModal'
import DeleteStoreOwnerModal from '../modals/DeleteStoreOwnerModal'
import AddStoreModal from '../modals/AddStoreModal'
import SeeStoreRewardsModal from '../modals/SeeStoreRewardsModal'

function StoreOwnersAdmin() {
  //Simple Datatable Hooks
  const tableRef = useRef(null)

  useEffect(() => {
      const table = new DataTable(tableRef.current);
  },[])

  //Set Modal Values
  const [selectedUser, setSelectedUser] = useState({})

  return (
      <div>
      <h1 className="mt-4" style={{marginBottom: "20px"}}>Store Owners</h1> 
          <div className="card mb-4">
              <div className="card-body table-responsive">
                  <table ref={tableRef}>
                      <thead>
                          <tr>
                              <th>Store ID</th>
                              <th>Store Name</th>
                              <th>Representative</th>
                              <th>Rewards Offered</th>
                              <th>Actions</th>                         
                          </tr>
                      </thead>
                      <tfoot>
                          <tr>
                              <th>Store ID</th>
                              <th>Store Name</th>
                              <th>Representative</th>
                              <th>Rewards Offered</th>
                              <th>Actions</th>
                          </tr>
                      </tfoot>
                      <tbody>
                          {dummy.map(dumm => (
                              <tr key={dumm.userId}>
                                  <td>{dumm.userId}</td>
                                  <td>{dumm.userName}</td>
                                  <td>{dumm.totalPoints}</td>
                                  <td>
                                  <button 
                                      type="button" className="btn btn-primary btn-block btn-sm" title="View Store Rewards" id="seeStoreRewards" data-bs-toggle="modal" data-bs-target="#seeStoreRewardsModal">
                                          <i className="fa fa-store"></i> &nbsp; View Store Rewards
                                      </button>
                                  </td>
                                  <td>
                                      <button 
                                      type="button" className="btn btn-primary btn-block btn-sm" title="Edit Store" id="editStore" data-bs-toggle="modal" data-bs-target="#editStoreModal">
                                          <i className="fa fa-pencil-square"></i>
                                      </button> &nbsp;
                                      <button type="button" className="btn btn-danger btn-block btn-sm" title="Delete Store" id="deleteStore" data-bs-toggle="modal" data-bs-target="#deleteStoreOwnerModal"><i className="fa-solid fa-trash"></i></button>
                                  </td>
                              </tr>
                          ))} 
                      </tbody>
                  </table>
                  <SeeStoreRewardsModal/>
                  <EditStoreModal/>
                  <DeleteStoreOwnerModal/>
              </div>
          </div>

          <div className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#addStoreModal">
              Create new store
          </div>
          <AddStoreModal/>
      </div>
  )
}

export default StoreOwnersAdmin
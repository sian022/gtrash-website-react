import React, { useEffect, useState } from 'react'
import DoughnutChart from '../charts/DoughnutChart'

function StudentStatistics({currentUserData}) {
    const [totalTinCans, setTotalTinCans] = useState(null)
    const [totalPetBottles, setTotalPetBottles] = useState(null)

    useEffect(() => {
        console.log(currentUserData.totalTinCans)
        setTotalTinCans(currentUserData.totalTinCans)
        setTotalPetBottles(currentUserData.totalPetBottles)
    },[currentUserData])

    const [trashData, setTrashData] = useState({
        labels: ['Tin Cans', 'PET Bottles'],
        datasets: [{
            data: [10,5],
            backgroundColor: ['#000080', '#ff4500']
        }]
    })

    const [rewardsData, setRewardsData] = useState({
        labels: ["Soy's Burger", 'Master Siomai'],
        datasets: [{
            data: [4,10],
            backgroundColor: ['#000080', '#ff4500']
        }]
    })

    return (
        <div className='mt-4'>         
            <div className="row">
                <div className="col-xl-6">
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fa-solid fa-trash"></i>
                            Amount of PET Bottles and Tin Cans
                        </div>
                        <div className="card-body">
                            <DoughnutChart chartData={trashData}/>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fa-solid fa-check-square"></i>
                            Store with Most Rewards Redeemed
                        </div>
                        <div className="card-body">
                            <DoughnutChart chartData={rewardsData}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentStatistics
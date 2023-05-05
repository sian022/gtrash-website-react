import React, { useEffect, useState } from 'react'
import DoughnutChart from '../charts/DoughnutChart'

function StudentStatistics({currentUserData, currentUserPointsRank, currentUserRedemptionRank}) {
    const [pointsSuffix, setPointsSuffix] = useState(null)
    const [redemptionSuffix, setRedemptionSuffix] = useState(null)

    useEffect(() => {
        if(currentUserPointsRank % 10 == 1){
            setPointsSuffix('st')
        }else if(currentUserPointsRank % 10 == 2){
            setPointsSuffix('nd')
        }else if(currentUserPointsRank % 10 == 3){
            setPointsSuffix('rd')
        }else{
            setPointsSuffix('th')
        }
        
        if(currentUserRedemptionRank % 10 == 1){
            setRedemptionSuffix('st')
        }else if(currentUserRedemptionRank % 10 == 2){
            setRedemptionSuffix('nd')
        }else if(currentUserRedemptionRank % 10 == 3){
            setRedemptionSuffix('rd')
        }else{
            setRedemptionSuffix('th')
        }

    }, [currentUserPointsRank], [currentUserRedemptionRank])

    const trashData = {
        labels: ['Tin Cans', 'PET Bottles'],
        datasets: [{
            data: [currentUserData?.totalTinCans, currentUserData?.totalPetBottles],
            backgroundColor: ['#000080', '#ff4500']
        }]
    }

    const rewardsData = {
        labels: ["Soy's Burger", 'Master Siomai'],
        datasets: [{
            data: [4,10],
            backgroundColor: ['#000080', '#ff4500']
        }]
    }

    return (
        <div className='mt-4'>     
            <div className="row">
                <div className="col-xl-6">
                    <div className="card mb-4 h-100">
                        <div className="card-header">
                            <i className="fa-solid fa-trash"></i>
                            Amount of PET Bottles and Tin Cans
                        </div>
                        <div className="card-body">
                            <DoughnutChart chartData={trashData} widthAndHeight={"220px"}/>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3">
                    <div className="card mb-4 h-100">
                        <div className='card-header' style={{background: '#737678'}}>
                            <h2 className='fw-b text-white'>Points Ranking</h2>
                        </div>
                        <div className="card-body d-flex justify-content-center align-items-center" style={{background: '#d0d3d6'}}>
                            <strong className='fs-1'>{currentUserPointsRank}{pointsSuffix}</strong>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3">
                    <div className="card mb-4 h-100">
                        <div className='card-header' style={{background: '#737678'}}>
                            <h2 className='fw-b text-white'>Redemption Ranking</h2>
                        </div>
                        <div className="card-body d-flex justify-content-center align-items-center" style={{background: '#d0d3d6'}}>
                            <strong className='fs-1'>{currentUserRedemptionRank}{redemptionSuffix}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentStatistics
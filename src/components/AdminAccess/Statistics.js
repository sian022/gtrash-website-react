import React, { useState, useEffect } from 'react'

import { db } from '../../firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

import DoughnutChart from '../charts/DoughnutChart'
import { MoonLoader } from 'react-spinners'

function Statistics() {
    const backgroundColor = ['#000080', '#ff4500', '#000080', '#ff4500', '#000080']
    
    const [studentsData, setStudentsData] = useState([])
    const [rewardsData, setRewardsData] = useState([])
    
    const [topRewardsRedeemed, setTopRewardsRedeemed] = useState([])
    const [topStudentPointsList, setTopStudentPointsList] = useState([])
    const [topStudentRedeemingList, setTopStudentRedeemingList] = useState([])

    const [totalTinCans, setTotalTinCans] = useState(0)
    const [totalPetBottles, setTotalPetBottles] = useState(null)

    const studentsRef = collection(db, "Users")
    const q = query(studentsRef, where("accessLevel", "==", "student"))

    const rewardsRef = collection(db, "Rewards")

    useEffect(() => {
        const getStudentsData = async () => {
            const data = await getDocs(q)
            setStudentsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getStudentsData()
    }, [])

    useEffect(() => {
        const getRewardsData = async () => {
            const data = await getDocs(rewardsRef)
            setRewardsData(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getRewardsData()
    }, [])

    useEffect(() => {
        var totalCans = 0
        var totalBottles = 0
        studentsData.map((x) => {
                totalCans+=x.totalTinCans
                totalBottles+=x.totalPetBottles
            }
        )
        setTotalTinCans(totalCans)
        setTotalPetBottles(totalBottles)

        setTopStudentPointsList(studentsData.sort((a, b) => b.totalPoints - a.totalPoints)
            .slice(0, 5)
            .map((x) => {
            return {topName: x.name, topTotalPoints: x.totalPoints}
        }))

        setTopStudentRedeemingList(studentsData.sort((a, b) => b.timesRedeeming - a.timesRedeeming)
            .slice(0, 5)
            .map((x) => {
            return {topName: x.name, topTimesRedeeming: x.timesRedeeming}
        }))
    },[studentsData])

    useEffect(() => {
        setTopRewardsRedeemed(rewardsData.sort((a, b) => b.timesRedeemed - a.timesRedeemed)
            .slice(0, 5)
            .map((x) => {
            return {topRewardName: x.rewardName, topTimesRedeemed: x.timesRedeemed}
        }))
    }, [rewardsData])
    
    const trashData = {
        labels: ['Tin Cans', 'PET Bottles'],
        datasets: [{
            data: [totalTinCans, totalPetBottles],
            backgroundColor: backgroundColor
        }]
    }

    const rewardFrequencyData = {
        labels: topRewardsRedeemed.map(x => x.topRewardName),
        datasets: [{
            data: (topRewardsRedeemed.map(x => x.topTimesRedeemed)),
            backgroundColor: backgroundColor
        }]
    }

    const topStudentPointsData = {
        labels: topStudentPointsList.map(x => x.topName),
        datasets: [{
            data: (topStudentPointsList.map(x => x.topTotalPoints)),
            backgroundColor: backgroundColor
        }]
    }

    const topStudentRedeemingData = {
        labels: topStudentRedeemingList.map(x => x.topName),
        datasets: [{
            data: (topStudentRedeemingList.map(x => x.topTimesRedeeming)),
            backgroundColor: backgroundColor
        }]
    }

    if(studentsData.length === 0 && rewardsData.length == 0){
        return <div className='spinner'><MoonLoader/></div>
    }

    return (
        <div>
        <h1 className="mt-4" style={{marginBbottom: "20px"}}>Statistics</h1>
            <div className="row mt-4">
                <div className="col-xl-6">
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fa-solid fa-trash"></i>
                            Amount of PET Bottles and Tin Cans
                        </div>
                        <div className="card-body">
                            <DoughnutChart chartData={trashData} widthAndHeight={"180"}/>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fa-solid fa-check-square"></i>
                            Reward Most Redeemed
                        </div>
                        <div className="card-body">
                            <DoughnutChart chartData={rewardFrequencyData} widthAndHeight={"180"}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-6">
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fa-solid fa-layer-group"></i>
                            Top G-Trash User Points
                        </div>
                        <div className="card-body">
                            <DoughnutChart chartData={topStudentPointsData} widthAndHeight={"180"}/>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fa-solid fa-building-user"></i>
                            Top G-Trash User Redeeming Rewards
                        </div>
                        <div className="card-body">
                            <DoughnutChart chartData={topStudentRedeemingData} widthAndHeight={"180"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistics
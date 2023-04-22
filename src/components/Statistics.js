import React from 'react'

function Statistics() {

  return (
    <div>
      <h1 className="mt-4" style={{marginBbottom: "20px"}}>Statistics</h1>           
        <div className="row">
            <div className="col-xl-6">
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fa-solid fa-trash"></i>
                        Amount of PET Battles and Tin Can
                    </div>
                    <div className="card-body"><canvas id="amountOfPetBottlesAndTinCans" width="100%" height="40"></canvas></div>
                </div>
            </div>
            <div className="col-xl-6">
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fa-solid fa-check-square"></i>
                        Reward Most Redeemed
                    </div>
                    <div className="card-body"><canvas id="rewardsMostRedeemed" width="100%" height="40"></canvas></div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-xl-6">
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fa-solid fa-layer-group"></i>
                        Top 10 G-Trash User Points
                    </div>
                    <div className="card-body"><canvas id="top10Points" width="100%" height="40"></canvas></div>
                </div>
            </div>
            <div className="col-xl-6">
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fa-solid fa-building-user"></i>
                        Top 10 G-Trash User Redeeming Rewards
                    </div>
                    <div className="card-body"><canvas id="top10Redeemed" width="100%" height="40"></canvas></div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-xl-12">
                <div className="card mb-4">
                    <div className="card-header">
                        Trash Timeline
                    </div>
                    <div className="card-body"><canvas id="trashTimeline" width="100%" height="40"></canvas></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Statistics
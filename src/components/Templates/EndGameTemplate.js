import React from 'react'
import PropTypes from 'prop-types'
import trash from "../../images/trash.svg"
import checkSquare from "../../images/checkSquare.svg"

function EndGameTemplate({taskTitle, playerScore, totalScore, averageTime, downloadData}) {
    const downloadClick = () =>{
        console.log("Download Data")
    }
    const deleteClick = () =>{
        console.log("Delete Data")
    }

    return (
        <div className="end-game-wrapper">
            <div className="task-title">{taskTitle}</div>
            <div className="score-container">
                <div className="your-score-wrapper">your score</div> 
                <div className="score-wrapper">{playerScore} / {totalScore}</div> 
            </div>
            <div className="average-score-container">
                <div className="average-score-title-wrapper">average time per trial</div> 
                <div className="average-score-wrapper">{averageTime} sec</div> 
            </div>
            <div className="buttons-container">
                <div className="download-data-button" onClick={downloadClick}><img src={checkSquare}/>&emsp;Download</div>
                <div className="delete-data-button" onClick={deleteClick}><img src={trash}/>&emsp;Delete</div>
            </div>
        </div>
    )
}

EndGameTemplate.propTypes = {

}

export default EndGameTemplate

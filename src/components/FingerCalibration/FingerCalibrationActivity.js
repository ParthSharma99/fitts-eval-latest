import React, { useState } from 'react'
import { useAuth } from '../../contexts/ContextProvider';
import ActivityTemplate from '../Templates/ActivityTemplate';
import PointGenerator from '../PointGenerator';
import EndGameTemplate from '../Templates/EndGameTemplate';

function FingerCalibrationActivity() {
    const [currScore, setCurrScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const {RandomPoint, maxScore, getDistance, targetButtonRadius} = useAuth()
    const currentPoint = RandomPoint()
    const [posX, setPosX] = useState(currentPoint[0])
    const [posY, setPosY] = useState(currentPoint[1])
    const [gameOver, setGameOver] = useState(false)
    const [collectedData, setCollectedData] = useState([])

    const addData = (event, hitVal) => {
        //#region Add Data to store current Progress
        const dist = getDistance(posX, posY, event.clientX, event.clientY)
        let tempData = {
            'TrialNo': totalScore+1,
            'target_x': posX + targetButtonRadius,
            'target_y': posY + targetButtonRadius,
            'touch_x': event.clientX,
            'touch_y': event.clientY,
            'hit': hitVal,
            'distance': dist
        }
        setCollectedData(collectedData => [...collectedData, tempData])
        //#endregion
    }

    const handlePointClick = (event) => {
        event.cancelBubble = true;
        if(event.stopPropagation) event.stopPropagation();
        if(gameOver) return;
        
        //#region Change Color
        try {
            document.getElementById("activity-wrapper").style.backgroundColor = "#4FC53C";
            setTimeout(() => {
                try {
                    document.getElementById("activity-wrapper").style.backgroundColor = "white";
                } catch (error) {
                    
                }
            }, 800)
        } catch (error) {
        }
        //#endregion
        
        if(totalScore + 1 == maxScore){
            addData(event, true)
            setCurrScore(currScore+1)
            setTotalScore(totalScore+1)
            setGameOver(true)
        }else{
            addData(event, true)
            let point = RandomPoint([posX, posY])
            setPosX(point[0])
            setPosY(point[1])
            setCurrScore(currScore+1)
            setTotalScore(totalScore+1)
        }
    }

    const handleCanvasClick = (event) =>{
        if(gameOver) return;
        //#region Change Color
        try {
            document.getElementById("activity-wrapper").style.backgroundColor = "#FF4B4B";
            setTimeout(() => {
                try {
                    document.getElementById("activity-wrapper").style.backgroundColor = "white";
                } catch (error) {
                    
                }
                
            }, 800)
        } catch (error) {
        }
        //#endregion
        
        if(totalScore + 1 == maxScore){
            addData(event, false)
            setTotalScore(totalScore+1)
            setGameOver(true)
        }else{
            addData(event, false)
            let point = RandomPoint([posX, posY])
            setPosX(point[0])
            setPosY(point[1])
            setTotalScore(totalScore+1)
        }
        
    }

    if(gameOver){
        return(
            <EndGameTemplate taskTitle="Finger Calibration"  playerScore={currScore} 
                totalScore={totalScore} downloadData={collectedData}/>
        );
    }

    return(
        <ActivityTemplate currScore={currScore} totalScore={totalScore} handleClick={handleCanvasClick}>
            <PointGenerator posX={posX} posY={posY} clickFunction={handlePointClick}/>
        </ActivityTemplate>)
}

export default FingerCalibrationActivity

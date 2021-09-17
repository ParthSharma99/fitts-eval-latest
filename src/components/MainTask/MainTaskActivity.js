import React, { useState } from 'react'
import { useAuth } from '../../contexts/ContextProvider';
import ActivityTemplate from '../Templates/ActivityTemplate';
import PointGenerator from '../PointGenerator';
import EndGameTemplate from '../Templates/EndGameTemplate';


function MainTaskActivity() {
    const [currScore, setCurrScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const {RandomPoint, maxScore, getDistance} = useAuth()
    const currentPoint1 = RandomPoint()
    const currentPoint2 = RandomPoint()
    const [pos1X, setPos1X] = useState(currentPoint1[0])
    const [pos1Y, setPos1Y] = useState(currentPoint1[1])
    const [pos2X, setPos2X] = useState(currentPoint2[0])
    const [pos2Y, setPos2Y] = useState(currentPoint2[1])
    const [gameOver, setGameOver] = useState(false)
    const [collectedData, setCollectedData] = useState([])

    const addData = (event, hitVal) => {
        //#region Add Data to store current Progress
        const dist = getDistance(pos1X, pos1Y, event.clientX, event.clientY)
        let tempData = {
            'TrialNo': totalScore+1,
            'target_x': pos1X,
            'target_y': pos1Y,
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
            let point = RandomPoint()
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
            let point = RandomPoint()
            setTotalScore(totalScore+1)
        }
        
    }

    if(gameOver){
        return(
            <EndGameTemplate taskTitle="Finger Calibration"  playerScore={currScore} 
                totalScore={totalScore} downloadData={collectedData}  avgWindow={true}/>
        );
    }

    return(
        <ActivityTemplate currScore={currScore} totalScore={totalScore} handleClick={handleCanvasClick}>
            <PointGenerator posX={pos1X} posY={pos1Y} clickFunction={handlePointClick}/>
            <PointGenerator posX={pos2X} posY={pos2Y} clickFunction={handlePointClick}/>
        </ActivityTemplate>)

}

export default MainTaskActivity

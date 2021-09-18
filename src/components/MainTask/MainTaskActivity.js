import React, { useState } from 'react'
import { useAuth } from '../../contexts/ContextProvider';
import ActivityTemplate from '../Templates/ActivityTemplate';
import PointGenerator from '../PointGenerator';
import EndGameTemplate from '../Templates/EndGameTemplate';


function MainTaskActivity() {
    const [currScore, setCurrScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const {RandomPoint, maxScore, getDistance, RandomPointAtDistance} = useAuth()
    const currentPoint1 = RandomPoint()
    const currentPoint2 = RandomPointAtDistance(currentPoint1)
    const [pos1X, setPos1X] = useState(currentPoint1[0])
    const [pos1Y, setPos1Y] = useState(currentPoint1[1])
    const [pos2X, setPos2X] = useState(currentPoint2[0])
    const [pos2Y, setPos2Y] = useState(currentPoint2[1])
    const [touch1, setTouch1] = useState([])
    const [gameOver, setGameOver] = useState(false)
    const [collectedData, setCollectedData] = useState([])
    const [averageTime, setAverageTime] = useState(0)
    const [prevTimestamp, setPrevTimestamp] = useState(0)

    const addData = (duration, hitVal, finalTouchEvent) => {
        //#region Add Data to store current Progress
        let tempData = {
            'TrialNo': totalScore+1,
            'start_target_x':pos1X,
            'start_target_y':pos1Y,
            'start_touch_x':touch1[0],
            'start_touch_y':touch1[1],
            'end_target_x': pos2X,
            'end_target_y':pos2Y,
            'end_touch_x':finalTouchEvent.clientX * 1.0,
            'end_touch_y':finalTouchEvent.clientY * 1.0,
            'hit': hitVal,
            'Duration':duration,
        }
        setCollectedData(collectedData => [...collectedData, tempData])
        //#endregion
    }

    const handlePointClick1 = (event) => {
        event.cancelBubble = true;
        if(event.stopPropagation) event.stopPropagation();
        if(gameOver) return;
        setPrevTimestamp(event.timeStamp)
        setTouch1([event.clientX, event.clientY])
        //#region Change Color
        try {
            document.getElementById("point1").style.display = "none";
            document.getElementById("point2").style.backgroundColor = "black";
        } catch (error) {
        }
        //#endregion
        
    }

    const handlePointClick2 = (event) => {
        event.cancelBubble = true;
        if(event.stopPropagation) event.stopPropagation();
        if(gameOver) return;

        const duration = event.timeStamp - prevTimestamp
        setAverageTime(averageTime + duration)
        //#region Change Color
        try {
            document.getElementById("point2").style.display = "none";
            document.getElementById("activity-wrapper").style.backgroundColor = "#4FC53C";
            setTimeout(() => {
                try {
                    document.getElementById("activity-wrapper").style.backgroundColor = "white";
                    document.getElementById("point1").style.display = "block";
                    document.getElementById("point2").style.display = "block";
                    document.getElementById("point2").style.backgroundColor = "white";
                } catch (error) {
                    
                }
            }, 500)
        } catch (error) {
        }
        //#endregion
        

        if(totalScore + 1 == maxScore){
            addData(duration, true, event)
            setCurrScore(currScore+1)
            setTotalScore(totalScore+1)
            setGameOver(true)
        }else{
            addData(duration, true, event)
            let point1 = RandomPoint()
            let point2 = RandomPointAtDistance(point1)
            setPos1X(point1[0])
            setPos1Y(point1[1])
            setPos2X(point2[0])
            setPos2Y(point2[1])
            setCurrScore(currScore+1)
            setTotalScore(totalScore+1)
        }
    }

    const handleCanvasClick = (event) =>{
        if(gameOver) return;
        if(document.getElementById("point1").style.display != "none"){
            return
        }
        const duration = event.timeStamp - prevTimestamp
        setAverageTime(averageTime + duration)
        //#region Change Color
        try {
            document.getElementById("activity-wrapper").style.backgroundColor = "#FF4B4B";
            document.getElementById("point2").style.display = "none";
            setTimeout(() => {
                try {
                    document.getElementById("activity-wrapper").style.backgroundColor = "white";
                    document.getElementById("point1").style.display = "block";
                    document.getElementById("point2").style.display = "block";
                    document.getElementById("point2").style.backgroundColor = "white";
                } catch (error) {
                    
                }
                
            }, 800)
        } catch (error) {
        }
        //#endregion
        
        if(totalScore + 1 == maxScore){
            addData(duration, false, event)
            setTotalScore(totalScore+1)
            setGameOver(true)
        }else{
            addData(duration, false, event)
            let point1 = RandomPoint()
            let point2 = RandomPointAtDistance(point1)
            setPos1X(point1[0])
            setPos1Y(point1[1])
            setPos2X(point2[0])
            setPos2Y(point2[1])
            setTotalScore(totalScore+1)
        }
        
    }

    if(gameOver){
        return(
            <EndGameTemplate taskTitle="Main Task"  playerScore={currScore} 
                totalScore={totalScore} downloadData={collectedData}  avgWindow={true} averageTime={averageTime/ (maxScore * 1000)}/>
        );
    }

    return(
        <ActivityTemplate currScore={currScore} totalScore={totalScore} handleClick={handleCanvasClick}>
            <PointGenerator posX={pos1X} posY={pos1Y} clickFunction={handlePointClick1} id={"point1"}/>
            <PointGenerator posX={pos2X} posY={pos2Y} clickFunction={handlePointClick2} color={"white"} id={"point2"}/>
        </ActivityTemplate>)

}

export default MainTaskActivity

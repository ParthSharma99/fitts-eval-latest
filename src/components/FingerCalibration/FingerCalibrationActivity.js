import React, { useState } from 'react'
import { useAuth } from '../../contexts/ContextProvider';
import ActivityTemplate from '../Templates/ActivityTemplate';
import PointGenerator from '../PointGenerator';
import EndGameTemplate from '../Templates/EndGameTemplate';

function FingerCalibrationActivity() {
    const [currScore, setCurrScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const {RandomPoint, maxScore} = useAuth()
    const currentPoint = RandomPoint()
    const [posX, setPosX] = useState(currentPoint[0])
    const [posY, setPosY] = useState(currentPoint[1])
    const [gameOver, setGameOver] = useState(false)

    const handlePointClick = () => {
        if(gameOver) return;
        if(totalScore + 1 == maxScore){
            setCurrScore(currScore+1)
            setTotalScore(totalScore+1)
            setGameOver(true)
        }else{
            let point = RandomPoint()
            setPosX(point[0])
            setPosY(point[1])
            setCurrScore(currScore+1)
            setTotalScore(totalScore+1)
        }
    }

    const handleCanvasClick = () =>{
        if(gameOver) return;
        if(totalScore + 1 == maxScore){
            setTotalScore(totalScore+1)
            setGameOver(true)
        }else{
            let point = RandomPoint()
            setPosX(point[0])
            setPosY(point[1])
            setTotalScore(totalScore+1)
        }
        
    }

    if(gameOver){
        return(
            <EndGameTemplate taskTitle="Finger Calibration"  playerScore={currScore} 
                totalScore={totalScore} />
        );
    }

    return(
        <ActivityTemplate currScore={currScore} totalScore={totalScore} handleClick={handleCanvasClick}>
            <PointGenerator posX={posX} posY={posY} clickFunction={handlePointClick}/>
        </ActivityTemplate>)
}

export default FingerCalibrationActivity

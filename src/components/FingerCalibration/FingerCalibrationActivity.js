import React, { useState } from 'react'
import ActivityTemplate from '../ActivityTemplate';
import PointGenerator from '../PointGenerator';

function FingerCalibrationActivity() {
    const [currScore, setCurrScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    return(
        <ActivityTemplate currScore={currScore} totalScore={totalScore}>
            <PointGenerator posX={70} posY={50}/>
        </ActivityTemplate>)
}

export default FingerCalibrationActivity

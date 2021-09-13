import React from 'react'
import { useAuth } from '../../contexts/AuthContext';

function FingerCalibrationActivity() {
    const {canvasMargin, canvasPadding, scoreBoardHeight,scoreBoardBorderWidth} = useAuth()
    const exceptCanvasHeight = scoreBoardHeight + (2 * (canvasMargin + canvasPadding)) + scoreBoardBorderWidth;
    return (
        <div>
            <div className="score-board" style={{borderBottom:scoreBoardBorderWidth + "px solid black"}}>

            </div>
            <div id="canvas" style={{
                    padding: "8px",
                    margin: "16px",
                    height: "calc(100vh - "+ exceptCanvasHeight +"px)"
            }}>
                
            </div>
        </div>
    );
}

export default FingerCalibrationActivity

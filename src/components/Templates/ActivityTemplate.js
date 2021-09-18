import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../../contexts/ContextProvider';


function ActivityTemplate({currScore, totalScore, children, handleClick}) {
    const {canvasMargin, canvasPadding, scoreBoardHeight,scoreBoardBorderWidth, saveData} = useAuth()
    const exceptCanvasHeight = scoreBoardHeight + (2 * (canvasMargin + canvasPadding)) + scoreBoardBorderWidth;

    useEffect(() => saveData(), [])
    
    return (
        <div id="activity-wrapper">
            <div className="score-board" style={{borderBottom:scoreBoardBorderWidth + "px solid black"}}>
                {currScore} / {totalScore} &emsp;
            </div>
            <div id="canvas" style={{
                    padding: "8px",
                    margin: "16px",
                    height: "calc(100vh - "+ exceptCanvasHeight +"px)"
            }} onMouseDown={handleClick}>
                {children}
            </div>
        </div>
    );
}

ActivityTemplate.propTypes = {
    currScore : PropTypes.number.isRequired,
    totalScore: PropTypes.number.isRequired,
    children: PropTypes.any
}

export default ActivityTemplate

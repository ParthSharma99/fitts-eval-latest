import React from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../contexts/ContextProvider';


function ActivityTemplate({currScore, totalScore, children}) {
    const {canvasMargin, canvasPadding, scoreBoardHeight,scoreBoardBorderWidth} = useAuth()
    const exceptCanvasHeight = scoreBoardHeight + (2 * (canvasMargin + canvasPadding)) + scoreBoardBorderWidth;
    return (
        <div>
            <div className="score-board" style={{borderBottom:scoreBoardBorderWidth + "px solid black"}}>
                {currScore} / {totalScore} &emsp;
            </div>
            <div id="canvas" style={{
                    padding: "8px",
                    margin: "16px",
                    height: "calc(100vh - "+ exceptCanvasHeight +"px)"
            }}>
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

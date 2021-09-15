import React from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../contexts/ContextProvider';

function PointGenerator({posX, posY, radius, color, clickFunction}) {
    const {targetButtonRadius} = useAuth()
    const pointStyle = {
      width: targetButtonRadius*2 + "px",
      height: targetButtonRadius*2 + "px",
      left: (posX ) + "px",  
      bottom: (posY ) + "px"
    };
    return (
      <div className="point-wrapper" style={pointStyle} onMouseDown={clickFunction}/>
    );
}

PointGenerator.propTypes = {

}

export default PointGenerator

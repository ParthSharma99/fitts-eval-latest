import React from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../contexts/ContextProvider';

function PointGenerator({posX, posY, radius, color, clickFunction, id}) {
    const {targetButtonRadius} = useAuth()
    const pointStyle = {
      width: targetButtonRadius*2 + "px",
      height: targetButtonRadius*2 + "px",
      left: (posX) + "px",  
      top: (posY) + "px",
      border: "0.1px solid",
      backgroundColor: color,
    };
    return (
      <div className="point-wrapper" id={id} style={pointStyle} onMouseDown={clickFunction}/>
    );
}

PointGenerator.propTypes = {

}

export default PointGenerator

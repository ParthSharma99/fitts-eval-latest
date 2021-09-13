import React from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../contexts/ContextProvider';

function PointGenerator({posX, posY, radius, color}) {
    const {targetButtonRadius} = useAuth()
    const pointStyle = {
      width: targetButtonRadius + "px",
      height: targetButtonRadius + "px",
      left: posX + "px", 
      bottom: posY + "px"
    };
    return (
      <div className="point-wrapper" style={pointStyle} />
    );
}

PointGenerator.propTypes = {

}

export default PointGenerator

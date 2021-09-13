import React from 'react'
import { useHistory } from 'react-router'

function MainMenu() {
    const history = useHistory();
    return (
        <div className="main-menu-wrapper">
            <div className="options-button-wrapper" onClick={() => history.push("/finger-calibration")}>
                finger calibration
            </div>
            <div className="options-button-wrapper" onClick={() => history.push("/main-task")}>
                main task
            </div>
            <div className="options-button-wrapper" onClick={() => history.push("/screen-calibration")}>
                screen calibration
            </div>
        </div>
    )
}

export default MainMenu

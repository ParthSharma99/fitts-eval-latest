import React from 'react'
import { useAuth } from '../../contexts/ContextProvider'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from 'react-router';


function FingerCalibrationMainMenu() {
    const history = useHistory()
    const {username, setUsername} = useAuth();
    const {age, setAge} = useAuth();
    const {targetButtonRadius, setTargetButtonRadius} = useAuth();
    const {distanceRadius, setDistanceRadius} = useAuth();
    const {fingerRadioSelection, setFingerRadioSelection} = useAuth();
    return (
    <div className="details-menu-wrapper">
        <div className="input-field-wrapper">
            <div className="field-label">Username</div>
            <div className="input-field"><input value={username} onChange={(e) => setUsername(e.target.value)}/></div>
        </div>
        <div className="input-field-wrapper">
            <div className="field-label">Age</div>
            <div className="input-field"><input value={age} onChange={(e) => setAge(e.target.value)}/></div>
        </div>
        <div className="input-field-wrapper">
            <div className="field-label">Target button radius</div>
            <div className="input-field"><input value={targetButtonRadius} onChange={(e) => setTargetButtonRadius(e.target.value)}/></div>
        </div>
        <div className="radio-button-wrapper">
            <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue="NT" onChange={(e) => setFingerRadioSelection(e.target.value)}>
                    <FormControlLabel
                    value="NT"
                    control={<Radio color="primary" />}
                    label="NT"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="DT"
                    control={<Radio color="primary" />}
                    label="DT"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="NF"
                    control={<Radio color="primary" />}
                    label="NF"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="DF"
                    control={<Radio color="primary" />}
                    label="DF"
                    labelPlacement="top"
                    />
                    
                </RadioGroup>
            </FormControl>
        </div>
        <div className="copy-button-wrapper">copy from last experiment</div>
        <div className="start-button-wrapper" onClick={() => history.push("/finger-calibration-activity")}>start</div>
    </div>)
}

export default FingerCalibrationMainMenu

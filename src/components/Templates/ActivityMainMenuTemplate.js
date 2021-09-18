import React from 'react'
import { useAuth } from '../../contexts/ContextProvider'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types'

function ActivityMainMenuTemplate({nextTaskPath, inputFieldsData}) {
    const history = useHistory()
    const {setFingerRadioSelection, copyFromLastSaved, fingerRadioSelection} = useAuth();
    return (
    <div className="details-menu-wrapper">
        {
            inputFieldsData.map((data) => 
            <div className="input-field-wrapper">
                <div className="field-label">{data['label']}</div>
                <div className="input-field"><input value={data['value']} onChange={(e) => data['setValue'](e.target.value)}/></div>
            </div>
            )
        }
        <div className="radio-button-wrapper">
            <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue={fingerRadioSelection} onChange={(e) => setFingerRadioSelection(e.target.value)}>
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
        <div className="copy-button-wrapper" onClick={() => copyFromLastSaved()}>copy from last experiment</div>
        <div className="start-button-wrapper" onClick={() => history.push(nextTaskPath)}>start</div>
    </div>)
}

ActivityMainMenuTemplate.propTypes = {

}

export default ActivityMainMenuTemplate

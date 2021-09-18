import React from 'react'
import PropTypes from 'prop-types'
import trash from "../../images/trash.svg"
import checkSquare from "../../images/checkSquare.svg"
import { useAuth } from '../../contexts/ContextProvider'
import { useHistory } from 'react-router'

function EndGameTemplate({taskTitle, playerScore, totalScore, averageTime, downloadData, avgWindow}) {
    const {username, age, targetButtonRadius,fingerRadioSelection, distanceRadius } = useAuth()
    const history = useHistory()
    console.log(averageTime)
    function convertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = Object.keys(array[0]).join(',');
        str=str+'\r\n';
      
        for (var i = 0; i < array.length; i++) {
          var line = '';
          for (var index in array[i]) {
            if (line != '') line += ','
            line += array[i][index];
          }
          str += line + '\r\n';
        }
        return str;
    }
      
    const downloadClick = () =>{
        console.log("Download Data")
        let csvStr = convertToCSV(downloadData)
        let csvContent = "data:text/csv;charset=utf-8,"+csvStr
        var encodedUri = encodeURI(csvContent);
        var name = taskTitle.replace(" ","") + "_" + username +"_" + age + "_" + targetButtonRadius;
        if(taskTitle === "Main Task"){
            name  = name + "_" + distanceRadius;
        }
        name = name + "_" + fingerRadioSelection
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", name + ".csv");
        document.body.appendChild(link); 
        link.click();
    }
    const deleteClick = () =>{
        console.log("Delete Data")
        history.push("/")
    }

    return (
        <div className="end-game-wrapper">
            <div className="task-title">{taskTitle}</div>
            <div className="score-container">
                <div className="your-score-wrapper">your score</div> 
                <div className="score-wrapper">{playerScore} / {totalScore}</div> 
            </div>
            {
                avgWindow 
                ? 
                <div className="average-score-container">
                    <div className="average-score-title-wrapper">average time per trial</div> 
                    <div className="average-score-wrapper">{averageTime.toFixed(3)} sec</div> 
                </div>
                :""
            }
            
            <div className="buttons-container">
                <div className="download-data-button" onClick={downloadClick}><img src={checkSquare}/>&emsp;Download</div>
                <div className="delete-data-button" onClick={deleteClick}><img src={trash}/>&emsp;Delete</div>
            </div>
        </div>
    )
}

EndGameTemplate.propTypes = {

}

export default EndGameTemplate

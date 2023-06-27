import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import trash from "../../images/trash.svg";
import checkSquare from "../../images/checkSquare.svg";
import { useAuth } from "../../contexts/ContextProvider";
import { useHistory } from "react-router";

function EndGameTemplate({
  taskTitle,
  playerScore,
  totalScore,
  averageTime,
  downloadData,
  avgWindow,
  enableSigmaA,
}) {
  const {
    username,
    age,
    targetButtonRadius,
    fingerRadioSelection,
    distanceRadius,
    pixelConverter,
  } = useAuth();
  const [sigmaA, setSigmaA] = useState(0);
  const [sigmaData, setSigmaData] = useState({});
  const history = useHistory();
  console.log(averageTime);
  function convertToCSV(objArray) {
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = Object.keys(array[0]).join(",");
    if (enableSigmaA) {
      str += "," + Object.keys(sigmaData).join(",");
    }
    str = str + "\r\n";

    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line != "") line += ",";
        line += array[i][index];
      }
      if (enableSigmaA) {
        line += "," + sigmaData["x"][i];
        line += "," + sigmaData["y"][i];
        if (i == 0) {
          line += "," + sigmaData["xbar"];
          line += "," + sigmaData["ybar"];
        } else {
          line += ",-";
          line += ",-";
        }
        line += "," + sigmaData["(xi-xbar)^2"][i];
        line += "," + sigmaData["(yi-ybar)^2"][i];
        line += "," + sigmaData["total"][i];
        if (i == 0) {
          line += "," + sigmaData["sigmaA"];
        } else {
          line += ",-";
          line += ",-";
        }
      }
      str += line + "\r\n";
    }
    return str;
  }

  const downloadClick = () => {
    console.log("Download Data");
    let csvStr = convertToCSV(downloadData);
    let csvContent = "data:text/csv;charset=utf-8," + csvStr;
    var encodedUri = encodeURI(csvContent);
    var name =
      taskTitle.replace(" ", "") +
      "_" +
      username +
      "_" +
      age +
      "_" +
      targetButtonRadius;
    if (taskTitle === "Main Task") {
      name = name + "_" + distanceRadius;
    }
    name = name + "_" + fingerRadioSelection;
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", name + ".csv");
    document.body.appendChild(link);
    link.click();
  };

  const sumArr = (arr) => {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  };

  const mean = (arr) => {
    var sum = sumArr(arr);
    const avg = sum / arr.length || 0;
    return avg;
  };

  const calcSigmaA = (objArray) => {
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var x = [];
    var y = [];
    for (var i = 0; i < array.length; i++) {
      if ("target_x" in array[i]) {
        x.push((array[i]["target_x"] - array[i]["touch_x"]) / pixelConverter);
        y.push((array[i]["target_y"] - array[i]["touch_y"]) / pixelConverter);
      } else {
      }
    }
    var xbar = mean(x);
    var ybar = mean(y);

    var xixbar = [];
    var yiybar = [];
    var total = [];
    for (var i = 0; i < array.length; i++) {
      xixbar.push((x[i] - xbar) * (x[i] - xbar));
      yiybar.push((y[i] - ybar) * (y[i] - ybar));
      total.push(xixbar[i] + yiybar[i]);
    }
    var temp = Math.sqrt(sumArr(total) / (total.length - 1));
    setSigmaData({
      x: x,
      y: y,
      xbar: xbar,
      ybar: ybar,
      "(xi-xbar)^2": xixbar,
      "(yi-ybar)^2": yiybar,
      total: total,
      sigmaA: temp,
    });
    setSigmaA(temp);
  };

  const deleteClick = () => {
    console.log("Delete Data");
    history.push("/");
  };

  useEffect(() => {
    if (enableSigmaA) {
      calcSigmaA(downloadData);
    }
  }, []);

  return (
    <div className="end-game-wrapper">
      <div className="task-title">{taskTitle}</div>
      <div className="score-container">
        <div className="your-score-wrapper">your score</div>
        <div className="score-wrapper">
          {playerScore} / {totalScore}
        </div>
      </div>
      {avgWindow ? (
        <>
          <div className="average-score-container">
            <div className="average-score-title-wrapper">
              average time per trial
            </div>
            <div className="average-score-wrapper">
              {averageTime.toFixed(3)} sec
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {enableSigmaA ? (
        <div className="average-score-container">
          <div className="average-score-title-wrapper">sigma_a</div>
          <div className="average-score-wrapper">{sigmaA.toFixed(2)}</div>
        </div>
      ) : (
        ""
      )}
      <div className="buttons-container">
        <div className="download-data-button" onClick={downloadClick}>
          <img src={checkSquare} />
          &emsp;Download
        </div>
        <div className="delete-data-button" onClick={deleteClick}>
          <img src={trash} />
          &emsp;Delete
        </div>
      </div>
    </div>
  );
}

EndGameTemplate.propTypes = {};

export default EndGameTemplate;

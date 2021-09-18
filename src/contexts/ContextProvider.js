import React, { useContext, useState, useEffect } from "react"
import useWindowDimensions from "./ScreenDimensions"

const ContextProvider = React.createContext()

export function useAuth() {
  return useContext(ContextProvider)
}


function getAngleFromX(radius, center, x){
  let angle = (180 * Math.acos( ( (x - center[0]) / radius) ))/Math.PI;
  if(angle){
    return [angle, 360-angle];
  }
  return [];
}

function getAngleFromY(radius, center, y){
  let angle = (180 * Math.asin((y - center[1]) / radius))/Math.PI;
  if(angle){
    if(angle > 0){
      return [angle, 180 - angle];
    }
    return [360 + angle, 180 - angle];
  }
  return [];
}

function* shuffle(array) {

  var i = array.length;

  while (i--) {
      yield array.splice(Math.floor(Math.random() * (i+1)), 1)[0];
  }

}

function betweenAvoidingRange (avoidingRanges, angle){
  avoidingRanges.forEach(element => {
    if(angle > Math.min(...element) && angle < Math.max(...element))  return true;
  });
  return false
}

export function AuthProvider({ children }) {
  //#region Variable and Constants
  const scoreBoardHeight = 60;
  const scoreBoardBorderWidth = 1;
  const maxScore = 15;
  const canvasMargin = 16;
  const canvasPadding = 8;
  const minDistance = 50;
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [age, setAge] = useState(0)
  const [targetButtonRadius, setTargetButtonRadius] = useState(25)
  const [distanceRadius, setDistanceRadius] = useState(70)
  const [fingerRadioSelection, setFingerRadioSelection] = useState("NT")
  const {height, width} = useWindowDimensions()
  //#endregion

  //#region Randomisation Functions
  const getCanvasCoordinates= () => {
    const xranges = [canvasMargin + canvasPadding,  width - (canvasMargin + canvasPadding + (2*targetButtonRadius))];
    const yranges = [canvasMargin + canvasPadding + scoreBoardHeight + scoreBoardBorderWidth,  height - (canvasMargin + canvasPadding + (2*targetButtonRadius))];
    return [xranges, yranges];
  }
  
  const RandomPoint = (prevPoint) => {
    const [xranges, yranges] = getCanvasCoordinates();
    let x = (Math.random() * (xranges[1] - xranges[0]) )+ xranges[0];
    let y = (Math.random() * (yranges[1] - yranges[0]) )+ yranges[0];
    if(prevPoint != undefined){
      let limiter = 40;
      while(getDistance(prevPoint[0], prevPoint[1], x, y) < minDistance + targetButtonRadius && limiter>0){
        x = (Math.random() * (xranges[1] - xranges[0]) )+ xranges[0];
        y = (Math.random() * (yranges[1] - yranges[0]) )+ yranges[0];
        limiter--;
      }
    }
    return [x,y];
  }
  
  const RandomPointAtDistance = (prevPoint) => {
    const [xranges, yranges] = getCanvasCoordinates();
    if(prevPoint != undefined){
      //#region Arc Randomisation Method
      // let avoidingRanges = [];
      // if(prevPoint[0] - distanceRadius < xranges[0]){
      //   let angleRanges = getAngleFromX(targetButtonRadius, prevPoint, xranges[0])
      //   if(angleRanges.length > 0)  avoidingRanges.push(angleRanges)
      // }
      // if(prevPoint[0] + distanceRadius > xranges[1]){
      //   let angleRanges = getAngleFromX(targetButtonRadius, prevPoint, xranges[1])
      //   if(angleRanges.length > 0)  avoidingRanges.push(angleRanges)
      // }
      // if(prevPoint[1] - distanceRadius < yranges[0]){
      //   let angleRanges = getAngleFromY(targetButtonRadius, prevPoint, yranges[0])
      //   if(angleRanges.length > 0)  avoidingRanges.push(angleRanges)
      // }
      // if(prevPoint[1] + distanceRadius > yranges[1]){
      //   let angleRanges = getAngleFromY(targetButtonRadius, prevPoint, yranges[1])
      //   if(angleRanges.length > 0)  avoidingRanges.push(angleRanges)
      // }
      // console.log("avoidingRanges : ", avoidingRanges)

      // let angle = Math.random() * (360);
      // let limiter = 50;
      // while(betweenAvoidingRange(avoidingRanges, angle) && limiter > 0){
      //   angle = Math.random() * 360;
      //   limiter--;
      // }
      // let x = ((Math.cos(angle * Math.PI / 180))* distanceRadius) + prevPoint[0];
      // let y = ((Math.cos(angle * Math.PI / 180))* distanceRadius) + prevPoint[0];
      // console.log(getDistance(x,y,prevPoint[0], prevPoint[1]) == distanceRadius)
      // return [x,y];
      //#endregion

      //#region Randomisation Normal
      let randomRange = shuffle([...Array(360).keys()])
      let angle = randomRange.next().value;
      
      let x = ((Math.cos(angle * Math.PI / 180))* distanceRadius) + prevPoint[0];
      let y = ((Math.sin(angle * Math.PI / 180))* distanceRadius) + prevPoint[1];
      let limiter=300;
      let luckyCharm = Math.floor(Math.random() * 10 + 1);
      while((x >= xranges[1] || x <= xranges[0] || y <= yranges[0] || y >= yranges[1])&& limiter > 0){
        // angle += (Math.random() * 200 + 1);
        angle = randomRange.next().value;
        x = ((Math.cos(angle * Math.PI / 180))* distanceRadius) + prevPoint[0];
        y = ((Math.sin(angle * Math.PI / 180))* distanceRadius) + prevPoint[1];
        limiter--;
      }
      if(limiter == 0)  return [-1,-1];
      console.log(Math.fround(getDistance(x,y,prevPoint[0], prevPoint[1]))  == distanceRadius)
      return [x,y];
      //#endregion

    }else{
      console.log("prevPoint Not found")
      return [-1,-1];
    }
  }
  //#endregion

  //#region Useful Functions
  const getDistance = (aX, aY, bX, bY) => {
    let dx = Math.abs(aX - bX)
    let dy = Math.abs(aY - bY)
    return Math.sqrt( (dx*dx) + (dy*dy))
  }
  const saveData = () =>{
    localStorage['username'] = username
    localStorage['age'] = age
    localStorage['targetButtonRadius'] = targetButtonRadius
    localStorage['distanceRadius'] = distanceRadius
    localStorage['fingerRadioSelection'] = fingerRadioSelection
  }

  const copyFromLastSaved = () => {
    setUsername(localStorage['username'] || "")
    setAge(localStorage['age'] || 0)
    setTargetButtonRadius(localStorage['targetButtonRadius'] || 25)
    setDistanceRadius(localStorage['distanceRadius'] || 70)
    setFingerRadioSelection(localStorage['fingerRadioSelection'] || "NT")
  }
  //#endregion

  const value = {
    scoreBoardHeight,
    scoreBoardBorderWidth,
    maxScore,
    canvasMargin,
    canvasPadding,
    username,
    age,
    targetButtonRadius,
    distanceRadius,
    fingerRadioSelection,
    getDistance,
    setLoading,
    setUsername,
    setAge,
    setTargetButtonRadius,
    setDistanceRadius,
    setFingerRadioSelection,
    RandomPoint,
    RandomPointAtDistance,
    copyFromLastSaved,
    saveData
  }

  return (
    <ContextProvider.Provider value={value}>
      {!loading && children}
    </ContextProvider.Provider>
  )
}

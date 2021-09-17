import React, { useContext, useState, useEffect } from "react"
import useWindowDimensions from "./ScreenDimensions"

const ContextProvider = React.createContext()

export function useAuth() {
  return useContext(ContextProvider)
}


export function AuthProvider({ children }) {
  //#region Variable and Constants
  const scoreBoardHeight = 60;
  const scoreBoardBorderWidth = 1;
  const maxScore = 15;
  const canvasMargin = 16;
  const canvasPadding = 8;
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [age, setAge] = useState(0)
  const [targetButtonRadius, setTargetButtonRadius] = useState(50)
  const [distanceRadius, setDistanceRadius] = useState(0)
  const [fingerRadioSelection, setFingerRadioSelection] = useState("NT")
  const {height, width} = useWindowDimensions()
  //#endregion

  //#region Randomisation Functions
  const getCanvasCoordinates= () => {
    const xranges = [canvasMargin + canvasPadding,  width - (canvasMargin + canvasPadding + 2*targetButtonRadius)];
    const yranges = [canvasMargin + canvasPadding + scoreBoardHeight + scoreBoardBorderWidth,  height - (canvasMargin + canvasPadding + 2*targetButtonRadius + scoreBoardBorderWidth + scoreBoardHeight)];
    return [xranges, yranges];
  }
  
  const RandomPoint = (prevPoint) => {
    const [xranges, yranges] = getCanvasCoordinates();
    let x = (Math.random() * (xranges[1] - xranges[0]) )+ xranges[0];
    let y = (Math.random() * (yranges[1] - yranges[0]) )+ yranges[0];
    if(prevPoint){
      let limiter = 40;
      while(getDistance(prevPoint[0], prevPoint[1], x, y) && limiter>0){
        x = (Math.random() * (xranges[1] - xranges[0]) )+ xranges[0];
        y = (Math.random() * (yranges[1] - yranges[0]) )+ yranges[0];
        limiter--;
      }
    }
    return [x,y];
  }
  
  const RandomPointAtDistance = (prevPoint, distance) => {
    const [xranges, yranges] = getCanvasCoordinates();
    if(prevPoint[0] == -1){
      return RandomPoint();
    }
    

    
  }
  //#endregion

  //#region Useful Functions
  const getDistance = (aX, aY, bX, bY) => {
    let dx = Math.abs(aX - bX)
    let dy = Math.abs(aY - bY)
    return Math.sqrt( (dx*dx) + (dy*dy))
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
    RandomPoint
  }

  return (
    <ContextProvider.Provider value={value}>
      {!loading && children}
    </ContextProvider.Provider>
  )
}

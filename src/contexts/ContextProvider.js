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
    const yranges = [canvasMargin + canvasPadding,  height - (canvasMargin + canvasPadding + 2*targetButtonRadius + scoreBoardBorderWidth + scoreBoardHeight)];
    return [xranges, yranges];
  }
  
  const RandomPoint = () => {
    const [xranges, yranges] = getCanvasCoordinates();
    let x = (Math.random() * (xranges[1] - xranges[0]) )+ xranges[0];
    let y = (Math.random() * (yranges[1] - yranges[0]) )+ yranges[0];
    return [x,y];
  }
  
  const RandomPointAtDistance = (prevPoint, distance) => {
    const [xranges, yranges] = getCanvasCoordinates();
    if(prevPoint[0] == -1){
      return RandomPoint();
    }
    
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

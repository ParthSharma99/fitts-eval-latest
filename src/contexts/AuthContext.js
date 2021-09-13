import React, { useContext, useState, useEffect } from "react"


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const scoreBoardHeight = 60;
  const scoreBoardBorderWidth = 1;
  const canvasMargin = 16;
  const canvasPadding = 8;
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [age, setAge] = useState(0)
  const [targetButtonRadius, setTargetButtonRadius] = useState(0)
  const [distanceRadius, setDistanceRadius] = useState(0)
  const [fingerRadioSelection, setFingerRadioSelection] = useState("NT")
  const value = {
    scoreBoardHeight,
    scoreBoardBorderWidth,
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
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

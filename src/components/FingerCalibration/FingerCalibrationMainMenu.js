import React from "react";
import { useAuth } from "../../contexts/ContextProvider";
import ActivityMainMenuTemplate from "../Templates/ActivityMainMenuTemplate";

function FingerCalibrationMainMenu() {
  const { username, setUsername } = useAuth();
  const { age, setAge } = useAuth();
  const { targetButtonRadius, setTargetButtonRadius } = useAuth();
  const { pixelConverter, setPixelConverter } = useAuth();
  const { sessionCounter, setSessionCounter } = useAuth();
  const inputFieldsData = [
    { label: "Username", value: username, setValue: setUsername },
    { label: "Age", value: age, setValue: setAge },
    {
      label: "Target Button Radius",
      value: targetButtonRadius,
      setValue: setTargetButtonRadius,
    },
    {
      label: "Session",
      value: sessionCounter,
      setValue: setSessionCounter,
    },
    {
      label: "Pixel Converter",
      value: pixelConverter,
      setValue: setPixelConverter,
    },
  ];
  return (
    <ActivityMainMenuTemplate
      inputFieldsData={inputFieldsData}
      nextTaskPath="/finger-calibration-activity"
    />
  );
}

export default FingerCalibrationMainMenu;

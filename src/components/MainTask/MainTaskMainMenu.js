import React from "react";
import { useAuth } from "../../contexts/ContextProvider";
import ActivityMainMenuTemplate from "../Templates/ActivityMainMenuTemplate";

function MainTaskMainMenu() {
  const { username, setUsername } = useAuth();
  const { age, setAge } = useAuth();
  const { targetButtonRadius, setTargetButtonRadius } = useAuth();
  const { distanceRadius, setDistanceRadius } = useAuth();
  const { pixelConverter, setPixelConverter } = useAuth();
  const inputFieldsData = [
    { label: "Username", value: username, setValue: setUsername },
    { label: "Age", value: age, setValue: setAge },
    {
      label: "Target Button Radius",
      value: targetButtonRadius,
      setValue: setTargetButtonRadius,
    },
    {
      label: "Distance Radius",
      value: distanceRadius,
      setValue: setDistanceRadius,
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
      nextTaskPath="/main-task-activity"
    />
  );
}

export default MainTaskMainMenu;

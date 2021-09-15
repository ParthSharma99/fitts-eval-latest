import './App.css';
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import {AuthProvider} from "./contexts/ContextProvider"
import MainMenu from './components/MainMenu';
import ScreenCalibration from './components/ScreenCalibration';
import FingerCalibrationMainMenu  from './components/FingerCalibration/FingerCalibrationMainMenu';
import FingerCalibrationActivity  from './components/FingerCalibration/FingerCalibrationActivity';
import MainTaskMainMenu from './components/MainTask/MainTaskMainMenu';
import MainTaskActivity from './components/MainTask/MainTaskActivity'
import EndGameTemplate from './components/Templates/EndGameTemplate';

function App() {
  return (
    <>
      <AuthProvider>
        <Router history={useHistory()}>    
          <Route path="/" exact component={MainMenu}/>
          <Route path="/screen-calibration" component={ScreenCalibration}/>
          <Route path="/main-task" component={MainTaskMainMenu}/>
          <Route path="/main-task-activity" component={MainTaskActivity}/>
          <Route path="/finger-calibration" component={FingerCalibrationMainMenu}/>
          <Route path="/finger-calibration-activity" component={FingerCalibrationActivity}/>
          <Route path="/end-game" component={EndGameTemplate}/>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;

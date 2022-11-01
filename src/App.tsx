import "./App.css";
import { useContext } from "react";
import IntroScreen from "./Components/screens/IntroScreen";
import { GameContext } from "./context";
import { Stages } from "./types";
import GameState from "./state";
import PlayScreen from "./Components/screens/PlayScreen";
import WinnerScreen from "./Components/screens/WinnerScreen";
import "./Components/screens/PlayScreen.css"

function ScreenStageWrapper() {
  const { state, dispatch } = useContext(GameContext);


  switch (state.stage) {
    case Stages.Intro:
      return <IntroScreen></IntroScreen>;
    case Stages.GetInfo:
      return <div>Hello GetInfo</div>;
    case Stages.Lobby:
      return <PlayScreen></PlayScreen>;
    case Stages.PlayerOne:
      return <PlayScreen></PlayScreen>;
    case Stages.PlayerTwo:
      return <PlayScreen></PlayScreen>;
    case Stages.Done:
      return <WinnerScreen></WinnerScreen>
  }
}

function App() {
  return (
    <GameState>
      <ScreenStageWrapper></ScreenStageWrapper>
    </GameState>
  );
}

export default App;

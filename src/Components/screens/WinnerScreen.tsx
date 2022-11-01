import "./WinnerScreen.css";
import Confetti from "react-confetti";
import { GameContext } from "../../context";
import { useContext } from "react";
import trophyboi from "../../assets/trophyboi.png";
import trophy from "../../assets/trophy.png";
import { ReducerType, Stages } from "../../types";

function WinnerScreen() {
  const { state, dispatch } = useContext(GameContext);

  function reset() {
    dispatch({
      type: ReducerType.UpdateStage,
      payload: Stages.Intro,
    });
  }

  return (
    <div>
      <Confetti tweenDuration={2000} recycle={false} />
      <div className="backgroundWinner">
        <div className="winnerTile">
          <div className="wGreeting">Well Done!</div>
          <div className="winnerName">{state.winner.first}</div>
          <div>
            {" "}
            <img src={trophyboi} className="winnerBoi"></img>
          </div>
          <div className="goldenContainer">
            <img src={trophy} className="trophy"></img>
            <div className="goldenFirst">
              {state.players[1].score > state.players[0].score ? (
                <div className="tinyIcon">
                  <img
                    src={state.players[1].iconTiny}
                    className="tinyIcon"
                  ></img>
                </div>
              ) : (
                <div className="tinyIcon">
                  <img
                    src={state.players[0].iconTiny}
                    className="tinyIcon"
                  ></img>
                </div>
              )}
              <div></div>
              <p className="placeText">First : </p>
              <p className="winnerNames">{state.winner.first}</p>
              <p className="winnerScore"> {state.winner.winnerScore}</p>
            </div>
          </div>
          <div className="whiteContainer">
            <div className="whiteSecond">
              {state.players[1].score < state.players[0].score ? (
                <div className="tinyIcon">
                  <img
                    src={state.players[1].iconTiny}
                    className="tinyIcon"
                  ></img>
                </div>
              ) : (
                <div className="tinyIcon">
                  <img
                    src={state.players[0].iconTiny}
                    className="tinyIcon"
                  ></img>
                </div>
              )}
              <div></div>
              <p className="placeText">Second : </p>
              <p className="winnerNames">
                {"   "}
                {state.winner.second}
              </p>
              <p className="winnerScore">{state.winner.secondScore}</p>
            </div>
          </div>
          <div className="resetDiv">
            {" "}
            <button className="reset" onClick={reset}>
              <p className="resetText" onClick={reset}>
                Play Again
              </p>
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default WinnerScreen;

import "./PlayScreen.css";

import { GameContext } from "../../context";
import { useContext, useState } from "react";
import { Card, ReducerType, Stages } from "../../types";
import Card_Back from "../buttons/Card_Back.svg";
import { randomArr } from "../../GridArr";
import turnbutton from "../../assets/turnbutton.png";

function PlayScreen() {
  const { state, dispatch } = useContext(GameContext);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [priorSelection, setPriorSelection] = useState<{
    color: string;
    number: string;
    index: number;
  }>({
    color: "undefined",
    number: "undefined",
    index: -1,
  });

  const [count, setCount] = useState(0);
  const regex: RegExp = /(\d+)-(.+).svg/;

  function getColor(suite: string): string {
    if (suite === "diamond" || suite === "hearts") {
      return "red";
    } else {
      return "black";
    }
  }

  const closePage = () => {
    window.opener = null;
    window.open("", "_self");
    window.close();
  };

  const handleFlip = (index: number, path: string) => {
    dispatch({
      type: ReducerType.UpdateCard,
      payload: { flipped: true, invisible: false, index: index },
    });

    const match: RegExpMatchArray = path.match(regex)!!;
    const captured = {
      number: match[1],
      color: getColor(match[2]),
    };

    if (count === 0) {
      setPriorSelection({ ...captured, index: index });
      setCount(count + 1);
    }

    if (count === 1) {
      if (
        priorSelection.color === captured.color &&
        priorSelection.number === captured.number
      ) {
        setTimeout(() => {
          [index, priorSelection.index].forEach((indexToRemove) =>
            dispatch({
              type: ReducerType.UpdateCard,
              payload: { flipped: true, invisible: true, index: indexToRemove },
            })
          );
        }, 1000);

        let flippedCards: any = [];

        flippedCards.push(index, priorSelection.index);

        setMatchedPairs(matchedPairs + 2);

        if (state.stage === Stages.PlayerOne) {
          dispatch({
            type: ReducerType.UpdateScore,
            payload: {
              ...state,
              index: 0,
              score: state.players[0].score + 1,
            },
          });
        } else {
          dispatch({
            type: ReducerType.UpdateScore,
            payload: {
              ...state,
              index: 1,
              score: state.players[1].score + 1,
            },
          });
        }
      } else {
        setTimeout(() => {
          [index, priorSelection.index].forEach((indexFlipBack) =>
            dispatch({
              type: ReducerType.UpdateCard,
              payload: {
                flipped: false,
                invisible: false,
                index: indexFlipBack,
              },
            })
          );
        }, 1000);

        dispatch({
          type: ReducerType.UpdateStage,
          payload:
            state.stage === Stages.PlayerOne
              ? Stages.PlayerTwo
              : Stages.PlayerOne,
        });
      }
      setCount(0);
    }
  };

  setTimeout(() => {
    if (matchedPairs === 4) {
      dispatch({
        type: ReducerType.UpdateStage,
        payload: Stages.Done,
      });

      const ranking =
        state.players[1].score > state.players[0].score
          ? [state.players[1].name, state.players[0].name]
          : [state.players[0].name, state.players[1].name];

      const scoreRanking =
        state.players[1].score > state.players[0].score
          ? [state.players[1].score, state.players[0].score]
          : [state.players[0].score, state.players[1].score];

      dispatch({
        type: ReducerType.UpdateWinner,
        payload: {
          first: ranking[0],
          second: ranking[1],
          winnerScore: scoreRanking[0],
          secondScore: scoreRanking[1],
        },
      });
    }
  }, 4000);

  const resetCards = () => {
    dispatch({
      type: ReducerType.ResetState,
    });
  };

  return (
    <div className="p-container">
      <div className="backgroundLobby">
        <div className="p-box1">
          <p className="p-header">Memory</p>
        </div>
        <div className="boxButtons">
          <div className="flexButtons">
            <button onClick={resetCards} className="restartButton">
              <p className="restartText">Restart Game</p>
            </button>
            <div className="exitDivPlay">
              <button className="exitButton" onClick={closePage}>
                <p className="exitText">Exit Game</p>
              </button>
            </div>
          </div>
        </div>
        <div className="p-box2">
          <div className="img-tileleft">
            <img
              src={state.players[0].iconBig}
              className="img"
              alt="balloon-man"
            ></img>
            <div className="img-text">{state.players[0].name}</div>
            <div className="img-text ">Score: {state.players[0].score}</div>
          </div>

          <div>
            {state.stage === Stages.PlayerOne ? (
              <img src={turnbutton}></img>
            ) : null}
          </div>
        </div>
        <div className="p-box3">
          <div className="cardGrid">
            {randomArr.map(({ path, file }, index) => (
              <div className="card">
                {state.cards[index].flipped === true ? (
                  <div
                    className={
                      state.cards[index].invisible ? "hidden" : "visible"
                    }
                  >
                    <img key={path} src={file} alt={path}></img>
                  </div>
                ) : (
                  <img
                    src={Card_Back}
                    alt={path}
                    onClick={() => handleFlip(index, path)}
                  ></img>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="p-box4">
          <div className="img-tile">
            <img
              src={state.players[1].iconBig}
              className="img"
              alt="rocket-icon"
            ></img>
            <div className="img-text">{state.players[1].name}</div>
            <div className="img-text ">Score: {state.players[1].score}</div>
          </div>

          {state.stage === Stages.PlayerTwo ? (
            <img src={turnbutton}></img>
          ) : null}
        </div>
        <div className="p-box4"></div>
        <div className="p-box5"></div>
      </div>
    </div>
  );
}

export default PlayScreen;

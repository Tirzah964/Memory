import { useContext, useState } from "react";
import Popup from "reactjs-popup";
import { GameContext } from "../../context";
import { ReducerType, Stages } from "../../types";
import rocketMan from "../../assets/rocketman.png";
import balloonMan from "../../assets/balloonman.png";
import "./IntroScreen.css";

function IntroScreen() {
  const closeTab = () => {
    window.opener = null;
    window.open("", "_self");
    window.close();
  };

  const [nameLeft, setNameLeft] = useState("Tirsa");
  const [nameRight, setNameRight] = useState("Calvin");

  const { state, dispatch } = useContext(GameContext);

  const [save, setSave] = useState(false);

  const handleSave = () => {
    if (nameRight && nameLeft) {
      setSave(true);
      dispatch({
        type: ReducerType.UpdateStage,
        payload: Stages.Lobby,
      });
      dispatch({
        type: ReducerType.UpdateNames,
        payload: { nameRight: nameRight, nameLeft: nameLeft },
      });
    } else {
      setSave(false);
    }
  };

  const handleChangeRight = (e: any) => {
    setNameRight(e.target.value);
  };

  const handleChangeLeft = (e: any) => {
    setNameLeft(e.target.value);
  };

  return (
    <div className="container">
      <div className="backgroundIntro">
        <div className="box1">
          <div className="header">Memory</div>
        </div>

        <div className="box2">
          <button className="exit-button">
            <p className="buttons-text" onClick={closeTab}>
              Exit Game
            </p>
          </button>
        </div>
        <div className="box3"></div>
        <div className="box4">
          <img src={balloonMan}></img>
        </div>
        <div className="box5">
          <img src={rocketMan}></img>
        </div>
        <div className="box6">
          <Popup
            trigger={
              <button className="start-button">
                <p className="buttons-text">Start</p>
              </button>
            }
            modal
          >
            <div className="modal">
              <div className="modal-header">Enter your names</div>
              <input
                required
                value={nameLeft}
                defaultValue={nameLeft}
                className="modal-fields modal-text"
                type="text"
                onChange={handleChangeLeft}
              ></input>
              <input
                required
                value={nameRight}
                defaultValue={nameRight}
                className="modal-fields modal-text"
                type="text"
                onChange={handleChangeRight}
              ></input>
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
}
export default IntroScreen;

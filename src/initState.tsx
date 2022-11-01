import { IGameState, Stages } from "./types";
import tinyBalloon from "./assets/tinyBalloon.png";
import tinyRocket from "./assets/tinyRocket.png";
import balloonman from "./assets/balloonman.png";
import rocketman from "./assets/rocketman.png";

export let data = [
  ...Array(48).fill({ flipped: false, invisible: false, index: 0 }),
];

const InitialState: IGameState = {
  stage: Stages.Lobby,
  cards: data,
  players: [
    {
      name: "Tirsa",
      index: 0,
      iconBig: balloonman,
      iconTiny: tinyBalloon,
      score: 0,
    },
    {
      name: "Calvin",
      index: 1,
      iconBig: rocketman,
      iconTiny: tinyRocket,
      score: 0,
    },
  ],
  winner: {
    first: "",
    second: "",
    winnerScore: 0,
    secondScore: 0,
  },
};

export default InitialState;

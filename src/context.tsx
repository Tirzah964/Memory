import InitialState from "./initState";
import { IGameState, IGameAction } from "./types";
import React from "react";

export const GameContext = React.createContext<{
  state: IGameState;
  dispatch: React.Dispatch<IGameAction>;
}>({
  state: InitialState,
  dispatch: () => undefined,
});

import React, { ReactNode, useReducer } from "react";
import { GameContext } from "./context";
import InitialState from "./initState";
import reducer from "./reducer";

type Props = {
  children: ReactNode;
};

function GameState({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, InitialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
export default GameState;

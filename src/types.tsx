export enum Stages {
  Intro = "Intro",
  GetInfo = "GetInfo",
  Lobby = "Lobby",
  PlayerOne = "PlayerOne",
  PlayerTwo = "PlayerTwo",
  Done = "Done",
}

export enum ReducerType {
  UpdateCard = "UpdateCard",
  UpdateStage = "UpdateStage",
  UpdateScore = "UpdateScore",
  UpdateNames = "UpdateNames",
  UpdateWinner = "UpdateWinner",
  UpdateIcon = "UpdateIcon",
  ResetState = "ResetState",
}

export interface IUpdateCard {
  type: ReducerType.UpdateCard;
  payload: Card;
}

export interface IUpdateStage {
  type: ReducerType.UpdateStage;
  payload: Stages;
}

export interface IUpdateScore {
  type: ReducerType.UpdateScore;
  payload: Score;
}

export interface IUpdateNames {
  type: ReducerType.UpdateNames;
  payload: Names;
}

export interface IUpdateWinner {
  type: ReducerType.UpdateWinner;
  payload: Winner;
}

export interface IResetState {
  type: ReducerType.ResetState;
}


export interface Score {
  index: number;
  score: number;
}

export interface Winner {
  first: string;
  second: string;
  winnerScore: number;
  secondScore: number;
}

export interface Names {
  nameRight: string;
  nameLeft: string;
}

export interface Card {
  flipped: boolean;
  invisible: boolean;
  index: number;
}

export interface Player {
  name: string;
  index: number;
  iconBig: any;
  iconTiny: any;
  score: number;
}

export type IGameAction =
  | IUpdateCard
  | IUpdateStage
  | IUpdateScore
  | IUpdateNames
  | IUpdateWinner
  | IResetState;

export interface IGameState {
  stage: Stages;
  cards: Card[];
  winner: Winner;
  players: Player[];
}

export type Iterableify<T> = { [K in keyof T]: Iterable<T[K]> };

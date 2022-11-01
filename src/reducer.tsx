import InitialState from "./initState";
import { IGameAction, IGameState, ReducerType } from "./types";

function reducer(state: IGameState, action: IGameAction) {
  switch (action.type) {
    case ReducerType.UpdateStage:
      console.log("Test Reducer");
      return { ...state, stage: action.payload };
    case ReducerType.UpdateNames:
      return {
        ...state,
        players: [
          { ...state.players[0], name: action.payload.nameLeft },
          { ...state.players[1], name: action.payload.nameRight },
        ],
      };
    case ReducerType.UpdateCard:
      // Create copy of state
      var newCards = [...state.cards];
      newCards[action.payload.index] = {
        ...newCards[action.payload.index],
        flipped: action.payload.flipped,
        invisible: action.payload.invisible,
      };
      return {
        ...state,
        cards: newCards,
      };
    case ReducerType.UpdateScore:
      return {
        ...state,
        players: [...state.players].map((player) => {
          if (player.index === action.payload.index) {
            return { ...player, score: action.payload.score };
          } else {
            return player;
          }
        }),
      };
    case ReducerType.UpdateWinner:
      return { ...state, winner: action.payload };
    case ReducerType.ResetState:
      return {
        ...InitialState,
        players: [
          { ...state.players[0], score: 0 },
          { ...state.players[1], score: 0 },
        ],
      };
    default:
      return state;
  }
}

export default reducer;

// var index = action.payload.id;
// var index = state.cards.findIndex(
//   (card) => card.id !== action.payload.id
// );
// const newCards = [...state.cards];
// newCards[index].flipped = action.payload.flipped;
// newCards[index].visible = action.payload.visible;
// return { ...state, cards: newCards };

// This works >?
// var newCards = state.cards;
// newCards[action.payload.index] = action.payload;
// return { ...state, cards: [...state.cards, action.payload] };

// Less crappy version
// var newCards = state.cards;
// set value for newCard[index] equal to incoming payload for that specific index
// newCards[action.payload.index] = action.payload;
// array size stays the same
// return {
//   ...state,
//   newCards: { cards: [...state.cards, action.payload] },
// };

// Calvin way
// return {
//     ...state,
//     cards: state.cards.map((card: Card) => {
//       if (card.index === action.payload.index) {
//         return {
//           ...card,
//           flipped: action.payload.flipped,
//           visible: action.payload.visible,
//         };
//       } else {
//         return card;
//       }
//     }),
//   };

"use client";

import {
  ActionDispatch,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { MemoryGameModel, MemoryGameInterface } from "@/data/game";

export enum GameActionType {
  Initialize = "Initialize",
  OpenCard = "OpenCard",
  CheckCards = "CheckCards",
  Reset = "Reset",
}

interface GameAction {
  type: GameActionType;
  cardIndex?: number;
  images?: string[];
}

interface GameContextInterface {
  readonly game: MemoryGameInterface;
  readonly dispatch: ActionDispatch<[action: GameAction]>;
}

const GameContext = createContext<GameContextInterface | null>(null);

function reducer(
  game: MemoryGameInterface,
  action: GameAction,
): MemoryGameInterface {
  switch (action.type) {
    case GameActionType.Initialize:
      return MemoryGameModel.initialize(action.images!);

    case GameActionType.OpenCard:
      return game.openCard(action.cardIndex!);

    case GameActionType.CheckCards:
      return game.checkCards();

    case GameActionType.Reset:
      return game.reset();
  }
}

interface Props {
  images: string[];
  children?: ReactNode;
}

export function GameProvider({ images, children }: Props) {
  const [game, dispatch] = useReducer(reducer, new MemoryGameModel());

  useEffect(() => {
    dispatch({ type: GameActionType.Initialize, images });
  }, [images]);

  return (
    <GameContext.Provider value={{ game, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextInterface {
  return useContext(GameContext)!;
}

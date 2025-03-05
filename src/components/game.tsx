"use client";

import styles from "./game.module.scss";
import Grid from "@/components/grid";
import { GameActionType, useGame } from "@/data/provider";
import { useEffect, useState } from "react";

export default function Game() {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const { game, dispatch } = useGame();
  useEffect(_handleLoop, [game.count, dispatch]);

  function _handleLoop() {
    clearTimeout(timeoutId);

    setTimeoutId(
      setTimeout(() => {
        dispatch({ type: GameActionType.CheckCards });
      }, 1000),
    );
  }

  function _handleClickCard(index: number) {
    dispatch({ type: GameActionType.OpenCard, cardIndex: index });
  }

  function _handleClickReset() {
    dispatch({ type: GameActionType.Reset });
  }

  return (
    <div className={styles.game}>
      <header className={styles.game__header}>
        <h1>Attempts: {game.attempts}</h1>
        {game.isFinished && <h2>Congrats, you have won!</h2>}

        <button
          className={styles.game__header__reset_button}
          onClick={_handleClickReset}
        >
          Reset
        </button>
      </header>

      <Grid
        cards={game.cards}
        disabled={game.isDisabled}
        onClickCard={_handleClickCard}
      />
    </div>
  );
}

"use client";

import styles from "./grid.module.scss";
import GridItem from "@/components/grid_item";
import { CardInterface } from "@/data/card";

interface GridProps {
  disabled: boolean;
  cards: CardInterface[];
  onClickCard: (index: number) => void;
}

export default function Grid({ disabled, cards, onClickCard }: GridProps) {
  return (
    <ul className={styles.grid}>
      {cards.map((item, index) => (
        <GridItem
          key={index}
          image={item.image}
          reversed={item.reversed}
          selected={item.selected}
          disabled={disabled}
          onClick={() => onClickCard(index)}
        />
      ))}
    </ul>
  );
}

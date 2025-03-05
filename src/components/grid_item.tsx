"use client";

import styles from "./grid.module.scss";
import clsx from "clsx";

interface GridItemProps {
  onClick: () => void;
  image: string;
  selected: boolean;
  reversed: boolean;
  disabled: boolean;
}

export default function GridItem({
  image,
  selected,
  disabled,
  reversed,
  onClick,
}: GridItemProps) {
  const classes = clsx(
    styles.grid__item,
    selected ? styles["grid__item--selected"] : null,
    reversed ? styles["grid__item--reversed"] : null,
    disabled ? styles["grid__item--disabled"] : null,
  );

  function _handleClick() {
    if (!reversed && !disabled) {
      onClick();
    }
  }

  return (
    <li className={classes}>
      <button className={styles.grid__item__button} onClick={_handleClick}>
        <img
          src={image}
          alt="Game Image"
          className={styles.grid__item__image}
        />
      </button>
    </li>
  );
}

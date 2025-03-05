export interface CardInterface {
  readonly image: string;
  readonly reversed: boolean;
  readonly selected: boolean;

  copyWith(props: CardOptionalProps): CardInterface;
}

interface CardProps {
  readonly image: string;
  readonly reversed?: boolean;
  readonly selected?: boolean;
}

interface CardOptionalProps {
  readonly image?: string;
  readonly reversed?: boolean;
  readonly selected?: boolean;
}

export class CardModel implements CardInterface {
  readonly image: string;
  readonly reversed: boolean;
  readonly selected: boolean;

  constructor({ image, reversed = false, selected = false }: CardProps) {
    this.image = image;
    this.reversed = reversed;
    this.selected = selected;
  }

  copyWith({ image, reversed, selected }: CardOptionalProps): CardInterface {
    return new CardModel({
      image: image ?? this.image,
      reversed: reversed ?? this.reversed,
      selected: selected ?? this.selected,
    });
  }
}

import { CardInterface, CardModel } from "@/data/card";
import { every } from "lodash-es";

interface MemoryGameProps {
  readonly attempts?: number;
  readonly startDate?: Date;
  readonly cards?: CardInterface[];
}

export interface MemoryGameInterface {
  readonly isFinished: boolean;
  readonly isDisabled: boolean;
  readonly count: number;
  readonly attempts: number;
  readonly cards: CardInterface[];

  openCard(atIndex: number): MemoryGameInterface;
  checkCards(): MemoryGameInterface;
  reset(): MemoryGameInterface;
}

export class MemoryGameModel implements MemoryGameInterface {
  readonly attempts: number;
  readonly startDate: Date;
  readonly cards: CardInterface[];

  get isFinished(): boolean {
    return every(this.cards, (card: CardInterface) => card.reversed);
  }

  get count(): number {
    return this.playingCards.length;
  }

  private get arePlayingCardsEquals(): boolean {
    return (
      this.cards[this.playingCards[0]].image ===
      this.cards[this.playingCards[1]].image
    );
  }

  constructor(
    { attempts = 0, startDate, cards = [] }: MemoryGameProps = {},
    readonly isDisabled: boolean = false,
    private playingCards: number[] = [],
  ) {
    this.attempts = attempts;
    this.startDate = startDate ?? new Date();
    this.cards = cards;
  }

  openCard(atIndex: number): MemoryGameInterface {
    if (this.isDisabled) {
      return this;
    }

    return this.copyWith(
      {
        cards: this._copyCards([atIndex], true, true),
      },
      this.count > 0,
      [...this.playingCards, atIndex],
    );
  }

  checkCards(): MemoryGameInterface {
    if (this.count < 2) {
      return this;
    } else if (this.arePlayingCardsEquals) {
      return this.copyWith({
        cards: this._copyCards(this.playingCards, true, false),
      });
    } else {
      return this.copyWith({
        attempts: this.attempts + 1,
        cards: this._copyCards(this.playingCards, false, false),
      });
    }
  }

  reset(): MemoryGameInterface {
    const images: string[] = MemoryGameModel._shuffleImages(
      this.cards.map((card: CardInterface) => card.image),
    );

    return MemoryGameModel._init(images);
  }

  copyWith(
    { attempts, startDate, cards }: MemoryGameProps,
    isDisabled: boolean = false,
    playingCards: number[] = [],
  ): MemoryGameInterface {
    return new MemoryGameModel(
      {
        attempts: attempts ?? this.attempts,
        startDate: startDate ?? this.startDate,
        cards: cards ?? [...this.cards],
      },
      isDisabled,
      playingCards,
    );
  }

  static initialize(images: string[]): MemoryGameModel {
    return this._init(this._shuffleImages([...images, ...images]));
  }

  private static _init(shuffledImages: string[]) {
    const cards: CardModel[] = [];

    for (const image of shuffledImages) {
      cards.push(new CardModel({ image }));
    }

    return new MemoryGameModel({ cards });
  }

  private static _shuffleImages(images: string[]) {
    for (let i = 0; i < 100; i++) {
      const x = Math.floor(Math.random() * (images.length - 1));
      const y = Math.floor(Math.random() * (images.length - 1));
      const image = images[x];

      images[x] = images[y];
      images[y] = image;
    }

    return images;
  }

  private _copyCards(
    indexes: number[],
    reversed: boolean,
    selected: boolean,
  ): CardInterface[] {
    const cards = [...this.cards];

    for (const index of indexes) {
      cards[index] = cards[index].copyWith({
        reversed: reversed,
        selected: selected,
      });
    }

    return cards;
  }
}

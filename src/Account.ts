import { Bank } from "./Bank";
import { Amount } from "./Amount";

import {CardInterface, CurrencyType, NumberAccountType} from "./types";

export class Account {
  private isBlocked: boolean = false;
  private cards: CardInterface[] = [];
  private balance: number = 0;

  constructor(
    public number: NumberAccountType,
    public currency: CurrencyType,
    private bank: Bank
  ) {}

  getBlocked() {
    return this.isBlocked;
  }

  setBlocked(block: boolean) {
    this.isBlocked = block;
  }

  getCards() {
    return this.cards;
  }

  addCard(card: CardInterface) {
    this.cards.push(card);
  }

  removeCard(card: CardInterface) {
    const index = this.cards.findIndex((item) => item.number === card.number);

    if (index === -1) throw new Error("Card not found");
    this.cards.splice(index, 1);
  }

  getBalance(): number {
    return this.balance;
  }

  addToBalance(amount: Amount) {
    this.balance += amount.conversionOperation(this.currency);
  }

  subtractFromBalance(amount: Amount) {
    const result =
      this.getBalance() - amount.conversionOperation(this.currency);

    if (result < 0)
      throw Error("You can't withdraw cash, you don't have funds on the card");

    this.balance = result;
  }
}

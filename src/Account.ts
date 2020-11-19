import { Card } from "./Card";
import { Bank } from "./Bank";
import { CurrencyType, NumberAccountType } from "./type";
import { Amount } from "./Amount";

export class Account {
  private isBlocked: boolean = false;
  private cards: Card[] = [];
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

  addCard(card: Card) {
    this.cards.push(card);
  }

  removeCard(card: Card) {
    const index = this.cards.findIndex((item, index): number | boolean => {
      if (item.number === card.number) return index;
    });
    console.log(index);
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

import { Card } from "./Card";

export class Account {
  balance: IBalanceAccount;
  cards: Array<Card>;
  isBlock: boolean;

  constructor(private number: NumberAccountType) {
    this.balance = {
      amount: 0,
      currency: "rubles",
    };
    this.isBlock = false;
    this.cards = [];
  }

  addCard(card: Card) {}

  removeCard(card: Card) {}

  returnBalance(currency: CurrencyType) {}
}

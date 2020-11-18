import { Card } from "./Card";
import { Amount } from "./Amount";
import { Bank } from "./Bank";
import { CurrencyType, NumberAccountType, NumberCardType } from "./type";

export class Account {
  balance: Amount;
  cards: Array<NumberCardType>;
  isBlock: boolean;

  constructor(
    public number: NumberAccountType,
    public currency: CurrencyType,
    private bank: Bank
  ) {
    this.balance = new Amount(0, "dollars", bank);
    this.isBlock = false;
    this.cards = [];
  }

  addCard(card: Card) {
    this.cards.push(card.number);
  }

  removeCard(card: Card) {
    if (this.cards.length === 1) return;
    this.cards.filter((item) => {
      if (item === card.number) {
        return item;
      }
    });
  }

  returnBalance(): number {
    return this.balance.value;
  }

  addToBalance(amount: number, fromCurrency: CurrencyType) {
    this.balance.value += this.balance.conversionOperation(
      amount,
      fromCurrency,
      this.currency
    )!;
  }

  subtractFromBalance(amount: number, fromCurrency: CurrencyType) {
    const value = this.balance.conversionOperation(
      amount,
      fromCurrency,
      this.currency
    )!;

    const currentBalance = this.balance.value;
    const summaryBalance = currentBalance - value;

    if (summaryBalance < 0)
      throw Error("Вы не можете снять наличные, вам не хватает средств ");

    this.balance.value = summaryBalance;
  }
}

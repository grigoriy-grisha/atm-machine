import { Card } from "./Card";
import { Bill } from "./Bill";
import { Account } from "./Account";

export class Bank {
  cards: Array<any>;
  accounts: Array<any>;

  constructor(public nameBank: string) {
    this.cards = [];
    this.accounts = [];
  }

  getInformationCard(number: NumberCardType): Card {
    return Card;
  }
  acceptСard(number: NumberCardType): Card {
    return Card;
    // или undefined
    // return card;
  }

  checkPin(pin: number, number: NumberCardType): boolean {
    return true;
  }

  getBalance(number: NumberAccountType): number {
    // класс Account что-то возвращает
    return 123;
  }
  returnBalanceAccount(number: NumberAccountType) {
    // класс Account что-то возвращает
  }

  blockCard(number: NumberCardType): void {}

  blockAccount(number: NumberAccountType): void {}

  withdrawFromCard(money: number): void {}

  putFromCard(money: number): void {}

  transferToAnotherAccount(
    toAccount: string,
    fromAccount: string,
    money: number
  ): void {}
}

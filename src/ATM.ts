import { Card } from "./Card";
import { Bank } from "./Bank";


export class ATM {
  card: Card | null;

  constructor(private bank: Bank) {
    this.card = null;
  }
  getInformationCardInNumberCard(number: NumberCardType): Card {
    return Card;
  }

  checkCardPin(pin: number): boolean {
    return true;
  }

  checkCardBalance(number: NumberCardType): number {
    return 123;
  }

  blockCardByNumber(number: NumberCardType): void {}

  withdrawFromCard(amount: number, currency: CurrencyType): void {}

  putFromCard(amount: number, currency: CurrencyType): void {}

  transferToAnotherAccount(
    fromAccount: string,
    amount: number, currency: CurrencyType
  ): void {}
}

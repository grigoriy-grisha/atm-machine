import { Card } from "./Card";
import { Bank } from "./Bank";
import { Bill } from "./Bill";
import { NumberAccountType, NumberCardType } from "./type";
import { Amount } from "./Amount";

export class ATM {
  static cardIsAvailable(
    target: any,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    let originalMethod = descriptor.value;
    descriptor.value = function (this: ATM, ...args: any) {
      if (!this.currentCard) throw Error("Неизвестная ошибка");

      let returnValue = originalMethod.apply(this, args);
      return returnValue;
    };
  }

  public currentCard: Card | null = null;
  private blockedCards: Card[] = [];
  private attempt: number = 0;

  constructor(private bank: Bank) {}

  acceptCard(card: Card, pin: number) {
    const foundCard = this.bank.getInformationCard(card.number);

    if (!foundCard) throw new Error("Карта не обслуживается");
    this.currentCard = foundCard;

    this.checkCardPin(pin);
  }

  @ATM.cardIsAvailable
  returnCard() {
    this.currentCard = null;
  }

  @ATM.cardIsAvailable
  giveCard(card: Card) {
    this.currentCard = null;
    this.attempt = 0;
    this.blockedCards.push(card);
  }

  @ATM.cardIsAvailable
  checkCardPin(pin: number) {
    if (this.bank.checkPin(pin, this.currentCard!.number)) return true;
    if (this.attempt >= 3) {
      this.blockCardByNumber(this.currentCard!.number);
      this.giveCard(this.currentCard!);
      throw new Error("Карта заблокирована");
    }
    this.attempt++;
    return false;
  }

  @ATM.cardIsAvailable
  checkBalanceByCardNumber(): number {
    const account = this.bank.findAccountByCardNumber(this.currentCard.number)!;
    return account.getBalance();
  }

  @ATM.cardIsAvailable
  blockCardByNumber(number: NumberCardType) {
    this.bank.blockAccount(number);
  }

  @ATM.cardIsAvailable
  recognitionBills(bill: Bill) {
    return new Amount(bill.denomination, bill.currency, this.bank);
  }

  @ATM.cardIsAvailable
  withdrawFromCard(bill: Bill) {
    const amount = this.recognitionBills(bill);
    this.bank.withdrawFromCard(amount, this.currentCard!.number);
  }

  @ATM.cardIsAvailable
  putFromCard(bill: Bill) {
    const amount = this.recognitionBills(bill);
    this.bank.putFromCard(amount, this.currentCard!.number);
  }

  @ATM.cardIsAvailable
  transferToAnotherAccount(toNumberAccount: NumberAccountType, bill: Bill) {
    const amount = this.recognitionBills(bill);
    this.bank.transferToAnotherAccount(
      this.currentCard.number,
      toNumberAccount,
      amount
    );
  }

  @ATM.cardIsAvailable
  transferToAnotherCard(toNumberCard: NumberCardType, bill: Bill) {
    const account = this.bank.findAccountByCardNumber(toNumberCard);
    this.transferToAnotherAccount(account.number, bill);
  }
}

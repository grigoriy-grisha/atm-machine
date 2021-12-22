import {Bank} from "./Bank";
import {Amount} from "./Amount";

import {BillInterface, CardInterface, NumberAccountType, NumberCardType} from "./types";

export class ATM {
  static countOfAttempts = 3

  static cardIsAvailable(
    target: any,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    let originalMethod = descriptor.value;
    descriptor.value = function (this: ATM, ...args: any) {
      if (!this.currentCard) throw Error("Неизвестная ошибка");

      return originalMethod.apply(this, args);
    };
  }

  public currentCard: CardInterface | null = null;
  private blockedCards: CardInterface[] = [];
  private attempt: number = 0;

  constructor(private bank: Bank) {}

  acceptCard(card: CardInterface, pin: number) {
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
  giveCard(card: CardInterface) {
    this.currentCard = null;
    this.attempt = 0;
    this.blockedCards.push(card);
  }

  @ATM.cardIsAvailable
  checkCardPin(pin: number) {
    if (this.bank.checkPin(pin, this.currentCard!.number)) return true;
    if (this.attempt >= ATM.countOfAttempts) {
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
  recognitionBills(bill: BillInterface) {
    return new Amount(bill.denomination, bill.currency, this.bank);
  }

  @ATM.cardIsAvailable
  withdrawFromCard(bill: BillInterface) {
    const amount = this.recognitionBills(bill);
    this.bank.withdrawFromCard(amount, this.currentCard!.number);
  }

  @ATM.cardIsAvailable
  putFromCard(bill: BillInterface) {
    const amount = this.recognitionBills(bill);
    this.bank.putFromCard(amount, this.currentCard!.number);
  }

  @ATM.cardIsAvailable
  transferToAnotherAccount(toNumberAccount: NumberAccountType, bill: BillInterface) {
    const amount = this.recognitionBills(bill);
    this.bank.transferToAnotherAccount(
      this.currentCard.number,
      toNumberAccount,
      amount
    );
  }

  @ATM.cardIsAvailable
  transferToAnotherCard(toNumberCard: NumberCardType, bill: BillInterface) {
    const account = this.bank.findAccountByCardNumber(toNumberCard);
    this.transferToAnotherAccount(account.number, bill);
  }
}

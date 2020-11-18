import { Card } from "./Card";
import { Bank } from "./Bank";
import { Bill } from "./Bill";
import { Amount } from "./Amount";
import { CurrencyType, NumberCardType } from "./type";

export class ATM {
  currentCard: Card | null = null;
  private blockedCards: Card[] = [];
  private available: boolean = false;
  private attempt: number = 0;

  constructor(private bank: Bank) {}

  acceptCard(card: Card, pin: number) {
    const foundCard = this.bank.getInformationCard(card.number);
    if (!foundCard) throw new Error("Карта не обслуживается");
    this.currentCard = foundCard;
    this.checkCardPin(pin);
  }

  returnCard() {
    if (!this.available) {
      this.currentCard = null;
    }
  }

  giveCard(card: Card) {
    this.currentCard = null;
    this.attempt = 0;
    this.blockedCards.push(card);
  }

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

  checkBalanceByCardNumber(): number {
    const account = this.bank.findAccountByCardNumber(this.currentCard.number)!;
    return account.returnBalance();
  }

  blockCardByNumber(number: NumberCardType) {
    this.bank.blockAccount(number);
  }

  recognitionBills(bill: Bill): [number, CurrencyType] {
    return [bill.denomination, bill.currency];
  }

  withdrawFromCard(bill: Bill): void {
    const [value, currency] = this.recognitionBills(bill);
    this.bank.withdrawFromCard(value, currency, this.currentCard!.number);
  }

  putFromCard(bill: Bill): void {
    const [value, currency] = this.recognitionBills(bill);
    this.bank.putFromCard(value, currency, this.currentCard!.number);
  }

  transferToAnotherAccount(toNumberCard: string, bill: Bill) {
    const [value, currency] = this.recognitionBills(bill);
    this.bank.transferToAnotherAccount(
      this.currentCard.number,
      toNumberCard,
      value,
      currency
    );
  }
}

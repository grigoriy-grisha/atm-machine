import { Card } from "./Card";
import { Account } from "./Account";
import { Amount } from "./Amount";
import {
  CurrencyType,
  FieldsAccountType,
  FieldsByWorkWithAccountType,
  NumberAccountType,
  NumberCardType,
} from "./type";

interface ICardInfo {
  card: Card;
  pin: number;
}

export class Bank {
  cards: Array<ICardInfo> = [];
  accounts: Array<Account> = [];

  constructor(public nameBank: string) {}

  getCourse() {
    return 76;
  }

  createCard(
    numberCard: NumberCardType,
    numberAccount: NumberAccountType,
    currency: CurrencyType,
    pin: number
  ): [Card, Account] {
    const card = new Card(numberCard);
    const account = new Account(numberAccount, currency, this);
    const cardInfo = {
      card,
      pin,
    };

    this.cards.push(cardInfo);
    this.accounts.push(account);
    account.addCard(card);

    return [card, account];
  }

  findCard(number: NumberCardType): ICardInfo | undefined {
    return this.cards.find((item: ICardInfo) => {
      if (item.card.number === number) return item;
    });
  }

  findAccount(number: NumberAccountType, field: FieldsAccountType) {
    return this.accounts.find((item: Account) => {
      console.log(item[field]);
      console.log(number);
      if (item[field] === number) return item;
    });
  }

  findAccountByCardNumber(number: NumberCardType): Account | undefined {
    return this.accounts.find((account) => {
      if (account.cards.includes(number)) {
        return account;
      }
    });
  }

  getInformationCard(number: NumberCardType): Card | undefined {
    const account = this.findAccountByCardNumber(number);
    if (account && account.isBlock) return;

    const cardInfo = this.findCard(number);
    if (cardInfo) return cardInfo.card;
  }

  checkPin(pin: number, number: NumberCardType): boolean {
    const cardInfo = this.findCard(number);
    return cardInfo ? cardInfo.pin === pin : false;
  }

  getBalance(number: NumberAccountType): number {
    const account = this.findAccount(number, "number")!;
    return account.balance.value;
  }

  blockAccount(number: NumberAccountType) {
    const account = this.findAccountByCardNumber(number);
    if (account) {
      account.isBlock = true;
    }
  }

  workWithBalanceAccount(
    number: NumberCardType,
    money: number,
    fromCurrency: CurrencyType,
    methodForWorkBalance: FieldsByWorkWithAccountType
  ) {
    const account = this.findAccountByCardNumber(number)!;

    account[methodForWorkBalance](money, fromCurrency);
  }

  withdrawFromCard(
    value: number,
    currency: CurrencyType,
    number: NumberCardType
  ) {
    this.workWithBalanceAccount(number, value, currency, "subtractFromBalance");
  }

  putFromCard(value: number, currency: CurrencyType, number: NumberCardType) {
    this.workWithBalanceAccount(number, value, currency, "addToBalance");
  }

  transferToAnotherAccount(
    fromNumberCard: NumberCardType,
    toNumberCard: NumberCardType,
    value: number,
    currency: CurrencyType
  ) {
    const from = this.findAccountByCardNumber(fromNumberCard);
    const to = this.findAccountByCardNumber(toNumberCard);

    if (to && from) {
      from.subtractFromBalance(value, currency);
      to.addToBalance(value, currency);
    }
  }
}

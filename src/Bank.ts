import { Card } from "./Card";
import { Account } from "./Account";
import {
  CurrencyType,
  FieldsAccountType,
  FieldsByWorkWithAccountType,
  NumberAccountType,
  NumberCardType,
} from "./type";
import { Amount } from "./Amount";

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
      if (item[field] === number) return item;
    });
  }

  findAccountByCardNumber(number: NumberCardType): Account | undefined {
    let cards: Card[];
    let foundAccount: Card;

    return this.accounts.find((account) => {
      cards = account.getCards();
      foundAccount = cards.find((item) => {
        if (item.number === number) return item;
      });

      if (foundAccount) return account;
    });
  }

  getInformationCard(number: NumberCardType): Card | undefined {
    const account = this.findAccountByCardNumber(number);
    if (account && account.getBlocked()) return;

    const cardInfo = this.findCard(number);
    if (cardInfo) return cardInfo.card;
  }

  checkPin(pin: number, number: NumberCardType): boolean {
    const cardInfo = this.findCard(number);
    return cardInfo ? cardInfo.pin === pin : false;
  }

  getBalance(number: NumberAccountType): number {
    const account = this.findAccount(number, "number")!;
    return account.getBalance();
  }

  blockAccount(number: NumberAccountType) {
    const account = this.findAccountByCardNumber(number);
    if (account) {
      account.setBlocked(true);
    }
  }

  unlockAccount(number: NumberAccountType) {
    const account = this.findAccountByCardNumber(number);
    if (account) {
      account.setBlocked(false);
    }
  }

  workWithBalanceAccount(
    number: NumberCardType,
    amount: Amount,
    methodForWorkBalance: FieldsByWorkWithAccountType
  ) {
    const account = this.findAccountByCardNumber(number)!;

    account[methodForWorkBalance](amount);
  }

  withdrawFromCard(amount: Amount, number: NumberCardType) {
    this.workWithBalanceAccount(number, amount, "subtractFromBalance");
  }

  putFromCard(amount: Amount, number: NumberCardType) {
    this.workWithBalanceAccount(number, amount, "addToBalance");
  }

  transferToAnotherAccount(
    fromNumberCard: NumberCardType,
    toNumberAccount: NumberCardType | NumberAccountType,
    amount: Amount
  ) {
    const from = this.findAccountByCardNumber(fromNumberCard);
    const to = this.findAccount(toNumberAccount, "number");

    if (to && from) {
      from.subtractFromBalance(amount);
      to.addToBalance(amount);
    }
  }
}

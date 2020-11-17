import {Card} from "./Card";
import {Bill} from "./Bill";
import {Account} from "./Account";

export class Bank {
    cards: Array<Card>;
    accounts: Array<Account>;

    constructor(public nameBank: string) {
        this.cards = [];
        this.accounts = [];
    }

    createCard(numberCard: NumberCardType, numberAccount: NumberAccountType, pin: number) {
        const card = new Card(numberCard, pin)
        const account = new Account(numberAccount)
        this.cards.push(card)
        this.accounts.push(account)
        account.addCard(card)
        return [card, account]
    }

    findCard(number: NumberCardType, field: FieldsCardType) {
        return this.cards.find((item: Card) => {
            if (item[field] === number) return item
        })
    }

    findAccount(number: NumberAccountType, field: FieldsAccountType) {
        return this.accounts.find((item: Account) => {
            if (item[field] === field) return item
        })
    }


    getInformationCard(number: NumberCardType): Card | undefined {
        return this.findCard(number, 'number')
    }

    checkPin(pin: number, number: NumberCardType): boolean {
        const card = this.findCard(number, 'number')
        if (card) {
            return card.pin === pin
        }
    }

    getBalance(number: NumberAccountType): number {

        const account = this.findAccount(number, 'number')
        if (account) {
            return account.balance
        }
    }

    returnBalanceAccount(number: NumberAccountType) {
        // класс Account что-то возвращает
    }

    blockCard(number: NumberCardType): void {
    }

    blockAccount(number: NumberAccountType): void {
    }

    withdrawFromCard(money: number): void {
    }

    putFromCard(money: number): void {
    }

    transferToAnotherAccount(
        toAccount: string,
        fromAccount: string,
        money: number
    ): void {
    }
}

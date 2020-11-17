type NumberCardType = string

type NumberAccountType = string

type CurrencyType = 'dollars' | 'rubles'


interface IBalanceAccount {
    amount: number,
    currency: CurrencyType
}

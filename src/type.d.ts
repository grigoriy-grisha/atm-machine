type NumberCardType = string

type NumberAccountType = string

type CurrencyType = 'dollars' | 'rubles'

type FieldsCardType = 'number' | 'pin'

type FieldsAccountType = 'balance' | 'isBlock' | 'cards' | 'number'

interface IBalanceAccount {
    amount: number,
    currency: CurrencyType
}

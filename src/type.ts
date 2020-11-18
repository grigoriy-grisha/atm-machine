export type NumberCardType = string;

export type NumberAccountType = string;

export type CurrencyType = "dollars" | "rubles";

export type FieldsCardType = "number";

export type FieldsAccountType = "balance" | "isBlock" | "cards" | "number";

export type FieldsByWorkWithAccountType =
  | "addToBalance"
  | "subtractFromBalance";

export interface IBalanceAccount {
  amount: number;
  currency: CurrencyType;
}

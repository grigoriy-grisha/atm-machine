import { Bank } from "./Bank";
import { CurrencyType } from "./type";

type AmountMethodsType = "dollarsToRubles" | "rublesToDollars";

export class Amount {
  constructor(
    public value: number,
    public currency: CurrencyType,
    private bank: Bank
  ) {}

  convertString(
    currencyFrom: CurrencyType,
    currencyTo: CurrencyType,
    value: number
  ) {
    const nameMethodForConversionOperation = `${currencyFrom}To${
      currencyTo[0].toUpperCase() + currencyTo.slice(1)
    }`;
    return (this as any)[nameMethodForConversionOperation](value);
  }

  conversionOperation(
    value: number,
    currencyFrom: CurrencyType,
    currencyTo: CurrencyType
  ) {
    if (currencyFrom === currencyTo) {
      return value;
    } else {
      return this.convertString(currencyFrom, currencyTo, value);
    }
  }

  dollarsToRubles(value: number) {
    return value * this.bank.getCourse();
  }

  rublesToDollars(value: number) {
    return value / this.bank.getCourse();
  }
}

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
    console.log(nameMethodForConversionOperation);
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
    if (this.currency === "rubles") return this.value;
    return value * this.bank.getCourse();
  }

  rublesToDollars(value: number) {
    if (this.currency === "dollars") return this.value;

    return value / this.bank.getCourse();
  }
}

//
// conversionOperation(value: number, bank: Bank, currency: CurrencyType) {
//   if (currency === "rubles") {
//     return value * bank.getCourse();
//   } else if (currency === "dollars") {
//     return value / bank.getCourse();
//   }
// }
//
// dollarsToRubles() {
//   if (this.currency === "rubles") return this.value;
//   return this.conversionOperation(this.value, this.bank, this.currency);
// }
//
// rublesToDollars() {
//   if (this.currency === "dollars") return this.value;
//   return this.conversionOperation(this.value, this.bank, this.currency);
// }

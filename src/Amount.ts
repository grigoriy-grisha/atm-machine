import { Bank } from "./Bank";
import { CurrencyType } from "./type";



export class Amount {
  constructor(
    public value: number,
    public currency: CurrencyType,
    private bank: Bank
  ) {}

  conversionOperation(
    currencyTo: CurrencyType
  ): number {
    if (this.currency === currencyTo) return this.value;
    if (this.currency === 'dollars') return this.dollarsToRubles()
    if (this.currency === 'rubles') return this.rublesToDollars()

  }

  dollarsToRubles() {
    return this.value * this.bank.getCourse();
  }

  rublesToDollars() {
    return this.value / this.bank.getCourse();
  }
}

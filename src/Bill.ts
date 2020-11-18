import {CurrencyType} from "./type";

export class Bill {
  constructor(public denomination: number, public currency: CurrencyType) {}
}

import { BillInterface, CurrencyType } from "./types";

export class Bill implements BillInterface {
  constructor(public denomination: number, public currency: CurrencyType) {}
}

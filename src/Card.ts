import { CardInterface, NumberCardType } from "./types";

export class Card implements CardInterface {
  constructor(public number: NumberCardType) {}
}

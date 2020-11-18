import { Bank } from "./Bank";
import { ATM } from "./ATM";
import { Bill } from "./Bill";

const tinkoff = new Bank("tinkoff");

const Money100 = new Bill(100, "rubles");
const Money500 = new Bill(500, "rubles");
const Money1000 = new Bill(1000, "rubles");
const Money2000 = new Bill(2000, "rubles");
const dollar1 = new Bill(1, "dollars");

const [card1, account1] = tinkoff.createCard(
  "4582 8683 4059 6988",
  "4582 8683 4059 6988 1231",
  "rubles",
  1234
);

const [card2, account2] = tinkoff.createCard(
  "4532 8642 1259 6918",
  "4532 8642 1259 6918",
  "rubles",
  1234
);

const atm1 = new ATM(tinkoff);
const atm2 = new ATM(tinkoff);
// try {
//   atm.acceptCard(card1, 12324);
//   atm.acceptCard(card1, 12314);
//   atm.acceptCard(card1, 12341);
//   atm.acceptCard(card1, 1141);
// } catch (e) {
//   console.log(e);
// }
atm1.acceptCard(card1, 1234);

// atm.acceptCard(card1, 1234);
atm1.putFromCard(Money500);
atm1.transferToAnotherAccount("4532 8642 1259 6918", dollar1);
// atm1.withdrawFromCard(Money100);
// console.log(atm1.checkBalanceByCardNumber());

atm2.acceptCard(card2, 1234);
console.log(atm1.checkBalanceByCardNumber());
console.log(atm2.checkBalanceByCardNumber());

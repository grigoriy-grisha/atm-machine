import { Bank } from "./Bank";
import { ATM } from "./ATM";
import { Bill } from "./Bill";

const tinkoff = new Bank("tinkoff");

const rubles100 = new Bill(100, "rubles");
const rubles500 = new Bill(500, "rubles");
const rubles1000 = new Bill(1000, "rubles");
const rubles2000 = new Bill(2000, "rubles");
const dollar1 = new Bill(1, "dollars");
const dollar10 = new Bill(10, "dollars");
const dollar100 = new Bill(100, "dollars");

const [card1, account1] = tinkoff.createCard(
  "4582 8683 4059 6988",
  "4582 8683 4059 6988 1231",
  "rubles",
  1234
);

const [card2, account2] = tinkoff.createCard(
  "4532 8642 1259 6918",
  "4532 8642 1259 6918 1431",
  "dollars",
  1234
);

const atm1 = new ATM(tinkoff);
const atm2 = new ATM(tinkoff);
// try {
//   atm1.acceptCard(card1, 12324);
//   atm1.acceptCard(card1, 12314);
//   atm1.acceptCard(card1, 12341);
//   atm1.acceptCard(card1, 1141);
// } catch (e) {
//   console.log(e);
// }

// account1.addCard(card2);
// console.log(account1.getCards());
// account1.removeCard(card2);
// console.log(account1.getCards());

atm1.acceptCard(card1, 1234);

// atm2.putFromCard(rubles500);
// atm1.acceptCard(card1, 1234);
atm1.putFromCard(rubles1000);

// atm1.putFromCard(rubles500);
// atm1.putFromCard(dollar10);
// atm1.withdrawFromCard(dollar1);
//
atm1.transferToAnotherAccount("4532 8642 1259 6918 1431", rubles500);
atm1.transferToAnotherCard("4532 8642 1259 6918", rubles500);
// atm1.transferToAnotherCard("4532 8642 1259 6918", dollar100);
// atm1.withdrawFromCard(rubles100);
// console.log(atm1.checkBalanceByCardNumber());

atm2.acceptCard(card2, 1234);
atm2.withdrawFromCard(dollar1);
// atm2.putFromCard(rubles2000);
// atm2.withdrawFromCard(rubles500);
//
// // console.log(atm1.checkBalanceByCardNumber());
// atm2.withdrawFromCard(rubles2000);
console.log(atm1.checkBalanceByCardNumber());
console.log(atm2.checkBalanceByCardNumber());

"use strict";
const account1 = {
  owner: "Olumide Isaac Awelewa",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Bruno Esset",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Alexis Okon",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Dafe Omosa Diegbe",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: "Chibuzor  Daniels",
  movements: [830, 700, -600, 1050, 690],
  interestRate: 0.2,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const move = sort ? movements.slice().sort((a, b) => a - b) : movements;

  move.forEach((money, i) => {
    const type = money > 0 ? "deposit" : "withdrawal";

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">
      ${i + 1}: ${type}
    </div>
    <div class="movements__value">${money}€</div>
  </div>
`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calculateAndDisplayTotal = function (account) {
  account.balance = account.movements.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  labelBalance.textContent = `${account.balance}€`;
};

const finalMovement = [200, 450, -400, 3000, -650, -130, 70, 1300];

const convertingPounds = 1.1;
const usingMap = finalMovement.map((toPounds) => toPounds * convertingPounds);

console.log(usingMap);

const oldMap = finalMovement.map(
  (money, i) =>
    `Movement ${i + 1}: You ${money > 0 ? "deposited" : "withdrew"} ${Math.abs(
      money
    )}`
);
console.log(oldMap);

const calculateAndDisplaySummary = function (account) {
  const Positives = account.movements
    .filter((deposit) => deposit > 0)
    .reduce((acc, value) => acc + value, 0);
  labelSumIn.textContent = `${Positives}€`;

  const Negatives = account.movements
    .filter((withdrawal) => withdrawal < 0)
    .reduce((acc, value) => acc + value, 0);
  labelSumOut.textContent = `${Math.abs(Negatives)}€`;

  const InterestRate = account.movements
    .filter((deposit) => deposit > 0)
    .map((acc) => (acc * account.interestRate) / 100)
    .filter((values) => values >= 1)
    .reduce((acc, value) => acc + value, 0);
  labelSumInterest.textContent = `${InterestRate}€`;
};

const newName = "Steven Thomas Williams";
/* 
const userName = newName
  .toLowerCase()
  .split(' ')
  .map(newName => newName[0])
  .join('');
 */
const functionNew = function (accounts) {
  accounts.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((newName) => newName[0])
      .join("");
  });
};
/* 
const oldMe = function (acc) {
  acc = newName
    .toLowerCase()
    .split(' ')
    .map(newName => newName[0])
    .join('');
  return acc;
};
 */

functionNew(accounts);

let currentAccount;

const reUseableFunc = function (currentAccount) {
  displayMovement(currentAccount.movements);
  calculateAndDisplayTotal(currentAccount);
  calculateAndDisplaySummary(currentAccount);
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (account) => account.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = ` Welcome Back,${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = "100";

    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();
  }

  reUseableFunc(currentAccount);
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    currentAccount.balance - amount >= 1000 &&
    receiverAcc?.username !== currentAccount.username
  ) {
    receiverAcc.movements.push(amount);
    currentAccount.movements.push(-amount);
    reUseableFunc(currentAccount);
  }
});
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(`working`);
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex((acc) => {
      acc.username === currentAccount.username;
    });
    accounts.splice(index, 1);
    console.log(accounts);
    labelWelcome.textContent = ` Goodbye,${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = "0";

    inputClosePin.value = inputCloseUsername.value = "";
  }
});
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    reUseableFunc(currentAccount);
  }
  inputLoanAmount.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

const finalMovements = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, value) => acc + value, 0);
console.log(finalMovements);

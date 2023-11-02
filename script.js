'use strict';
// Minimalist Banking Application

// Data
let timer, time;
let currentAccount;
const account1 = {
  owner: 'Rahul Kumar',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2023-10-28T23:36:17.929Z',
    '2023-10-31T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  owner: 'Clark Kent',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'hi-HI',
};

const account3 = {
  owner: 'Arya Kumar Rawat',
  movements: [2200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'ZAR',
  locale: 'af-ZA',
};

const account4 = {
  owner: 'Charles Geller',
  movements: [1430, 1000, 700, 50, 90, -888, 6, 12],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EGP',
  locale: 'ar-EG',
};

const account5 = {
  owner: 'Rika Fujiyama',
  movements: [140, 1000, 400, -50, -90, 120],
  interestRate: 1,
  pin: 5555,
  movementsDates: [
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'en-GB',
};
const account6 = {
  owner: 'Monisha',
  movements: [540, 10, 100, -50, -90],
  interestRate: 1,
  pin: 6666,
  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-07-11T23:36:17.929Z',
    '2023-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-US',
};
const account7 = {
  owner: 'Yuji Itadori',
  movements: [140, 9800000, -530, 9110],
  interestRate: 10,
  pin: 7777,
  movementsDates: [
    '2022-11-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
  ],
  currency: 'JPY',
  locale: 'jp-JP',
};
const accounts = [
  account1,
  account2,
  account3,
  account4,
  account5,
  account6,
  account7,
];

const dateOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

// Labels
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

//Containers
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

//Buttons
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

//Input Fields
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Functions
const formatCur = (value, locale = 'en-US', currency = 'USD') =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);

const createUserName = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('@');
  });
};
createUserName(accounts);

const dateFormat = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  else if (daysPassed === 1) return 'Yesterday';
  else if (daysPassed <= 3) return `${daysPassed} days ago`;
  else return new Intl.DateTimeFormat(locale, dateOptions).format(date);
};

const calcSecondsPassed = time => {
  const diff = Math.round((time - new Date()) / 1000);
  return diff >= 0 ? diff : 0;
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;
  movs.forEach(function (mov, index) {
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const days = dateFormat(
      new Date(account.movementsDates[index]),
      account.locale
    );
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${type}</div>
          <div class="movements__date">${days}</div>
          <div class="movements__value">${formatCur(
            mov,
            account.locale,
            account.currency
          )}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const logoutTimer = function () {
  time = +new Date() + 300000;
  const ticker = () => {
    labelTimer.textContent = `${`${Math.trunc(
      calcSecondsPassed(time) / 60
    )}`.padStart(2, 0)}:${`${calcSecondsPassed(time) % 60}`.padStart(2, 0)}`;
    if (calcSecondsPassed(time) === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Uh Oh! Your Session Expired.';
    }
  };
  ticker();
  timer = setInterval(ticker, 1000);
};

const updateUI = function (currentAccount) {
  displayMovements(currentAccount);
  calcdispCurrentBalance(currentAccount);
  displaySummary(currentAccount);
  labelDate.textContent = new Intl.DateTimeFormat('en-US', dateOptions).format(
    new Date()
  );
};

const calcdispCurrentBalance = function (account) {
  const balance = account.movements.reduce(
    (current, movement) => current + movement,
    0
  );
  account.currentbalance = balance;
  labelBalance.textContent = `${formatCur(
    balance,
    account.locale,
    account.currency
  )}`;
};

const displaySummary = function (account) {
  const deposit = account.movements
    .filter(movement => movement > 0)
    .reduce((acc, movement) => movement + acc, 0);
  const withdrawal = account.movements
    .filter(movement => movement < 0)
    .reduce((acc, movement) => Math.abs(movement) + acc, 0);
  const interest = account.currentbalance * account.interestRate;
  labelSumIn.textContent = `${formatCur(
    deposit,
    account.locale,
    account.currency
  )}`;
  labelSumOut.textContent = `${formatCur(
    withdrawal,
    account.locale,
    account.currency
  )}`;
  labelSumInterest.textContent = `${formatCur(
    interest,
    account.locale,
    account.currency
  )}`;
};

//Event Handlers

//Login
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (!currentAccount) labelWelcome.textContent = `User Not Found!!!`;
  else {
    if (+inputLoginPin.value === currentAccount?.pin) {
      inputLoginPin.value = inputLoginUsername.value = '';
      inputLoginPin.blur();
      labelWelcome.textContent = `Welcome Back, ${
        currentAccount.owner.split(' ')[0]
      }!!!`;
      containerApp.style.opacity = 100;
      updateUI(currentAccount);
      logoutTimer();
    } else if (inputLoginPin.value === '' || inputLoginUsername.value === '')
      labelWelcome.textContent = `Can't Leave Any Fields Empty!!!`;
    else labelWelcome.textContent = `Incorrect PIN!!! Please Try Again`;
  }
});

//Funds Transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  inputTransferAmount.blur();
  const date = new Date().toISOString();
  const recipient = accounts.find(
    account => account.owner === inputTransferTo.value
  );
  if (+inputTransferAmount.value > 0 && recipient) {
    recipient.movements.push(+inputTransferAmount.value);
    currentAccount.movements.push(-+inputTransferAmount.value);
    currentAccount.movementsDates.push(date);
    recipient.movementsDates.push(date);
    setTimeout(() => updateUI(currentAccount), 3000);
  }
  inputTransferAmount.value = inputTransferTo.value = '';
  clearInterval(timer);
  logoutTimer();
});

//Loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  inputLoanAmount.blur();
  const date = new Date().toISOString();
  if (
    +inputLoanAmount.value > 0 &&
    currentAccount.movements.some(
      mov => mov > 0 && mov >= +inputLoanAmount.value * 0.1
    )
  ) {
    currentAccount.movements.push(+inputLoanAmount.value);
    currentAccount.movementsDates.push(date);
    setTimeout(() => updateUI(currentAccount), 3000);
  }
  inputLoanAmount.value = '';
  clearInterval(timer);
  logoutTimer();
});

//Account Closure
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  inputClosePin.blur();
  if (
    inputCloseUsername.value === currentAccount.username &&
    inputClosePin.value == currentAccount.pin
  ) {
    const currentIndex = accounts.findIndex(
      account => currentAccount.username === account.username
    );
    accounts.splice(currentIndex, 1);
    setTimeout(() => {
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Account closure successful T_T ';
    }, 3000);
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

//Sorting
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

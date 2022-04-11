"use strict";

const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const swapCurrency = document.querySelector(".btn-swap");
const rateEl = document.querySelector(".rate");

const getExchangeRate = async function () {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  const res = await fetch("https://open.exchangerate-api.com/v6/latest");
  const data = await res.json();
  const rate = (data.rates[currency_two] / data.rates[currency_one]).toFixed(2);
  rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
  amountTwo.value = (amountOne.value * rate).toFixed(2);
};
getExchangeRate();

//Event Listeners
currencyOne.addEventListener("change", getExchangeRate);
amountOne.addEventListener("input", getExchangeRate);
currencyTwo.addEventListener("change", getExchangeRate);
amountTwo.addEventListener("input", getExchangeRate);

swapCurrency.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  getExchangeRate();
});

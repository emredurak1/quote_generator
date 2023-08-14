'use strict';

const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterButton = document.querySelector('.twitter-button');
const newQuoteButton = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

let apiQuotes = [];

const newQuote = function () {
  const randomNumber = Math.floor(Math.random() * apiQuotes.length) + 1;
  const quote = apiQuotes[randomNumber];

  quoteText.textContent = quote.text;
  if (quote.text.length >= 120) quoteText.classList.add('long-quote');
  if (!quote.author) authorText.textContent = 'Unknown';
  else authorText.textContent = quote.author;
  complete();
};

const getQuotes = async function () {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    console.error(err);
  }
};

const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
};

const loading = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const complete = function () {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

twitterButton.addEventListener('click', tweetQuote);

newQuoteButton.addEventListener('click', newQuote);

getQuotes();

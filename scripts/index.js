// use strict directive
"use strict";

import { Generator } from "./Generator.js";
import config from "../config.js";
import Dialog from "./Dialog.js";

const { API_KEY } = config;

// DOM Elements
const backdrop = document.getElementById("backdrop");
const searchSpan = document.getElementById("search-component-text");
const showSearchBtn = document.getElementById("show-search-btn");
const searchForm = document.getElementById("search-component-form");
const searchInp = document.getElementById("search-component-inp");
const searchBtn = document.getElementById("search-component-btn");

const searchResults = document.getElementById("search-results");
const resultsSection = document.querySelector("section.results");

// TODO: Add dark-mode toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Creating the main dialog
const mainMovieDialog = new Dialog(document, document.createElement("div"));
mainMovieDialog.appendTo(document.body);

// Event Listeners

showSearchBtn.addEventListener("click", () => {
  searchSpan.focus();
});

searchSpan.addEventListener("click", () => openSearchForm());

searchBtn.addEventListener("click", searchUsingAPI);

function onLoseFocus(e) {
  if (e.target == backdrop) {
    closeSearchForm();
  }
}

async function searchUsingAPI() {
  searchBtn.classList.add("is-loading");
  let res = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchInp.value}`
  );
  let data = await res.json();
  /**
   * @type {import('./typedefs.js').SearchResult[]?} An array with search results
   */
  let results = data.Search;
  console.log({ results });
  searchBtn.classList.remove("is-loading");
  results.forEach((searchResult) => {
    searchResults.appendChild(
      Generator.generateSearchResultCard(searchResult, async (e) => {
        /** @type {HTMLElement} */
        let target = e.target;

        let { id } = target.dataset;
        console.log({ id, API_KEY });
        // fetch data from the API
        let res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );
        let data = await res.json();
        console.log({ data });
        mainMovieDialog.replaceContent(Generator.generateMainCard(data));
        mainMovieDialog.showDialog();
        noscrolling()
      })
    );
  });
  resultsSection.classList.remove("hidden");
}

function openSearchForm() {
  searchForm.classList.remove("hidden");
  searchForm.classList.replace("to-top-animation", "to-center-animation");
  enableBackdrop();
  // Wait for the animation to play
  setTimeout(() => {
    document.addEventListener("click", onLoseFocus);
  }, 1000);
}

function closeSearchForm() {
  console.log("LOST FOCUS");
  searchForm.classList.replace("to-center-animation", "to-top-animation");
  disableBackdrop();
  setTimeout(() => {
    searchForm.classList.add("hidden");
  }, 1000);
  document.removeEventListener("click", onLoseFocus);
}

function enableBackdrop() {
  backdrop.classList.remove("hidden");
  document.body.classList.add("no-scroll");
  backdrop.classList.replace("fadeout", "fadein");
}

function disableBackdrop() {
  backdrop.classList.add("hidden");
  backdrop.classList.replace("fadein", "fadeout");
  document.body.classList.remove("no-scroll");
}

function noscrolling() {
  let b = document.querySelector('body')
  b.style.overflow = 'hidden'
}
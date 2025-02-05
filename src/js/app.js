// SELECT DOM ELEMENTS

import UserInerface from "./ui";

const openAddModalButton = document.querySelector(".add-books__button");
const closeAddModalButton = document.querySelector(".form__cancel-button");
const formModal = document.querySelector(".form-modal"); //the one that wraps around the entire modal (the vail)
const printedBookContainer = document.querySelector(".form__printed-book");
const audioBookContainer = document.querySelector(".form__audio-books");

// SELECTING FORM INPUTS

const form = document.querySelector(".form");
const title = document.querySelector(".form__title-input");
const publisher = document.querySelector(".form__publisher-input");
const author = document.querySelector(".form__author-input");
const date = document.querySelector(".form__publication-date-input");
const bookTypeDropDown = document.querySelector(".form__book-type");
const filterContainer = document.querySelector(".filter-books");
const formSubmitButton = document.querySelector(".form__add-button");

// SELECTING ELEMENTS SPECIFIC FOR PRINTED BOOKS

const pages = document.querySelector(".form__pages-input");
const printType = document.querySelector(".form__print-typet");

// SELECTING ELEMENTS SPECIFIC FOR AUDIO BOOKS

const narrator = document.querySelector(".form__narrator-input");
const duration = document.querySelector(".form__duration-input");

// ALL ELEMENTS IN PRINTED AND AUDIO CATEGORY
// creating it in an array by doing this to reset the elements when user toggles between the selection of book type
const printedFields = [
  document.querySelector(".form__pages-input"),
  document.querySelector(".form__print-type"),
];
const audioFields = [
  document.querySelector(".form__narrator-input"),
  document.querySelector(".form__duration-input"),
];

// ADDING EVENT LISTENER
//makes the click function be loaded once when the page opens. and pass it with an ananomyous function
document.addEventListener("DOMContentLoaded", () => {
  UserInerface.displayAddModal(
    openAddModalButton,
    formModal,
    printedBookContainer,
    audioBookContainer
  );
  UserInerface.closeAddModal(closeAddModalButton, formModal);
});
// it should listen when a change happens and pass with anonmymous function
bookTypeDropDown.addEventListener("change", () => {
  UserInerface.toggleBookTypeFields(
    printedBookContainer,
    audioBookContainer,
    audioFields,
    printedFields,
    bookTypeDropDown.value // have to add the value as js canno get the value from html as a string
  );
});

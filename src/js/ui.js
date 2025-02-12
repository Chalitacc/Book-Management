import BookManager from "./bookManager";

class UserInerface {
  //will make it connect to only this class not in other instances
  static currentEditId = null;
  static toggleBookTypeFields(
    printedBookContainer,
    audioBookContainer,
    audioFields,
    printedFields,
    bookType
  ) {
    // HIDE BOTH CONTAINERS INITALLY
    printedBookContainer.style.display = "none";
    audioBookContainer.style.display = "none";

    // RESET THE VALUE OF BOTH CATEGORIES
    // as it is an array, you can create an empty array to reset
    printedFields.forEach((field) => (field.value = ""));
    audioFields.forEach((field) => (field.value = ""));

    // DISPLAY THE RELEVANT CONTAINER BASED ON USERS SELECTION
    if (bookType === "printed-book") {
      printedBookContainer.style.display = "block";
    } else {
      audioBookContainer.style.display = "block";
    }
  }
  static displayAddModal(
    openAddModalButton,
    formModal,
    printedBookContainer,
    audioBookContainer
  ) {
    openAddModalButton.addEventListener("click", () => {
      formModal.classList.add("display-form");
      // HIDE BOTH CONTAINERS INITIALLY
      printedBookContainer.style.display = "none";
      audioBookContainer.style.display = "none";
    });
  }
  static closeAddModal(closeAddModalButton, formModal) {
    closeAddModalButton.addEventListener("click", () => {
      formModal.classList.remove("display-form");
    });
  }
  // DELETE MESSAGE
  static displayDeleteModal(bookId, bookTitle) {
    const deleteModal = document.querySelector(".delete-modal");
    const deleteMessage = document.querySelector(".delete-modal__text");
    const confirmDeleteButton = document.querySelector(
      ".delete-modal__confirm-button"
    );

    deleteMessage.textContent = `Are you sure you want to delete: ${bookTitle}`;
    deleteModal.classList.add("display-modal");

    confirmDeleteButton.addEventListener("click", () => {
      BookManager.deleteBook(bookId);
      deleteModal.classList.remove("display-modal");
    });
  }

  static closeDeleteModal() {
    const deleteModal = document.querySelector(".delete-modal");
    const cancelDeleteButton = document.querySelector(
      ".delete-modal__cancel-button"
    );
    cancelDeleteButton.addEventListener("click", () => {
      deleteModal.classList.remove("display-modal");
    });
  }

  static displayEditModal() {
    const formModal = document.querySelector(".form-modal");
    const formSubmitButton = document.querySelector(".form__add-button");
    formModal.classList.add("display-form");
    formSubmitButton.textContent = "Confirm Edit";
  }
  static populateEditForm(id) {
    const title = document.querySelector(".form__title-input");
    const publisher = document.querySelector(".form__publisher-input");
    const author = document.querySelector(".form__author-input");
    const date = document.querySelector(".form__publication-date-input");
    const bookTypeDropDown = document.querySelector(".form__book-type");
    const printedBookContainer = document.querySelector(".form__printed-book");
    const audioBookContainer = document.querySelector(".form__audio-books");

    const pages = document.querySelector(".form__pages-input");
    const printType = document.querySelector(".form__print-type");

    const narrator = document.querySelector(".form__narrator-input");
    const duration = document.querySelector(".form__duration-input");

    const bookToEdit = BookManager.booksCollection.find(
      (book) => book.id === id
    );
    console.log(bookToEdit);

    title.value = bookToEdit.title;
    publisher.value = bookToEdit.publisher;
    author.value = bookToEdit.author;
    date.value = bookToEdit.date;
    bookTypeDropDown.value = bookToEdit.bookTypeDropDown;

    if (bookToEdit.bookType === "printed-book") {
      audioBookContainer.style.display = "none";
      printedBookContainer.style.display = "block";
      pages.value = bookToEdit.pages;
      printType.value = bookToEdit.printType;
    } else {
      audioBookContainer.style.display = "block";
      printedBookContainer.style.display = "none";
      narrator.value = bookToEdit.narrator;
      duration.value = bookToEdit.duration;
    }
    UserInerface.currentEditId = id;
  }

  // RENDER BOOKS COLLECTION
  static renderBooks(filter = "all") {
    //by default it is all that is filtered
    const booksList = document.querySelector(".books__list");
    //rerender so that we only get one copy of each
    booksList.innerHTML = "";
    // reach out to the local storage so that we get the latest update from the local storage
    const booksCollection = JSON.parse(
      localStorage.getItem("books-collection")
    );

    // FILTER THE BOOKS - RERENDER FOR FILTERING BEFORE THE LOOP
    //check line 45
    //adding event listener for the filter function in app.js line 85
    const filteredCollection =
      filter === "all"
        ? booksCollection
        : booksCollection.filter((book) => book.bookType == filter);
    // it will filter depending on the book type, the filter function creates a new array
    if (filteredCollection) {
      //adding the if statement before
      // CREATING ELEMENTS
      filteredCollection.forEach((book, index, arr) => {
        const bookCard = document.createElement("li");
        const bookDetailsContainer = document.createElement("div");
        const bookToolsContainer = document.createElement("div");

        // the common properties
        const titleContainer = document.createElement("div");
        const authorContainer = document.createElement("div");
        const publisherContainer = document.createElement("div");
        const dateContainer = document.createElement("div");
        const bookTypeContainer = document.createElement("div");
        //dynamic properties
        const pagesOrNarratorContainer = document.createElement("div");
        const printTypeOrDurationContainer = document.createElement("div");

        const titleHeader = document.createElement("h3");
        const authorHeader = document.createElement("h3");
        const publisherHeader = document.createElement("h3");
        const dateHeader = document.createElement("h3");
        const bookTypeHeader = document.createElement("h3");
        const pagesOrNarratorHeader = document.createElement("h3");
        const printTypeOrDurationHeader = document.createElement("h3");
        //this is for the value for the headers
        const title = document.createElement("span");
        const author = document.createElement("span");
        const publisher = document.createElement("span");
        const date = document.createElement("span");
        const bookType = document.createElement("span");
        const pagesOrNarrator = document.createElement("span");
        const printTypeOrDuration = document.createElement("span");

        //create the delete and edit button
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");

        // APPENDING THE ELEMENTS
        booksList.append(bookCard);
        bookCard.append(bookDetailsContainer, bookToolsContainer);
        bookDetailsContainer.append(
          titleContainer,
          authorContainer,
          publisherContainer,
          dateContainer,
          bookTypeContainer,
          pagesOrNarratorContainer,
          printTypeOrDurationContainer
        );
        titleContainer.append(titleHeader, title);
        authorContainer.append(authorHeader, author);
        publisherContainer.append(publisherHeader, publisher);
        dateContainer.append(dateHeader, date);
        bookTypeContainer.append(bookTypeHeader, bookType);
        pagesOrNarratorContainer.append(pagesOrNarratorHeader, pagesOrNarrator);
        printTypeOrDurationContainer.append(
          printTypeOrDurationHeader,
          printTypeOrDuration
        );
        bookToolsContainer.append(deleteButton, editButton);

        // POPULATING THE BOOK CARD WITH BOOKS DETAILS
        titleHeader.textContent = "Title:";
        authorHeader.textContent = "Author:";
        publisherHeader.textContent = "Publisher";
        dateHeader.textContent = "Date:";
        bookTypeHeader.textContent = "Book Type:";
        pagesOrNarratorHeader.textContent =
          book.bookType === "printed-book" ? "Pages:" : "Narrator";
        printTypeOrDurationHeader.textContent =
          book.bookType === "printed-book" ? "Print Type:" : "Duration";

        title.textContent = book.title;
        author.textContent = book.author;
        publisher.textContent = book.publisher;
        date.textContent = book.date;
        bookType.textContent = book.bookType;
        // the dynamic element (=== means if it equals) ? (if it is true) : (if it is not true) --> this is called turnary
        pagesOrNarrator.textContent =
          book.bookType === "printed-book" ? book.pages : book.narrator;
        printTypeOrDuration.textContent =
          book.bookType === "printed-book" ? book.printType : book.duration;

        deleteButton.textContent = "Delete";
        editButton.textContent = "Editx";

        // ADD CLASS NAMES
        bookCard.classList.add("book__item");
        bookDetailsContainer.classList.add("book-item__details-container");
        bookToolsContainer.classList.add("book-item__tools-container");
        deleteButton.classList.add("book-item__delete-button");
        editButton.classList.add("book-item__edit-button");

        // adding event listener in the app.js for when it should be rendered

        // ADD EVENT LISTENERS TO THE BUTTONS
        deleteButton.addEventListener("click", () => {
          UserInerface.displayDeleteModal(book.id, book.title);
        });
        editButton.addEventListener("click", () => {
          UserInerface.displayEditModal();
          UserInerface.populateEditForm(book.id);
        });
      });
    }
  }
}

export default UserInerface;

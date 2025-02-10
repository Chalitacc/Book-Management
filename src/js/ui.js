class UserInerface {
  //will make it connect to only this class not in other instances
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
  // RENDER BOOKS COLLECTION
  static renderBooks() {
    const booksList = document.querySelector(".books__list");
    //rerender so that we only get one copy of each
    booksList.innerHTML = "";
    // reach out to the local storage so that we get the latest update from the local storage
    const booksCollection = JSON.parse(
      localStorage.getItem("books-collection")
    );

    booksCollection.forEach((book, index, arr) => {
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
    });
  }
}

export default UserInerface;

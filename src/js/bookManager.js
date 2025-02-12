import AudioBook from "./audioBook";
import PrintedBook from "./printedBooks";
import UserInerface from "./ui";

class BookManager {
  // STORING BOOKS
  static booksCollection =
    JSON.parse(localStorage.getItem("book-collection")) || []; //if it is empty when you first open the page  add this:|| [] as an empty array, if not it will show the existing data
  static addBook(
    title,
    author,
    publisher,
    date,
    bookTypeDropDown,
    pages,
    printType,
    narrator,
    duration
  ) {
    const latestCollection =
      JSON.parse(localStorage.getItem("book-collection")) || [];
    let book; //will be as an empty string
    if (bookTypeDropDown === "printed-book") {
      book = new PrintedBook(
        title,
        author,
        publisher,
        date,
        bookTypeDropDown,
        pages,
        printType
      );
    } else {
      book = new AudioBook(
        title,
        author,
        publisher,
        date,
        bookTypeDropDown,
        narrator,
        duration
      );
    }
    // adding books to the collection
    // this keyword points to the class itself (BookManager) or if it was not static it will point to the instance that was created
    latestCollection.push(book);
    // add the method for storing the books here
    this.storeBooks(latestCollection);
    BookManager.booksCollection = latestCollection; // this is a controlled mutation
    console.log(this.booksCollection);
  }
  // USING A METHOD FOR STORING THE BOOKS
  //has to be string or JSON
  //responsible for updating the local storage
  static storeBooks(collection) {
    localStorage.setItem("books-collection", JSON.stringify(collection));
  }

  // DELETING BOOK
  // splice method: directly modifies the existing array instead of making a new array. this will mutate the array - not good practice
  // use filter method as you want to just eliminate one and it will give you a new array instead and wont touch the original array
  static deleteBook(id) {
    const latestCollection =
      JSON.parse(localStorage.getItem("book-collection")) || []; // adding the latest collection but without the empty array
    BookManager.booksCollection = latestCollection.filter((book) => {
      return book.id !== id; //needs to have a return keyword
    });
    // remember to update our data
    BookManager.storeBooks(BookManager.booksCollection);
    UserInerface.renderBooks();
  }
  // EDIT BOOK
  static editBook(
    id,
    title,
    author,
    publisher,
    date,
    bookTypeDropDown,
    pages,
    printType,
    narrator,
    duration
  ) {
    const latestCollection = JSON.parse(
      localStorage.getItem("books-collection")
    );
    const bookIndex = latestCollection.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      latestCollection[bookIndex] = {
        id,
        title,
        author,
        publisher,
        date,
        bookTypeDropDown,
        pages,
        printType,
        narrator,
        duration,
      };
    }
    BookManager.storeBooks(latestCollection);
    BookManager.booksCollection = latestCollection;
  }
}

export default BookManager;

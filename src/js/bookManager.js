import AudioBook from "./audioBook";
import PrintedBook from "./printedBooks";

class BookManager {
  // storing the books
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
    this.booksCollection.push(book);
    console.log(this.booksCollection);
  }
}

export default BookManager;

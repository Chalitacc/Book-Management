import AudioBook from "./audioBook";
import PrintedBook from "./printedBooks";

class BookManager {
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
    let book;
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
    console.log(book);
  }
}

export default BookManager;

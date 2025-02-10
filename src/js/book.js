import { v4 as uuidv4 } from "uuid";
class Book {
  constructor(title, author, publisher, date, bookType) {
    this.id = uuidv4(); //creating ui so that each book has its own id for when we want to delete/edit. installing uuid (npm i uuid)
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.date = date;
    this.bookType = bookType;
  }
}

export default Book;

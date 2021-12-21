let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + ", " + 
            (this.read ? "read" : "not yet read");
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary(hobbit);

const hobbit2 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary(hobbit2);

const hobbit3 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary(hobbit3);

const container = document.querySelector('.container');

myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('card');

    container.appendChild(card);
});


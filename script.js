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

const hobbit2 = new Book("Lord of The Rings", "J.R.R. Tolkien", 295, false);
addBookToLibrary(hobbit2);

const hobbit3 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary(hobbit3);

const container = document.querySelector('.container');
refreshLibrary();

const formPopup = document.querySelector('.form-popup');

const addButton = document.querySelector('#newBookBtn');
addButton.addEventListener('click', () => {
    formPopup.classList.toggle('show-form');
})

const addBook = document.querySelector('#add');
addBook.addEventListener('click', () => addFields());

const bookForm = document.querySelector('form');





function addFields() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;

    let book = new Book(title, author, pages, true);
    addBookToLibrary(book);
    formPopup.classList.toggle('show-form');
    refreshLibrary();
}



function refreshLibrary() {
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }

    myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('card');

    populateCard(book, card);

    container.appendChild(card);
    
    
});

    console.log(myLibrary)
}

function populateCard(book, card) {
    const title = document.createElement('div');
    title.textContent = `Title: ${book.title}`
    card.appendChild(title);

    const author = document.createElement('div');
    author.textContent = `Author: ${book.author}`
    card.appendChild(author);

    const pages = document.createElement('div');
    pages.textContent = `Pages: ${book.pages}`
    card.appendChild(pages);

    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('deleteBtn')
    deleteBtn.addEventListener('click', () => {
        let objToRemove = card.parent
        myLibrary.pop();
        refreshLibrary();
    })
    card.appendChild(deleteBtn);
}


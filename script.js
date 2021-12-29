let myLibrary = [];
let total = 0;

//book object
function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}


Book.prototype.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + ", " + 
            (this.read ? "read" : "not yet read");
}

//adds book object to library array
function addBookToLibrary(book) {
    myLibrary.push(book);
    total++;
}

//3 sample books for testing
// const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false, 0);
// addBookToLibrary(hobbit);
// const hobbit2 = new Book("Lord of The Rings", "J.R.R. Tolkien", 296, true, 1);
// addBookToLibrary(hobbit2);
// const hobbit3 = new Book("The Fellowship of the Ring", "J.R.R. Tolkien", 297, false, 2);
// addBookToLibrary(hobbit3);
const container = document.querySelector('.container');
//refreshLibrary();

//adds form popup to add book button
const formPopup = document.querySelector('.form-popup');
const addButton = document.querySelector('#newBookBtn');
addButton.addEventListener('click', () => clearForm())

const addBook = document.querySelector('#add');
addBook.addEventListener('click', () => addFields());

const cancelForm = document.querySelector('#cancel');
cancelForm.addEventListener('click', () => toggleForm());

const readBtn = document.querySelector('#read');
const notReadBtn = document.querySelector('#not-read');

readBtn.addEventListener('click', () => {
    readBtn.classList.add('read-select');
    notReadBtn.classList.remove('read-select');
    readBtn.value = true;
})

notReadBtn.addEventListener('click', () => {
    notReadBtn.classList.add('read-select');
    readBtn.classList.remove('read-select');
    readBtn.value = false;
})

function toggleForm() {
    formPopup.classList.toggle('show-form');

}

function clearForm () {
    document.querySelector('#title').value = null;
    document.querySelector('#author').value = null;
    document.querySelector('#pages').value = null;
    document.querySelector('#read').value = false;
    readBtn.classList.remove('read-select');
    notReadBtn.classList.remove('read-select');

    toggleForm();
}


//creates a book object from book form fields, adds to library, removes form
function addFields() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    if (pages == "") pages = "0";
    let read = document.querySelector('#read').value;
    let id = myLibrary.length;

    let book = new Book(title, author, pages, read, id);
    addBookToLibrary(book);
    formPopup.classList.toggle('show-form');
    refreshLibrary();
}



function refreshLibrary() {
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }

    myLibrary.forEach(book => {
    if (book) {
        const card = document.createElement('div');
        card.classList.add('card');

        populateCard(book, card);

        container.appendChild(card);  
    }
            
});
    setData();
}


//populates book cards from book objects
function populateCard(book, card) {
    const title = document.createElement('div');
    title.textContent = `${book.title}`
    card.appendChild(title);

    const author = document.createElement('div');
    author.textContent = `${book.author}`
    card.appendChild(author);

    const pages = document.createElement('div');
    pages.textContent = `${book.pages} pages`
    card.appendChild(pages);

    const readStatus = document.createElement('div');
    let rStatus = true
    if (book.read) {
        readStatus.textContent = "Read";
    }

    else {
        readStatus.textContent = "Not Read";
        rStatus = false;
    }
        
    card.appendChild(readStatus);


    card.id = book.id;

    const readToggle = document.createElement('div');
    readToggle.classList.add('read-toggle');
    rStatus ? readToggle.textContent = "Mark as unread" :
              readToggle.textContent = "Mark as read";  
    readToggle.addEventListener('click', () => {
        if (rStatus) {
            readToggle.textContent = "Mark as unread";
            readStatus.textContent = "Not Read";
        }

        refreshLibrary();
    })
    card.appendChild(readToggle);

    function bookReadStatus(status) {

    }

    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('deleteBtn')
    deleteBtn.addEventListener('click', () => {
        delete myLibrary[card.id];
        total--;
        refreshLibrary();
    })
    card.appendChild(deleteBtn);

    
}


function setData() {
    const localLibrary = JSON.stringify(myLibrary);
    localStorage.setItem("myLibrary", localLibrary);
}

function getData() {
    if (localStorage.myLibrary) {
        let text = localStorage.getItem("myLibrary");
        let obj = JSON.parse(text);

        myLibrary = obj;
        refreshLibrary();
    }

    else 
        refreshLibrary();
    
}

getData();

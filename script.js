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

const container = document.querySelector('.container');


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

//resets book form to default values
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


//renders library and saves to local storage
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
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('card-info-container');

    const title = document.createElement('div');
    title.textContent = `${book.title}`
    infoContainer.appendChild(title);

    const author = document.createElement('div');
    author.textContent = `${book.author}`
    infoContainer.appendChild(author);

    const pages = document.createElement('div');
    pages.textContent = `${book.pages} pages`
    infoContainer.appendChild(pages);

    const readStatus = document.createElement('div');
    let rStatus = true
    if (book.read) {
        readStatus.textContent = "Read";
    }

    else {
        readStatus.textContent = "Not Read";
        rStatus = false;
    }
        
    infoContainer.appendChild(readStatus);

    card.appendChild(infoContainer);

    const cardButtons = document.createElement('div');
    cardButtons.classList.add('cardBtn-container');

    const readToggle = document.createElement('div');
    readToggle.classList.add('read-toggle');

    book.read ? readToggle.textContent = "Mark as unread" :
              readToggle.textContent = "Mark as read";  
    readToggle.addEventListener('click', () => {
        if (book.read) {
            readToggle.textContent = "Mark as unread";
            readStatus.textContent = "Not Read";
            book.read = false;
        }

        else {
            readToggle.textContent = "Mark as read";
            readStatus.textContent = "Read";
            book.read = true;
        }

        refreshLibrary();
    })
    cardButtons.appendChild(readToggle);

    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('deleteBtn')

    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa', 'fa-trash');
    deleteBtn.appendChild(trashIcon);

    deleteBtn.addEventListener('click', () => {
        delete myLibrary[book.id];
        total--;
        refreshLibrary();
    })
    cardButtons.appendChild(deleteBtn); 
    card.appendChild(cardButtons);
}

//stores library in local storage
function setData() {
    const localLibrary = JSON.stringify(myLibrary);
    localStorage.setItem("myLibrary", localLibrary);
}

//retrieves library from local storage
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

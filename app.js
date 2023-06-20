// ==================== Start of modal section ==================== 
const modal = document.querySelector('#modal');
const openModalButton = document.querySelector('.open-modal');

openModalButton.addEventListener('click', () => {
    modal.style.display = 'block';
})

window.addEventListener('click', function (event) {
    if (event.target == modal)
    {
        closeModal();
    }
})

function closeModal ()
{
    modal.style.display = 'none';
}
// ==================== End of modal section ====================

const main = document.querySelector('.main');
const addBookButton = document.querySelector('.add-book-button');
const form = document.querySelector('#form');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    addBookToLibrary();
    resetFormElementValues();
    modal.style.display = 'none';
})

let library = [];

class Book {
    constructor (title,author,pages,read,rate,comment)
    {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.rate = rate;
        this.comment = comment;
    }
}

Book.prototype.toggleReadStatus = function()
{
    this.read = !this.read;
}

function addBookToLibrary()
{
    let bookTitle = document.querySelector('#book-title').value;
    let bookAuthor = document.querySelector('#book-author').value;
    let bookPages = document.querySelector('#book-pages').value;
    let bookRead = document.querySelector('#book-read').checked;
    let bookRate = document.querySelector('#book-rate').value;
    let bookComment = document.querySelector('#book-comment').value;

    let newBook = new Book(bookTitle,bookAuthor,bookPages,bookRead,bookRate,bookComment);
    library.push(newBook);
    displayBooks();

}

function displayBooks()
{   
    main.innerHTML = '';

    for (let i = 0; i < library.length; i++)
    {
        let currentBook = library[i];
        let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
            <p class='card-title'><span>Title:</span> ${currentBook.title}.</p>
            <p class='card-author'><span>Author:</span> ${currentBook.author}.</p>
            <p class='card-pages'><span>Pages:</span> ${currentBook.pages ? currentBook.pages : 'Not specified'}.</p>
            <p class='card-rate'><span>Rate out of 10: </span>${currentBook.rate ? currentBook.rate : 'Not rated'}.</p>
            <p class='card-read'>${currentBook.read ? 'Already read' : 'Not read yet'}.</p>
            <p class='card-comment'>${currentBook.comment ? '<span> Comment: </span>' + currentBook.comment : '' }</p>
            <div class='buttons-container'>
            <svg onclick='removeBook(${i})' class='svg-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Remove book</title><path d="M14.12,10.47L12,12.59L9.87,10.47L8.46,11.88L10.59,14L8.47,16.12L9.88,17.53L12,15.41L14.12,17.53L15.53,16.12L13.41,14L15.53,11.88L14.12,10.47M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9Z" /></svg>
            <svg class='svg-icon' onclick='toggleReadStatus(${i})' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Toggle read status</title><path d="M23.5,17L18.5,22L15,18.5L16.5,17L18.5,19L22,15.5L23.5,17M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.75,12.65 22.44,13.26 22.08,13.85C21.5,13.5 20.86,13.25 20.18,13.12L20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12C4.83,15.36 8.24,17.5 12,17.5L13.21,17.43C13.07,17.93 13,18.46 13,19V19.46L12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5Z" /></svg>
            </div>
            `;
            if (currentBook.rate == '')
            {
                card.classList.add('no-rate');
            } 
            else if (currentBook.rate <= 3)
            {
                card.classList.add('bad-rate');
            }
            else if (currentBook.rate >= 4 && currentBook.rate <= 7)
            {
                card.classList.add('medium-rate');
            }
            else
            {
                card.classList.add('good-rate');
            }
            main.appendChild(card);            
    }
} 

function toggleReadStatus(index)
{
    library[index].toggleReadStatus();
    displayBooks();
}
    
function resetFormElementValues()
{
    let title = document.querySelector('#book-title').value = '';
    let author = document.querySelector('#book-author').value = '';
    let pages = document.querySelector('#book-pages').value = '';
    let read = document.querySelector('#book-read').value = '';
    let rate = document.querySelector('#book-rate').value = '';
    let comment = document.querySelector('#book-comment').value ='';
}

function removeBook (index)
{
    library.splice(index, 1);
    displayBooks();

}






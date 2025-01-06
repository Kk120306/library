const logBtn = document.querySelector('.log');
const bookName = document.getElementById("name");
const authorName = document.getElementById("author");
const pubDate = document.getElementById("date");
const display = document.querySelector('.display');
const header = document.querySelector('.header');
const clear = document.querySelector('.clear');
const exit = document.querySelector('.exit');
const popUp = document.querySelector('.add-pop');
const addBtn = document.querySelector('.add');
const status = document.querySelector('.toggle-read');

const myLibrary = [];

function Book(name, author, published, read) {
    this.name = name;
    this.author = author;
    this.published = published;
    this.read = read;
}

function addBookToLibrary(name, author, published, read) {
    if (!name || !author || !published) {
        alert("One of the following fields is missing (Name, Author, Published Date)");
        return false;
    }

    myLibrary.push(new Book(name, author, published, read));
    return true;
}

function displayBooks() {
    display.innerHTML = "";
    myLibrary.forEach((book, index) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-book"><strong>Book:</strong> ${book.name}</div>
            <div class="card-author"><strong>Author:</strong> ${book.author}</div>
            <div class="card-date"><strong>Published:</strong> ${formatDateISO(book.published)}</div>
            <div class="read"><strong>Read:</strong> ${book.read === "true" ? "Yes" : "No"}</div>
            <button class="remove-book">Remove</button>
        `;
        const removeBtn = card.querySelector(".remove-book");
        removeBtn.addEventListener("click", () => {
            removeBookFromLibrary(index);
            displayBooks(); 
        });
        
        display.appendChild(card);
    })
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1); 
}

function clearInputs() {
    bookName.value = "";
    authorName.value = "";
    pubDate.value = "";
    document.getElementById("yes").checked = true;
}

function toggleHidden() {
    display.classList.toggle("hidden");
    header.classList.toggle("hidden");
    popUp.classList.toggle("hidden");
}

clear.addEventListener("click", () => clearInputs());

logBtn.addEventListener("click", () => {
    toggleHidden();
    displayBooks();
});

exit.addEventListener("click", () => {
    clearInputs();
    toggleHidden();
});

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const selectedValue = document.querySelector('input[name="yesno"]:checked').value;

    if (addBookToLibrary(bookName.value, authorName.value, pubDate.value, selectedValue)) {
        displayBooks();
        clearInputs();
        toggleHidden();
    }
});

function formatDateISO(date) {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
}


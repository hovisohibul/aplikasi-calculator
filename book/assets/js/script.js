// data book
const book = []

// render custom
const renderBook = new Event('render-book')
const savedBook = new Event('save-book')

// local storage
const LOCAL_KEY = 'BOOK_DATA'

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('user-input-book')
    const searchButton = document.getElementById('search-data')
    const editButton = document.getElementById('btn-edit')
    const resetButton = document.getElementById('btn-reset')

    // submit form input
    submitButton.addEventListener('submit', (event) => {

        event.preventDefault()
        addBook()
    })

    // search button
    searchButton.addEventListener('click', (event) => {
        event.preventDefault()
        searchBookTitle()
    })

    if(storageExit()){
        loadDataBookFromStorage()
    }
    
})

// render ke custom event
document.addEventListener('render-book', () => {

    console.log(book)
    
    // variable
    const bookUncomplete = document.getElementById('book-uncomplete')
    bookUncomplete.innerHTML = ''

    const bookComplete = document.getElementById('book-complete')
    bookComplete.innerHTML = ''
    
    // tampil data array
    for(let list of book){
        const listBook = makeListBook(list)
        if(!list.isDone){
            bookUncomplete.append(listBook)
        }else{
            bookComplete.append(listBook)
        }
    }
})

// save to custom event
document.addEventListener('save-book', () => {
    console.log(localStorage.getItem(LOCAL_KEY))
})


// tambah input ke data array
function addBook(){

    // variable input
    const bookTitle = document.getElementById('title').value
    const bookWriter = document.getElementById('writer').value
    const bookYear = parseInt(document.getElementById('year').value)
    const bookDone = document.getElementById('finish').checked

    // generate
    const generateID = generateIDBook()
    const generateBook = generateDataBook(generateID, bookTitle, bookWriter, bookYear, bookDone)

    book.push(generateBook)

    document.dispatchEvent(renderBook)

    saveDataBook()
}

// convert menjadi id
function generateIDBook(){
    const idBook = +new Date()
    return idBook
}

// generate menjadi object
function generateDataBook(id, title, writer, year, isDone){
    let dataBook = {
        id,
        title,
        writer,
        year,
        isDone
    }
    return dataBook
}

// mencari data book
function searchBookTitle(){
    const bookTitleId = document.getElementById('search').value
    const findTitle = document.querySelectorAll('.item > .inner')
    for(let item of findTitle){     
        const getTitle = item.innerText.toLowerCase()
        const make = bookTitleId.toLowerCase()
        if(getTitle.includes(make)){
            item.parentElement.style.display = 'block'
        }else{
            item.parentElement.style.display = 'none'
        }
    }    
}

// progress
function makeListBook(bookList){

    // create element
    const inputTitleBook = document.createElement('h2')
    inputTitleBook.innerText = bookList.title

    const inputWriterBook = document.createElement('h4')
    inputWriterBook.innerText = "Penulis: " + bookList.writer

    const inputYearBook = document.createElement('p')
    inputYearBook.innerText = "Tahun: " + bookList.year

    // create element div
    const childElement = document.createElement('div')
    childElement.classList.add('inner')
    childElement.append(inputTitleBook, inputWriterBook, inputYearBook)

    const container = document.createElement('div')
    container.classList.add('item')
    container.append(childElement)
    container.setAttribute('id', `${bookList.id}`)

    if(bookList.isDone){

        // delete button
        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete-button')
        deleteButton.innerText = "Delete"
        
        deleteButton.addEventListener('click', () => {
            deleteDataBook(bookList.id)
        })

        // undo button
        const undoButton = document.createElement('button')
        undoButton.classList.add('undo-button')
        undoButton.innerText = "Undo"
        
        undoButton.addEventListener('click', () => {
            undoDataBook(bookList.id)
        })

        childElement.append(undoButton, deleteButton)
    }else{
        // edit button
        const editButton = document.createElement('button')
        

        // check button
        const checkButton = document.createElement('button')
        checkButton.classList.add('check-button')
        checkButton.innerText = "Complete"
        
        checkButton.addEventListener('click', () => {
            bookIsComplete(bookList.id)
        })

        // delete button
        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete-button')
        deleteButton.innerText = 'Delete'

        deleteButton.addEventListener('click', () => {
            deleteDataBook(bookList.id)
        })

        childElement.append(checkButton, deleteButton)
    }

    return container
}

// tambah data jika sudah selesai
function bookIsComplete(bookId){

    // variable 
    const target = findId(bookId)

    if(target == null) return

    // change 
    target.isDone = true

    document.dispatchEvent(renderBook)

    saveDataBook()
}

// undo jika belum selesai
function undoDataBook(bookId){
    const target = findId(bookId)

    if(target == true) return

    target.isDone = false

    document.dispatchEvent(renderBook)

    saveDataBook()
}

// delete data book
function deleteDataBook(bookId){

    const target = findIdBook(bookId)

    if(target == -1) return

    book.splice(target, 1)

    document.dispatchEvent(renderBook)

    saveDataBook()
}

// mencari id yang sesuai dengan data book
function findId(bookID){
    for(const item of book){
        if(item.id === bookID){
            return item
        }
    }
    return null
}

// hapus data book berdasarkan id
function findIdBook(bookId){

    for(let index in book){
        if(book[index].id == bookId){
            return index
        }
    }
    return -1
}

// save data book to local
function saveDataBook(){
    if(storageExit()){
        const parseData = JSON.stringify(book)
        localStorage.setItem(LOCAL_KEY, parseData)
        document.dispatchEvent(savedBook)
    }
}

// menentukan storage support pada web
function storageExit(){
    if(typeof(Storage) === undefined){
        alert('Gagal')
        return false
    }
    return true
}

// load data book
function loadDataBookFromStorage(){
    const serializedData = localStorage.getItem(LOCAL_KEY)
    let data = JSON.parse(serializedData)

    if(data !== null){
        for(const item of data){
            book.push(item)
        }
    }

    document.dispatchEvent(renderBook)
}

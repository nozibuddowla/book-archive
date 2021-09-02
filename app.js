document.getElementById('error-message').style.display = 'none';

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}
const toggleBookDetail = displayStyle => {
    document.getElementById('book-details').style.display = displayStyle;
}
// search
const getBooks = () => {
    const searchField = document.getElementById('search-term');

    //display spinner
    toggleSpinner('block');
    toggleSearchResult('none');
    toggleBookDetail('none');

    const searchText = searchField.value;
    searchField.value = '';

    document.getElementById('error-message').style.display = 'none';

    //load Data
    const emptyText = document.getElementById('empty-text');
    emptyText.textContent = '';

    if (searchText === '') {
        const para = document.createElement('p');
        para.innerText = `Please write something to display`;
        para.style.color = 'red';
        para.style.textAlign = 'center';
        emptyText.appendChild(p);
        toggleSpinner('none');
    } else {
        const bookSearchUrl = `https://openlibrary.org/search.json?q=${searchText}`
        // load data from api
        fetch(bookSearchUrl)
            .then(res => res.json())
            .then(data => displayBooks(data.docs))
            .catch(error => showErrorMessage(error));
    }
}

// show error message
const showErrorMessage = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displayBooks = docs => {
    const searchResult = document.getElementById('search-result');

    //clear previous search data
    searchResult.textContent = '';

    const noSearchResult = document.getElementById('empty-text');
    noSearchResult.textContent = '';

    if (docs.length === 0) {
        noSearchResult.textContent = '';
        const para = document.createElement('p');
        para.innerText = `No Books found`;
        para.style.color = 'red';
        para.style.textAlign = 'center';
        noSearchResult.appendChild(p);
        toggleBookDetail('none');
        
    } else {
        const resultFound = document.getElementById('empty-text');
        resultFound.textContent = '';
        const para = document.createElement('p');
        para.innerText = `results Found ${docs.length}`;
        para.style.color = 'black';
        para.style.textAlign = 'center';
        resultFound.appendChild(p);
        searchResult.textContent = '';
    }
    docs.forEach(doc => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('col');
        bookDiv.innerHTML = ` 
            <div class="card shadow-lg bg-white h-100 rounded" onclick="loadBookDetail('${doc.title}')">
                <img src="https://covers.openlibrary.org/b/id/${doc.cover_i ? doc.cover_i : ''}-M.jpg" class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                    <h2 class="card-title">${doc.title}</h2>
                    <h5>By ${doc.author_name ? doc.author_name : ''}</h5>
                    <p class="card-text">Publisher: ${doc.publisher ? doc.publisher : ''} </p>
                    <p class="card-text">First Publish in ${doc.first_publish_year ? doc.first_publish_year : ''} </p>
                </div>
            </div>
        `;
        searchResult.appendChild(bookDiv);
    });
    toggleSpinner('none');
    toggleSearchResult('flex');
}

const loadBookDetail = bookTitle => {

    const url = `https://openlibrary.org/search.json?q=${bookTitle}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBookDetail(data.docs[0]))

}

const displayBookDetail = doc => {
    //console.log(doc);
    const bookDetails = document.getElementById('book-details');
    bookDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('modal-body');
    div.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-md-4 ms-auto rounded">
                    <img src="https://covers.openlibrary.org/b/id/${doc.cover_i ? doc.cover_i : ''}-M.jpg" alt="" class="img-fluid rounded">
                    <h2 class="card-title">${doc.title}</h2>
                    <h5>By ${doc.author_name ? doc.author_name : ''} </h5>
                    <p>Publisher: ${doc.publisher ? doc.publisher : ''}</p>
                    <p>First Publish in ${doc.first_publish_year ? doc.first_publish_year : ''}</p>
                    <button class="btn btn-primary">Read Book</button>
                </div>
            </div>
        </div>
    `;
    bookDetails.appendChild(div);
    toggleBookDetail('block');

}
document.getElementById('error-message').style.display = 'none';

// search a book
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    console.log(searchText);

    document.getElementById('error-message').style.display = 'none';

    // for counting total result
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => countSearchResult(data.numFound, searchText))
        .catch(error => displayError(error));

    // for showing total result
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs))
        .catch(error => displayError(error));
}

// error checking
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

// showing total result
const countSearchResult = (totalNumber, search) => {
    if (totalNumber === 0) {
        document.getElementById('error-message').style.display = 'block';
    }
    const totalResult = document.getElementById('counted-result');
    totalResult.textContent = '';
    const totalBook = parseInt(totalNumber);
    const div = document.createElement('div');
    div.innerHTML = `
        <h5 class="text-center text-uppercase">Total <span class="text-success">${totalBook}</span> result found for "${search}"</h5>
    `;
    totalResult.appendChild(div);
}

// display searching result 
const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.classList.add('text-center');
        if (book.cover_i && book.publisher) {
            div.innerHTML = `
            <div class="shadow-lg p-3 m-5 rounded card-body h-500px">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" alt="...">
                <h5 class="py-4 card-title">Title: ${book.title}</h5>
                <h6 class="card-title pb-4">Author: ${book.author_name}</h6>
                <h6 class="card-title">Publisher: ${book.publisher[0]}</h6>
                <h6 class="card-title">First Publish Year: ${book.first_publish_year}</h6>
            </div>
        `;
        }
        else if (book.cover_i) {
            div.innerHTML = `
            <div class="shadow-lg p-3 m-5 rounded card-body h-500px">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" alt="...">
                <h5 class="py-4 card-title">Title: ${book.title}</h5>
                <h6 class="card-title pb-4">Author: ${book.author_name}</h6>
                <h6 class="card-title">Publisher: </h6>
                <h6 class="card-title">First Publish Year: ${book.first_publish_year}</h6>
            </div>
        `;
        }
        else if (book.publisher) {
            div.innerHTML = `
            <div class="shadow-lg p-3 m-5 rounded card-body h-500px">
                <img src="https://cdn.pixabay.com/photo/2013/07/13/13/34/book-161117_1280.png" class="card-img-top img-fluid" alt="...">
                <h5 class="py-4 card-title">Title: ${book.title}</h5>
                <h6 class="card-title pb-4">Author: ${book.author_name}</h6>
                <h6 class="card-title">Publisher: ${book.publisher[0]}</h6>
                <h6 class="card-title">First Publish Year: ${book.first_publish_year}</h6>
            </div>
        `;
        }
        else {
            div.innerHTML = `
            <div class="shadow-lg p-3 m-5 rounded card-body h-500px">
                <img src="https://cdn.pixabay.com/photo/2013/07/13/13/34/book-161117_1280.png" class="card-img-top img-fluid" alt="...">
                <h5 class="py-4 card-title">Title: ${book.title}</h5>
                <h6 class="card-title pb-4">Author: ${book.author_name}</h6>
                <h6 class="card-title">Publisher: </h6>
                <h6 class="card-title">First Publish Year: ${book.first_publish_year}</h6>
            </div>
        `;
        }
        searchResult.appendChild(div);
    });
}

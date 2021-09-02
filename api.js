document.getElementById('error-message').style.display = 'none';

const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    console.log(searchText);

    if (searchText === '') {
        document.getElementById('error-message').style.display = 'block';
    }
    else {
        // for counting total result
        const url1 = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url1)
            .then(res => res.json())
            .then(data => countSearchResult(data.numFound, searchText))

        // for showing total result
        const url2 = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url2)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs))
    }
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
    console.log(books);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.classList.add('text-center');
        if (book.cover_i) {
            div.innerHTML = `
            <div class="shadow-lg p-3 m-5 rounded card-body h-500px">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" alt="...">
                <h5 class="py-4 card-title">Title: ${book.title}</h5>
                <h6 class="card-title">Author: ${book.author_name}</h6>
                <h6 class="card-title">First Publish Year: ${book.first_publish_year}</h6>
            </div>
        `;
        }
        else {
            div.innerHTML = `
            <div class="shadow-lg p-3 m-5 rounded card-body h-500px">
                <img src="https://cdn.pixabay.com/photo/2013/07/13/13/34/book-161117_1280.png" class="card-img-top img-fluid" alt="...">
                <h5 class="py-4 card-title">Title: ${book.title}</h5>
                <h6 class="card-title">Author: ${book.author_name}</h6>
                <h6 class="card-title">First Publish Year: ${book.first_publish_year}</h6>
            </div>
        `;
        }
        searchResult.appendChild(div);
    });
}

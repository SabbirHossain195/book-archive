const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    console.log(searchText);

    // document.getElementById('error-message').style.display = 'none';

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs))
    // .catch(error => displayError(error));




    /* if (searchText == '') {
        // please write something to display
    }
    else {
        // load data
        // const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
            .catch(error => displayError(error));
    } */

}




const displaySearchResult = books => {
    console.log(books);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.classList.add('text-center');
        div.innerHTML = `
            <div class="shadow-lg p-3 m-5 rounded card-body h-500px">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" alt="...">
                <h5 class="py-4 card-title">Title: ${book.title}</h5>
                <h6 class="card-title">Author: ${book.author_name}</h6>
                <h6 class="card-title">First Publish Year: ${book.first_publish_year}</h6>
            </div>
        `;
        searchResult.appendChild(div);
    });
}

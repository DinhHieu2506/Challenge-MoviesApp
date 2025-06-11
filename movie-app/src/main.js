const apiKey = '5a8937b5';
const keywords = ['man', 'woman', 'child', 'parent', 'family', 'friend', 'enemy', 'lover', 'husband', 'wife'];

const root = document.querySelector('.movie-list');
const searchInput = document.querySelector('#input');
const searchButton = document.querySelector('.search__button'); 

let keywordIndex = 0;
let isLoading = false;

async function fetchMovies(keyword, isNewSearch = false) {
    if (!keyword) return;
    if (isNewSearch) {
        root.innerHTML = '';
    }

    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(keyword)}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.Response === 'True') {
            data.Search.forEach((movie) => {
                if (
                    root.lastElementChild == null ||
                    root.lastElementChild.children.length >= 4
                ) {
                    const rowDiv = document.createElement('div');
                    rowDiv.classList.add('row');
                    root.appendChild(rowDiv);
                }

                const currentList = root.lastElementChild;

                const movieCard = `
          <div class="movie-list__card" data-imdbid="${movie.imdbID}">
            <div class="movie-list__poster">
              <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
            </div>
            <div class="movie-list__title">
              <h2>${movie.Title}</h2>
            </div>
            <div class="movie-list__footer">
              <div class="movie-list__release-year">
                <i class="fas fa-calendar-alt" style="color: #f6c700;"></i>
                <span>${movie.Year}</span>
              </div>
              <div class="movie-list__rating">🤍</div>
            </div>
          </div>
        `;
                currentList.insertAdjacentHTML('beforeend', movieCard);
            });
        } else {
            if (isNewSearch) {
                root.innerHTML = `<p class="error-message">No movies found for "${keyword}".</p>`;
            }
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

async function loadNextKeyword() {
    if (keywordIndex >= keywords.length) return;
    isLoading = true;
    await fetchMovies(keywords[keywordIndex], false);
    isLoading = false;
    keywordIndex++;
}

window.addEventListener('DOMContentLoaded', loadNextKeyword);

window.addEventListener('scroll', async () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (nearBottom && !isLoading) {
        await loadNextKeyword();
    }
});

searchButton.addEventListener('click', async () => {
    const keyword = searchInput.value.trim();
    if (keyword) {
        keywordIndex = 0; 
        await fetchMovies(keyword, true);
    }
});

root.addEventListener('click', (event) => {
    const card = event.target.closest('.movie-list__card');
    if (card) {
        const imdbId = card.getAttribute('data-imdbid');
        if (imdbId) {
        window.location.href = `detail.html?imdbID=${imdbId}`;
    }       
}
});

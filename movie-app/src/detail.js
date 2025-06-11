const params = new URLSearchParams(window.location.search);
const imdbID = params.get('imdbID');

if (imdbID) {
  fetch (`https://www.omdbapi.com/?i=${imdbID}&apikey=5a8937b5`)
    .then(response => response.json())
    .then(data => {
        createMovieHTML(data);
    });

}

function createMovieHTML(data) {
    const moviesDetail = document.querySelector('.movie-detail');
    moviesDetail .innerHTML = '';

    const posterDiv = document.createElement('div');
    posterDiv.className = 'movie-detail__poster';

    const posterImage = document.createElement('img');
    posterImage.src = data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450';
    posterImage.alt =`${data.Title} Poster` ;

     posterDiv.appendChild(posterImage);    

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('movie-detail__info');

    infoDiv.innerHTML = `
    <div class="movie-detail__container">
                <div class="movie-detail__title">
                    ${data.Title}
                </div>
                <div class="movie-detail__rating">
                    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 24 24"
                        color="#e4bb24" aria-hidden="true">
                        <path
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z">
                        </path>
                    </svg>
                    <div>
                        <div class="movie-detail__rating-container">

                       ${data.imdbRating}
                            <i>/10</i>
                        </div>
                        <div class="movie-detail__votes">
                           ${data.imdbVotes}
                        </div>
                    </div>
                </div>
            </div>

            <div class="movie-detail__subinfo">
                <div>${data.Year}</div>
                <div>${data.Rated}</div>
                <div>${data.Released}</div>
                <div>${data.Runtime}</div>
            </div>
            <div class="movie-detail__description">
                <p>
                    ${data.Plot}
                </p>
            </div>
            <hr class="movie-detail__divider">

            <div class="movie-detail__medata">
                <div class="movie-detail__medata-title">
                    <p>Genre:</p>
                </div>
                <div class="movie-detail__medata-value">
                    <p>${data.Genre}</p>
                </div>
            </div>
            <div class="movie-detail__medata">
                <div class="movie-detail__medata-title">
                    <p>Director:</p>
                </div>
                <div class="movie-detail__medata-value">
                    <p>${data.Director}</p>
                </div>
            </div>
            <div class="movie-detail__medata">
                <div class="movie-detail__medata-title">
                    <p>Writer :</p>
                </div>
                <div class="movie-detail__medata-value">
                    <p>${data.Writer}</p>
                </div>
            </div>
            <div class="movie-detail__medata">
                <div class="movie-detail__medata-title">
                    <p>Actors :</p>
                </div>
                <div class="movie-detail__medata-value">
                    <p>

                        ${data.Actors}</p>
                    </p>
                </div>
            </div>
            <div class="movie-detail__medata">
                <div class="movie-detail__medata-title">
                    <p>Language :</p>
                </div>
                <div class="movie-detail__medata-value">
                    <p>
                        ${data.Language}</p>
                </div>
            </div>
            <div class="movie-detail__medata">
                <div class="movie-detail__medata-title">
                    <p>Country :</p>
                </div>
                <div class="movie-detail__medata-value">
                    <p>${data.Country}</p>
                </div>
            </div>
            <div class="movie-detail__medata">
                <div class="movie-detail__medata-title">
                    <p>Awards :</p>
                </div>
                <div class="movie-detail__medata-value">
                    <p>${data.Awards}</p>
                </div>
            </div>
            <div class="movie-detail__medata">
                <div class="movie-detail__medata-title">
                    <p>Production :</p>
                </div>
                <div class="movie-detail__medata-value">
                    <p>${data.Production}</p>
                </div>
            </div>

    `;
    moviesDetail.appendChild(posterDiv);
    moviesDetail.appendChild(infoDiv);
}

document.querySelector('.navbar-detail__arrow').addEventListener('click', () => {
  window.location.href = 'index.html';
});

document.querySelector('.navbar-detail__logo').addEventListener('click', () => {
  window.location.href = 'index.html';
});
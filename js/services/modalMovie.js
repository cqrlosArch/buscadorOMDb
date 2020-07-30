import {getMovie} from './apiOMDb.js'

//Crea el modal con los detalles de la película selecionada
export const modalMovieActive = (movie,modalMovie) => {
    const $modalMovie = document.querySelector(modalMovie);
    const $listMovies = document.querySelectorAll(movie);
    const $fragment = document.createDocumentFragment();
    const $modalMovieContainer = document.createElement("DIV");
    $modalMovie.innerHTML = "";
  
    $listMovies.forEach((movie) => {
      document.addEventListener("click", async (e) => {
        e.preventDefault();
        if (e.target === movie) {
          const movie = await getMovie(e.target.dataset.imdb_id);
          $modalMovieContainer.classList.add("container__movie_modal");
          $modalMovieContainer.innerHTML = `
          
            <div class="info_modal">
          
              <h2>${movie.Title}</h2>
              <h3 class="year_movie">Year: [${movie.Year}]</h3>
              <h3>Director: ${movie.Director}</h3>
              <p class="country_movie"><strong>Country:</strong> ${movie.Country}</p>
              <p><strong>Actors:</strong> ${movie.Actors}</p>
              <p class="genre_movie"><strong>Genre:</strong> ${movie.Genre}</p>
              <small>imdbID: ${movie.imdbID}</small>
              <p class="argument_movie">${movie.Plot}</p>
            </div>
            <div class="img_modal">
            
              <img src="${
                movie.Poster !== "N/A" ? movie.Poster : "images/not_found.png"
              }" alt="${movie.imdbID}" class="img_movie">
              <h4>Rating: ${movie.imdbRating}</h4>
              
            </div>
            <span class="close_modal">&#10006;</span>
            `;
          $modalMovie.classList.add("active");
          $fragment.appendChild($modalMovieContainer);
          $modalMovie.appendChild($fragment);
          document.body.classList.add("modal-scroll");
          window.scroll(0, 50);
          closeModalMovie(".modal__movie",".close_modal");
        }
      });
    });
  };

//Cierra el modal
  export const closeModalMovie = (modalMovie,modalClose) => {
    const $modalMovie = document.querySelector(modalMovie);
    const $modalClose = document.querySelector(modalClose);
    document.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target === $modalClose) {
        $modalMovie.classList.remove("active");
        document.body.classList.remove("modal-scroll");
      }
    });
  };

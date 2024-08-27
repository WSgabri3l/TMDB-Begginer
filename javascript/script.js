//Variaveis

//Divs
const divMain = document.querySelector(".main-posters");
const divCard = document.querySelector(".card-content");

//Filtros
const linkPopularMovies = document.querySelector("#link-popular-movies");
const linkMostRatedMovies = document.querySelector("#link-most-rated-movies");
const linkNowPlayingMovies = document.querySelector("#link-now-playing-movies");
const linkSoonMovies = document.querySelector("#link-soon-movies");

const linkPopularSeries = document.querySelector("#link-popular-series");
const linkTopRatedSeries = document.querySelector("#link-top-rated-series");
const linkAiringTodaySeries = document.querySelector("#link-airing-today-series");
const linkOnTheAirSeries = document.querySelector("#link-on-the-air-series");

//Paginacao

var currentPage = "";

/*------------------------------------------------------------------------------------*/

//Configuracao da requisicao
const options = {
    method : "GET",
    headers : {
        accept : "application/json",
        Authorization : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmM1ZjlkZjc1MTRlZTMyODlhYTY2YTQ3ZmM4NGI3MCIsInN1YiI6IjY2M2FiZjliZDAyNGMyOWRhNWQ3NDRkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qcU4TUx0-6C8kiOumkR8myE8t9KHHSe5kNly5vBfBh4"
    }
};

/*------------------------------------------------------------------------------------*/

//Chamadas de Funcao
displayPopularMovies("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1")

/*------------------------------------------------------------------------------------*/

//Funcoes
async function displayPopularMovies(link){

    try{
        const response = await fetch(link, options)

        if (!response.ok) {
            throw new Error("A Busca falhou...");
        };

        const data = await response.json();
        const listPopularMovies = data.results;

        //Dados

        for (let index = 0; index < listPopularMovies.length; index++) {
            
            //Divs
            let movieCard = document.createElement("div");
            movieCard.className = "card";

            let movieCardContent = document.createElement("div")
            movieCardContent.className = "card-content";

            let movieInfoCard = document.createElement("div");
            movieInfoCard.className = "card-content-text";

            //Elementos
            let moviePosterEle = document.createElement("img");
            moviePosterEle.id = "popular-poster";
            moviePosterEle.src = "https://image.tmdb.org/t/p/original/" + listPopularMovies[index].poster_path;

            let movieTitleEle = document.createElement("h2");
            movieTitleEle.id = "popular-title";

            if (link.match("tv")) {

                movieTitleEle.textContent = listPopularMovies[index].original_name;
                
            } else {

                movieTitleEle.textContent = listPopularMovies[index].title;

            }
            
            //Adicionando as Divs

            movieInfoCard.appendChild(movieTitleEle);

            movieCardContent.appendChild(moviePosterEle);
            movieCardContent.appendChild(movieInfoCard);

            movieCard.appendChild(movieCardContent);

            divMain.appendChild(movieCard);

/* ------------------------------------------------------------------------------------------------------------------ */

            movieCardContent.addEventListener("click", (event) =>{

                console.log("I was clicked. Stop it, you perv. HUNF!")

                saveInformations(link, listPopularMovies[index])

                window.location.href = "more.html";

            });

/* ------------------------------------------------------------------------------------------------------------------ */

        }

/* ------------------------------------------------------------------------------------------------------------------ */

        currentPage = link.slice(0, -1);
        sessionStorage.setItem("currentPage", currentPage);

/* ------------------------------------------------------------------------------------------------------------------ */
    }

    catch(error){
        console.error(error)
    }
}

function changeLink(link, page) {

    link = link + page.toString();
    sessionStorage.setItem("currentPage", link);
    
};

function saveInformations(link, index) {

    let imagePath = "https://image.tmdb.org/t/p/original/" + index.poster_path;

    sessionStorage.setItem("poster", imagePath);

    let releaseDate = ""

    if (link.match("tv")) {

        sessionStorage.setItem("title", index.original_name);

        releaseDate = index.first_air_date;
        releaseDate = releaseDate.slice(0, 4);
        releaseDate = "(" + releaseDate + ")";
        
    } else {

        sessionStorage.setItem("title", index.title);

        
        releaseDate = index.release_date;
        releaseDate = releaseDate.slice(0, 4);
        releaseDate = "(" + releaseDate + ")";


    };

    sessionStorage.setItem("year", releaseDate);

    sessionStorage.setItem("overview", index.overview);

    sessionStorage.setItem("genres_ids", index.genre_ids);

    voteAverage = parseFloat(index.vote_average);
    voteAverage = voteAverage * 10;
    voteAverage = parseInt(voteAverage);

    sessionStorage.setItem("vote_average", voteAverage);

    sessionStorage.setItem("id", index.id);

    //Teste
    console.log(sessionStorage.getItem("title"));
    console.log(sessionStorage.getItem("poster"));
    console.log(sessionStorage.getItem("year"));
    console.log(sessionStorage.getItem("overview"));
    console.log(sessionStorage.getItem("vote_average"));
    console.log(sessionStorage.getItem("id"));

};
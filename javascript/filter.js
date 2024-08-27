//Filmes
makeFilter(linkPopularMovies, "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1");
makeFilter(linkMostRatedMovies, "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1");
makeFilter(linkNowPlayingMovies, "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1");
makeFilter(linkSoonMovies, "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1");

//Series
makeFilter(linkPopularSeries, "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1");
makeFilter(linkTopRatedSeries, "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1");
makeFilter(linkAiringTodaySeries, "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1");
makeFilter(linkOnTheAirSeries, "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1");

function makeFilter(filter, link) {

    filter.addEventListener("click", (event) =>{

        divMain.innerHTML = "";
        returnOne();
        displayPopularMovies(link);

    });
};
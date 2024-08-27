const imageField = document.querySelector("#poster-image");
const titleField = document.querySelector("#details-title-field");
const yearField = document.querySelector("#details-year-field");
const overviewField = document.querySelector("#details-overview-field");
const genresField = document.querySelector(".details-header-genres-list");
const videoField = document.querySelector("#video-id");

/*------------------------------------------------------------------------------------*/

const options = {
    method : "GET",
    headers : {
        accept : "application/json",
        Authorization : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmM1ZjlkZjc1MTRlZTMyODlhYTY2YTQ3ZmM4NGI3MCIsInN1YiI6IjY2M2FiZjliZDAyNGMyOWRhNWQ3NDRkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qcU4TUx0-6C8kiOumkR8myE8t9KHHSe5kNly5vBfBh4"
    }
};

/*------------------------------------------------------------------------------------*/

const genres = sessionStorage.getItem("genres_ids");
const genresLink = "https://api.themoviedb.org/3/genre/movie/list?language=en";

var genresTreated = stringTreatment(genres);

/*------------------------------------------------------------------------------------*/

window.onload = () => {

    displayPage();

    displayGenres(genresLink, options, genresTreated, genresField);

    goAhead(sessionStorage.getItem("vote_average"), "circle-progress", "number-progress");

    loadTrailer(options, sessionStorage.getItem("id"), videoField);

}

/*------------------------------------------------------------------------------------*/

function displayPage() {

    imageField.src = sessionStorage.getItem("poster");
    titleField.textContent = sessionStorage.getItem("title");
    yearField.textContent = sessionStorage.getItem("year");
    overviewField.textContent = sessionStorage.getItem("overview");

}

async function displayGenres(link, options, genres, field) {

    try {
        
        const response = await fetch(link, options);

        if (!response.ok) {
            throw new Error("A Busca falhou...");
        };

        const data = await response.json();
        const genresList = data.genres;

        let list = [];

        for (let index = 0; index < genres.length; index++) {

            let number = 0;

            number = genres[index];
            
            for (let index = 0; index < genresList.length; index++) {
                
                if (genresList[index].id == number) {

                    list.push(genresList[index].name)
                    
                };    
            };
        };

/*------------------------------------------------------------------------------------*/

        for (let index = 0; index < list.length; index++) {
            
            let liGenre = document.createElement("li")
            liGenre.textContent = list[index]

            field.appendChild(liGenre);
            
        }

/*------------------------------------------------------------------------------------*/

    }

    catch(error){

        console.error(error)

    }; 
    
};

/*------------------------------------------------------------------------------------*/

function stringTreatment(string) {

    let list = [];
    let numbericList = [];
    let number = "";

    for (let index = 0; index < string.length; index++) {

        number = number + string[index];

        if (string[index] == ",") {

            number = number.slice(0, -1);
            
            list.push(number);

            number = ""
            
        }

    }

    for (let index = 0; index < list.length; index++) {

        numbericList.push(parseInt(list[index]));
        
    }

    return numbericList;
    
}

/*------------------------------------------------------------------------------------*/

function goAhead(value, circle_id, number_id) {

    let id_1 = "#" + circle_id;
    const circle = document.querySelector(id_1);
    
    let id_2 = "#" + number_id;
    document.querySelector(id_2).textContent = value + "%";

    circle.style.strokeDashoffset = 440 - (440 * value) / 100;
}

/*------------------------------------------------------------------------------------*/

var string = "https://www.youtube.com/watch?v=";

async function loadTrailer(options, movie_id, video_field) {

    try {

        video_field.src = "";

        var link = "https://api.themoviedb.org/3/movie/" + movie_id + "/videos?language=en-US";
        
        const response = await fetch(link, options);

        if (!response.ok) {
            throw new Error("A Busca falhou...");
        };

        const data = await response.json();
        const video = data.results;

        var youtubeLink = "https://www.youtube.com/embed/" + video[0].key;

        video_field.src = youtubeLink;
    }

    catch(error){

        console.error(error)

    }; 
};
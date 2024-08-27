let nums = document.querySelectorAll(".nums")
let currentValue = 1;

function returnOne(){

    for(number of nums){

        number.classList.remove("active");

        if (number.value == 1) {

            console.log(number.value)
    
            number.classList.add("active");
            currentValue = number.value;
            
        }

    }

}

function changeNume(){

    for(number of nums){

        number.classList.remove("active");

    }

    event.target.classList.add("active");
    currentValue = event.target.value;

    divMain.innerHTML = "";

    changeLink(sessionStorage.getItem("currentPage"), currentValue);
    displayPopularMovies(sessionStorage.getItem("currentPage"));
    window.location.href = "#"
}

function previousButton(){

    if (currentValue > 1){

        for(number of nums){

            number.classList.remove("active");
    
        }

        currentValue = currentValue - 1;
        nums[currentValue - 1].classList.add("active");

        divMain.innerHTML = "";

        changeLink(sessionStorage.getItem("currentPage"), currentValue);
        displayPopularMovies(sessionStorage.getItem("currentPage"));
        window.location.href = "#"
    }
}

function nextButton(){

    if (currentValue < 9){

        for(number of nums){

            number.classList.remove("active");
    
        }

        currentValue = currentValue + 1;
        nums[currentValue - 1].classList.add("active");

        divMain.innerHTML = "";

        changeLink(sessionStorage.getItem("currentPage"), currentValue);
        displayPopularMovies(sessionStorage.getItem("currentPage"));
        window.location.href = "#"
    }
}
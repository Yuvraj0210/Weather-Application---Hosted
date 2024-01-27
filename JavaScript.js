//Weather App

const weatherForm = document.querySelector(".weatherForm");    //we can also use querySelectorAll in all these cases
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "1c3c79a710965250dd72455ec7f573f1";

weatherForm.addEventListener("submit", async event => {
    //when we submit, forms have a default behaviour that they refresh the page using below thing
    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city name");
    }
});


/*
Async Function Declaration:
The async keyword is used to declare an asynchronous function. 
An asynchronous function returns a promise implicitly and allows the use of the await keyword within the function body. 
The await keyword is used to wait for a promise to resolve or reject before moving on to the next line of code. 
Async functions make it easier to work with asynchronous code in a more synchronous-like manner, making the code more readable and maintainable.

Example of an async function:

async function fetchData() {
Asynchronous operation, e.g., fetching data from an API
let response = await fetch('https://example.com/data');
let data = await response.json();
console.log(data);
}

// Call the async function
fetchData();
In the example above, fetchData is an async function that fetches data from a URL using the fetch API. The await keyword is used to wait for the asynchronous operations to complete.*/

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

//data of JSON type format
function displayWeatherInfo(data){
    const {name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]} =data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity : ${(humidity)}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    humidityDisplay.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);


}


function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    /*In JavaScript, errorDisplay.classList.add("errorDisplay") is code that is used to add a CSS class to an HTML element. 
    Let's break it down:
    errorDisplay: This likely refers to an HTML element, presumably obtained from the DOM (Document Object Model) using JavaScript. 
    It could be something like document.getElementById("errorDisplay") or another method to select an element.
    classList: This is a property of DOM elements that represents the classes of an element. 
    It provides methods to add, remove, toggle, and check for the presence of CSS classes on the element.
    add("errorDisplay"): This is a method of the classList property that is used to add a CSS class to the element. 
    In this case, the class being added is "errorDisplay". 
    This means that after this line of code is executed, 
    the HTML element referred to by errorDisplay will have the "errorDisplay" class applied to it.*/
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}




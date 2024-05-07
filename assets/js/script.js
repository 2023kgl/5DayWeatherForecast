const searchbtn = document.getElementById('searchbtn');
const searchinput = document.getElementById('searchinput');
const savedsearch = document.getElementById('savedsearch');
const todaysforecast = $('#todaysforecast');
const weathericon = $('#weathericon');
const fiveday = $('#fiveday')



document.addEventListener('DOMContentLoaded', function() {

function getApi() {

    const city = searchinput.value

    const apiKey = "422ac8d03f3e4abcd01a15a453bd7b43";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(url)
    .then(response => {
        if (!response.ok){
            throw response.json()
        }
        return response.json()
    })
    .then(data => {
        console.log(data);
        displayToday(data) 
        getFiveDayForecast(data)
    })
    .catch(function(error){
        console.error('Error', error)
    })
}  

$('#searchbtn').on('click',function(event){
    event.preventDefault();
    getApi();
    saveSearchedCities();
    savedSearch();
    searchinput.value = ''
})
})

// save searched cities to local storage        

function saveSearchedCities(){

    // retrieving data from the brower's local storage with key "cityData", then parsing from JSON format to JS object. If no data stored in key, it assings an empty array to cityList
    let cityList = JSON.parse(localStorage.getItem('cityData')) || [];

    // this is taking the input value and calling it city
    const city = searchinput.value;

    // this is adding the city to the cityList
    cityList.push(city);

    // this is saving the added city to the cityList in localStorage under key "cityData"
    localStorage.setItem('cityData', JSON.stringify(cityList))

}

// logic for displaying todays forecast
function displayToday(data){

    document.querySelector('#city').innerHTML = "CITY: " + data.city.name;
    document.querySelector('#date').innerHTML = "DATE: " + data.list[0].dt_txt;
    document.querySelector('#icon').innerHTML = data.list[0].weather[0].main;
    document.querySelector('#temp').innerHTML = "TEMPERATURE: " + Math.round(data.list[0].main.temp) + "°";
    document.querySelector('#humidity').innerHTML = "HUMIDITY: " + data.list[0].main.humidity + "%";
    document.querySelector('#wind').innerHTML = "WIND SPEED: " + data.list[0].wind.speed;
}

// display 5 day forecast

function getFiveDayForecast(data){

    fiveday.empty()

    while (data.list.length >= 8) {

        let dayData = data.list.splice(0,8)

        let day = dayData[0]

        let dayCard = $('<div>').addClass('card text-dark bg-light mb-3')
        dayCard.css('max-width', '50%')
        dayCard.appendTo(fiveday)

        let city = $('<div>').addClass('card-header').text('City: ' + data.city.name)
        city.appendTo(dayCard)

        let cardBody = $('<div>').addClass('card-body')
        cardBody.appendTo(dayCard)

        let date = $('<h5>').addClass('card-title').text('Date: ' + day.dt_txt)
        date.appendTo(cardBody)

        let icon = $('<icon>').addClass('card-text').text(day.weather[0].main)
        icon.appendTo(cardBody)

        let temp = $('<p>').addClass('card-text').text('Temperature: ' + day.main.temp + "°")
        temp.appendTo(cardBody)

        let humidity = $('<p>').addClass('card-text').text('Humidity: ' + day.main.humidity + "%")
        humidity.appendTo(cardBody)

        let wind = $('<p>').addClass('card-text').text("WIND SPEED:  " + day.wind.speed)
        wind.appendTo(cardBody)

    }
}

// logic to display as link button searched cities history
function savedSearch(){

    let cityList = JSON.parse(localStorage.getItem('cityData'))
    const savedSearch = $('#savedsearch')

    savedSearch.empty()

    for (let i=0; i<cityList.length; i++){
        let cityButton = $('<button>').attr('value', cityList[i]).text(cityList[i]).addClass('btn btn-light btn-hover-bg-shade-amount:15%')
        cityButton.appendTo(savedSearch);
        
// button not working .... devtools console says "getApi not defined"
        cityButton.on('click', function (){
            let city = cityButton.val()
            getApi(city)
        })
    }
}


$(document).ready( function () {
    savedSearch()
})
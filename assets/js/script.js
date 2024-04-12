const searchbtn = document.getElementById('searchbtn');
const searchinput = document.getElementById('searchinput');
// const savedsearch = document.getElementById('savedsearch');
let cityList = JSON.parse(localStorage.getItem('cityData')) || [];
const todaysforecast = $('#todaysforecast');
const weathericon = $('#weathericon');



document.addEventListener('DOMContentLoaded', function() {

function getApi() {

    const city = searchinput.value;
    cityList.push(city);
    // cityList.JSON.stringify(localStorage.setItem(city))

    const apiKey = "422ac8d03f3e4abcd01a15a453bd7b43";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(url)
    .then(function (response) {
        // console.log(response);
      return response.json();
    })
    .then(function(data){
        console.log(data);
          // handle received date here. display on to todays forecast and display 5 forecast which need to be saved to LS and add to search history seciton (buttons)
        // call display today and call saved search

        // var date = dayjs().format('MM/DD/YYYY');

        let city = data.city.name;
        let date = data.list[0].dt;
        let temp = Math.round(data.list[0].main.temp);
        let humidity = data.list[0].main.humidity;

        document.querySelector('#city').innerHTML = "CITY: " + data.city.name;
        document.querySelector('#date').innerHTML = "DATE: " + data.list[0].dt;
        document.querySelector('#temp').innerHTML = "TEMPERATURE: " + Math.round(data.list[0].main.temp) + "°";
        document.querySelector('#humidity').innerHTML = "HUMIDITY: " + data.list[0].main.humidity + "%";


        // if(data.list[0].weather[0].main == "Clouds"){
        //     weathericon.src = "5DayWeatherForecast/assets/images/clouds.png";
        // }else if (data.list[0].weather[0].main == "Clear"){
        // weathericon.src = "5DayWeatherForecast/assets/images/clear.png";
        // }else if (data.list[0].weather[0].main == "Drizzle"){
        // weathericon.src = "5DayWeatherForecast/assets/images/drizzle.png";
        // }else if (data.list[0].weather[0].main == "Snow"){
        // weathericon.src = "5DayWeatherForecast/assets/images/Snow.png";
        // }else if (data.list[0].weather[0].main == "Wind"){
        // weathericon.src = "5DayWeatherForecast/assets/images/Wind.png";
        // }

        console.log(date);
        console.log(city);
        console.log(temp);
        console.log(humidity);

        for(let i=0; i<data.list.length; i+=8){
            const dayData = data.list[i];
            displayFiveDays(dayData)
        }

    })
    .catch(function(error){
        console.error('Error', error)
    })

    localStorage.setItem('cityData', JSON.stringify(cityList));
}

$('#searchbtn').on('click', function(event){
    event.preventDefault();
    const searchinput = $('#searchinput').val();
    getApi(searchinput);

})

})

// logic for displaying todays forecast
function displayToday(){

    // document.querySelector('#city').innerHTML = "CITY: " + data.city.name;
    // document.querySelector('#date').innerHTML = "DATE: " + data.list[0].dt;
    // document.querySelector('#temp').innerHTML = "TEMPERATURE: " + Math.round(data.list[0].main.temp) + "°";
    // document.querySelector('#humidity').innerHTML = "HUMIDITY: " + data.list[0].main.humidity + "%";
   

}

// logic for displaying 5 day forecast
function displayFiveDays(){

 let dayCard = document.createElement("div");
 dayCard.className = "card"

 let dayCardContent = document.createElement("div");
 dayCardContent.className = "da"

}

// logic for saving and display as link button searched cities history
function savedSearch(){

// let cityList = JSON.parse(localStorage.getItem('city'))

// cityList.forEach(function(city) {

//     const fiveday = $('#fiveday')
//     newButtonLink.createElement("button")
//     newButtonLink.appendTo(fiveday)

//     let newButtonLink = $('<a>').addClass('btn btn-primary" href="#" role="button').text(searchinput);
//     let removeX = $('<a>').addClass('btn btn-outline-danger');
//     removeX.appendTo(newButtonLink)
    
// });


}

$(document).ready(function (){
    displayToday();
    displayFiveDays()
    savedSearch();
}

)
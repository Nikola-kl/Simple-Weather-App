
const apiKey = "063f2b3b63046559077e687d61c0bad6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiGeoCoord = "http://api.openweathermap.org/geo/1.0/reverse?limit=5";

const searchBox = document.querySelector('.inputFieldBox input');
const searchBtn = document.querySelector('.inputFieldBox button');
const weatherIcon = document.querySelector('.weather-icon');

const cityName = document.querySelector('.city');
const temp = document.querySelector('.temp');
const wind = document.querySelector('.wind-text')
const humidity = document.querySelector('.humidity-text')


let data;

// window.addEventListener('resize', handleScreenSizeChange);

function handleScreenSizeChange() {
    const screenWidth = window.innerWidth;
    const video = document.querySelector("video");

    console.log(data)
    if (screenWidth < 890) {
        if(!data){
            video.src = "videos/clear9x16.mp4"
        }
        return 'small';
    } else {
        if(!data){
            video.src = "videos/clear.mp4"
        }
        return 'large';
    }
}

const matchResult = handleScreenSizeChange();
// DETECT FOR SCREEN SIZE



searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value,matchResult);
})
searchBox.addEventListener('keydown', (e) => {

    if(e?.code === "Enter"){
        checkWeather(searchBox.value,matchResult);
    }
})

// Geolocation
const successCallback = async (position) => {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);

    const geoLocationData = await fetch(`${apiGeoCoord}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
    const retrievedLocationData = await geoLocationData.json();
    const city = retrievedLocationData?.[0]?.name?.replace("City of ", "");
    console.log(retrievedLocationData);

    if (city) {
        checkWeather(city);
    } else {
        console.log('City not found');
    }
}

const errorCallback = (error) => {
    console.log(error);
    alert('Error, location denied.')
}


navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

// const geoId = navigator.geolocation.watchPosition(successCallback, errorCallback);
// 

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    data = await response.json();

    console.log(data);

    cityName.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + '°C';
    wind.innerHTML = data.wind.speed + ' km/h';
    humidity.innerHTML = data.main.humidity + '%';
    

    
    // we are making it a bit more readable, instead of having data.weather[0], we use weather or weatherData
    const weatherData = data.weather[0];
    document.querySelector('.weather-condition').innerHTML = weatherData.description

    // switch (weatherData.main) {
    //     case 'Clouds':
    //         weatherIcon.src = 'img/clouds.png';
    //         video.src = 'videos/clouds.mp4';
    //         break;
    //     case 'Clear':
    //         weatherIcon.src = 'img/clear.png';
    //         video.src = 'videos/clear.mp4';
    //         break;
    //     case 'Drizzle':
    //         weatherIcon.src = 'img/drizzle.png';
    //         video.src = 'videos/drizzle.mp4';
    //         break;
    //     case 'Mist':
    //         weatherIcon.src = 'img/mist.png';
    //         video.src = 'videos/mist.mp4';
    //         break;
    //     case 'Rain':
    //         weatherIcon.src = 'img/rain.png';
    //         video.src = 'videos/rain.mp4';
    //         break;
    //     case 'Snow':
    //         weatherIcon.src = 'img/snow.png';
    //         video.src = 'videos/snow.mp4';
    //         break;
    //     case 'Thunderstorm':
    //         weatherIcon.src = 'img/thunderstorm.png';
    //         video.src = 'videos/thunderstorm.mp4';
    //         break;
    //     default:
    //         weatherIcon.src = 'img/clear.png';
    //         video.src = 'videos/clear.mp4';
    // }


    // SAME FUNCTION BUT WRITTEN IN IF ELSE CHAIN 
    const screenSize = handleScreenSizeChange();
    updateWeatherDisplay(screenSize);
    return; 

    // CODE FOR ADDING ANOTHER IMG IF THERE IS MORE THAN 1 DATA AVAILABLE

    for (let i = 0; i < data.weather.length; i++) {
        const img = new Image(200, 200);
        
    if (data.weather[i].main == 'Clouds') {
        document.querySelector('.weather-icon').src='img/clouds.png';
        img.src = 'img/clouds.png';
    } else if (data.weather[i].main == 'Clear') {
        document.querySelector('.weather-icon').src='img/clear.png';
        img.src = 'img/clear.png';
    } else if (data.weather[i].main == 'Drizzle') {
        document.querySelector('.weather-icon').src='img/drizzle.png';
        img.src = 'img/drizzle.png';
    } else if (data.weather[i].main == 'Mist') {
        document.querySelector('.weather-icon').src='img/mist.png';
        img.src = 'img/mist.png';
    } else if (data.weather[i].main == 'Rain') {
        document.querySelector('.weather-icon').src='img/rain.png';
        img.src = 'img/rain.png';
    } else if (data.weather[i].main == 'Snow') {
        document.querySelector('.weather-icon').src='img/snow.png';
        img.src = 'img/snow.png';
    } else if (data.weather[i].main == 'Thunderstorm') {
        document.querySelector('.weather-icon').src='img/thunderstorm.png';
        img.src = 'img/thunderstorm.png';
    }
    temperatureBox.appendChild(img);
  }
}

function updateWeatherDisplay(matchResult) {
    // checkWeather(cityName, matchResult)
    console.log(data);
    const weatherData = data.weather[0];
    const weatherIcon = document.querySelector('.weather-icon')
    const video = document.querySelector("video");
    
    if (weatherData.main == 'Clouds') {
        if (matchResult === 'small') {
            weatherIcon.src = 'img/clouds.png';
            video.src = 'videos/clouds9x16.mp4';
        } else {
        weatherIcon.src = 'img/clouds.png';
        video.src = 'videos/clouds.mp4';
        }
    } else if (weatherData.main == 'Clear') {
        if (matchResult === 'small') {
            weatherIcon.src = 'img/clear.png';
            video.src = 'videos/clear9x16.mp4';
        } else {
        weatherIcon.src = 'img/clear.png';
        video.src = 'videos/clear.mp4';
        }
    } else if (weatherData.main == 'Drizzle') {
        if (matchResult === 'small') {
            weatherIcon.src = 'img/drizzle.png';
            video.src = 'videos/drizzle9x16.mp4';
        } else {
        weatherIcon.src = 'img/drizzle.png';
        video.src = 'videos/drizzle.mp4';
        }
    } else if (weatherData.main == 'Mist') {
        if (matchResult === 'small') {
            weatherIcon.src = 'img/mist.png';
            video.src = 'videos/mist9x16.mp4';
        } else {
        weatherIcon.src = 'img/mist.png';
        video.src = 'videos/mist.mp4';
        }
    } else if (weatherData.main == 'Rain') {
        if (matchResult === 'small') {
            weatherIcon.src = 'img/rain.png';
            video.src = 'videos/rain9x16.mp4';
        } else {
        weatherIcon.src = 'img/rain.png';
        video.src = 'videos/rain.mp4';
        }
    } else if (weatherData.main == 'Snow') {
        if (matchResult === 'small') {
            weatherIcon.src = 'img/snow.png';
            video.src = 'videos/snow9x16.mp4';
        } else {
        weatherIcon.src = 'img/snow.png';
        video.src = 'videos/snow.mp4';
        }
    } else if (weatherData.main == 'Thunderstorm') {
        if (matchResult === 'small') {
            weatherIcon.src = 'img/thunderstorm.png';
            video.src = 'videos/thunderstorm9x16.mp4';
        } else {
        weatherIcon.src = 'img/thunderstorm.png';
        video.src = 'videos/thunderstorm.mp4';
        }
    }
}

window.addEventListener('resize', function () {
    const screenSize = handleScreenSizeChange();
    updateWeatherDisplay(screenSize);
});

const initialScreenSize = handleScreenSizeChange();




// (function() {
//     // your page initialization code here
//     // the DOM will be available here
    
//  })();



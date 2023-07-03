
const apiKey = "063f2b3b63046559077e687d61c0bad6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=madrid";

console.log('munem');
async function checkWeather() {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    let data = await response.json();

    console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = data.main.temp;
    
}





(function() {
    // your page initialization code here
    // the DOM will be available here
    checkWeather()
 })();
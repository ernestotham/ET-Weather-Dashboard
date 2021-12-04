var key = "44671112649d707f9ee751ddd2e40f1f"
var weathercast;


function getWeather(city){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+key+'&units=imperial&lang=en&mode=json', requestOptions)
        .then(response => response.text())
        .then(result => console.log(JSON.parse(result))
        )
        .catch(error => console.log('error', error));
      
}


function getForcastbyLatitude(lat, lon){
  
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
     fetch('http://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid='+key+'&units=imperial', requestOptions)
     .then((response) => {
         return response.json()})
     .then((responseData) => {
        weathercast = responseData
       console.log(responseData);
       return responseData;
     })
     .catch(error => console.warn(error));
   }
   


function convertUniUTCtoLocal(unixutc){

    var date = new Date(unixutc * 1000);

    // console.log((date.toLocaleString().split(","))[0])
    return (date.toLocaleString().split(","))[0]
}


function loadForcast(){

forcastCount = 0
while(forcastCount < 6){

console.log(convertUniUTCtoLocal(weathercast.daily[forcastCount].dt))
console.log(weathercast.daily[forcastCount].temp.day)
console.log(weathercast.daily[forcastCount].wind_speed)
console.log(weathercast.daily[forcastCount].humidity)
console.log(weathercast.daily[forcastCount].uvi)
console.log(weathercast.daily[forcastCount].weather[0].icon)
console.log('icon url: http://openweathermap.org/img/w/'+weathercast.daily[forcastCount].weather[0].icon+'.png')
console.log(forcastCount)
forcastCount++;

}

}
var key = "44671112649d707f9ee751ddd2e40f1f"
var weathercast;
var cord;
var eventBtn





function getWeather(city){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+key+'&units=imperial&lang=en&mode=json', requestOptions)
        .then(response => {return response.json()})
        .then(result => {
            cord = result
            console.log(result);

            getForcastbyLatitude(cord.coord.lat, cord.coord.lon)


            return cord
            }
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
        displayResults()
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



}//End While loop

}//End loadForcast function



function displayResults() {

    
    var hiddenEls = document.querySelectorAll('.d-none')
    var Fordcastday0 =$('#Fday')
  

    console.log(weathercast)

    for(i=0; i < weathercast.daily.length;i++){

        if(i >0){
        console.log("date "+ convertUniUTCtoLocal(weathercast.daily[i].dt) )
        console.log("icon "+ weathercast.daily[i].weather[0].icon)
        console.log("temp "+ weathercast.daily[i].temp.day)
        console.log("wind "+ weathercast.daily[i].wind_speed)
        console.log("humidity "+ weathercast.daily[i].humidity)
        $('#Fday'.concat(i)).children().remove()
        $('#Fday'.concat(i)).append('<h1 class="text-start" id="Fday1date">'+convertUniUTCtoLocal(weathercast.daily[i].dt)+'</h1><img src="http://openweathermap.org/img/w/'+weathercast.daily[i].weather[0].icon+'.png" alt="img.jpg"><h3 class="text-start" id="Fday1">Temp: '+weathercast.daily[i].temp.day+' F</h3><h3 class="text-start" id="Fday1">Wind: '+weathercast.daily[i].wind_speed+' MPH</h3><h3 class="text-start" id="Fday1">Humidity: '+weathercast.daily[i].humidity+' %</h3>')
        }

        if(i===0){
        console.log("city: "+cord.name + " date "+ convertUniUTCtoLocal(weathercast.daily[i].dt) +" icon "+weathercast.daily[i].weather[0].icon )
        console.log("temp "+ weathercast.daily[i].temp.day)
        console.log("wind "+ weathercast.daily[i].wind_speed)
        console.log("humidity "+ weathercast.daily[i].humidity)
        console.log("UV Index "+ weathercast.daily[i].uvi)
        Fordcastday0.children().remove()
        Fordcastday0.append('<h1 class="text-start" id="Fday">'+cord.name+" "+convertUniUTCtoLocal(weathercast.daily[i].dt)+'<img src="http://openweathermap.org/img/w/'+weathercast.daily[i].weather[0].icon+'.png" alt="img.jpg"></h1><h3 class="text-start" id="Fday">Temp: '+weathercast.daily[i].temp.day+' F</h3><h3 class="text-start" id="Fday">Wind: '+weathercast.daily[i].wind_speed+' MPH</h3><h3 class="text-start" id="Fday">Humidity: '+weathercast.daily[i].humidity+' %</h3><h3 class="text-start" id="Fday">UV Index: '+weathercast.daily[i].uvi+' </h3>')


        }

        else{console.log("missing something")}



        

    }

    var cachedBtn = $('#cachedBtn').append('<button class="btn btn-light p-1 w-100 gap-3 bg-secondary max-height:10px" id="newbtn"  from-control-lg>'+cord.name+'</button>')

    for(i=0; i < hiddenEls.length; i++){
        hiddenEls[i].classList.remove('d-none')
    }



}

//Event Listeners



var SerchBtnEl = document.getElementById('searchBtn')
var SearchTB = document.getElementById('lblcity')
console.log(SearchTB.value)

SerchBtnEl.addEventListener('click', function(event) {

    eventBtn =event
    console.log(event)
    
    
    if(SearchTB.value !== ""){

        getWeather(SearchTB.value)
        
    }
    
   
 
    
})

// $('#searchBtn button').on('click', 'button', function() {

//     console.log(this)
//     eventBtn = this

    // var buttonid = $( this ).attr('id')


// console.log( buttonid );
// console.log("textarea#".concat(buttonid))
// console.log( $("textarea#".concat(buttonid)).val())
// // console.log( $('\'textarea#'+buttonid+'\'' ).val())
// appendToLocalStorage(buttonid,$("textarea#".concat(buttonid)).val())

// });

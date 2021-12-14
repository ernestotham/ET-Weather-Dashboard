var key = "44671112649d707f9ee751ddd2e40f1f"
var weathercast;
var cord;
var eventBtn
var hiddenEls = document.querySelectorAll('.d-none')

//event listener for loading selected cached weather for city (previous search - buttons)
function cacheBtn(){

    $("button#newbutton").on("click", function(){

        console.log(this.innerText)
        weathercast = retrieveContent(this.innerText.concat('w').toUpperCase())
        cord = retrieveContent(this.innerText.concat('c').toUpperCase())
        load()
    
    })

}


//gets data from api
function getWeather(city){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+key+'&units=imperial&lang=en&mode=json', requestOptions)
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



//gets data from api by latitude and longitude for the forcast
function getForcastbyLatitude(lat, lon){
  
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
     fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid='+key+'&units=imperial', requestOptions)
     .then((response) => {
         return response.json()})
     .then((responseData) => {
        weathercast = responseData
        displayResults()
        cacheBtn()
       console.log(responseData);


       return responseData;
     })
     .catch(error => console.warn(error));
   }
   

//coverts unix UTC time to local time
function convertUniUTCtoLocal(unixutc){

    var date = new Date(unixutc * 1000);

    // console.log((date.toLocaleString().split(","))[0])
    return (date.toLocaleString().split(","))[0]
}

//loads data in the html page
function load(){
    
    var Fordcastday0 =$('#Fday')
  

    // console.log(weathercast)

    for(i=0; i < weathercast.daily.length;i++){

        if(i >0){
        // console.log("date "+ convertUniUTCtoLocal(weathercast.daily[i].dt) )
        // console.log("icon "+ weathercast.daily[i].weather[0].icon)
        // console.log("temp "+ weathercast.daily[i].temp.day)
        // console.log("wind "+ weathercast.daily[i].wind_speed)
        // console.log("humidity "+ weathercast.daily[i].humidity)
        $('#Fday'.concat(i)).children().remove()
        $('#Fday'.concat(i)).append('<h1 class="text-start" id="Fday1date">'+convertUniUTCtoLocal(weathercast.daily[i].dt)+'</h1><img src="http://openweathermap.org/img/w/'+weathercast.daily[i].weather[0].icon+'.png" alt="img.jpg"><h3 class="text-start" id="Fday1">Temp: '+weathercast.daily[i].temp.day+' F</h3><h3 class="text-start" id="Fday1">Wind: '+weathercast.daily[i].wind_speed+' MPH</h3><h3 class="text-start" id="Fday1">Humidity: '+weathercast.daily[i].humidity+'%</h3>')
        }

        if(i===0){
        // console.log("city: "+cord.name + " date "+ convertUniUTCtoLocal(weathercast.daily[i].dt) +" icon "+weathercast.daily[i].weather[0].icon )
        // console.log("temp "+ weathercast.daily[i].temp.day)
        // console.log("wind "+ weathercast.daily[i].wind_speed)
        // console.log("humidity "+ weathercast.daily[i].humidity)
        // console.log("UV Index "+ weathercast.daily[i].uvi)
        Fordcastday0.children().remove()
        Fordcastday0.append('<h1 class="text-start" id="Fday">'+cord.name+" "+convertUniUTCtoLocal(weathercast.daily[i].dt)+'<img src="http://openweathermap.org/img/w/'+weathercast.daily[i].weather[0].icon+'.png" alt="img.jpg"></h1><h3 class="text-start" id="Fday">Temp: '+weathercast.daily[i].temp.day+' F</h3><h3 class="text-start" id="Fday">Wind: '+weathercast.daily[i].wind_speed+' MPH</h3><h3 class="text-start" id="Fday">Humidity: '+weathercast.daily[i].humidity+' %</h3><h3 class="text-start" id="Fday">UV Index: <span style="display:inline; border-radius: 15px; width: 30px; background-color: green; margin: 2px; padding: 2px 20px 2px 20px; color: white;">'+weathercast.daily[i].uvi+'</span> </h3>')


        }

        
        

    }
    
}

//loads data in HTML and also adds the data to the local storage this is when search button is triggered
function displayResults() {

    load()
   
    storeContent(SearchTB.value.concat('w'), SearchTB.value.concat('c'))
    //'+SearchTB.value.toUpperCase()+'
    var cachedBtn = $('#cachedBtn').append('<button class="btn btn-light p-1 my-1 w-100 gap-3 bg-secondary max-height:10px from-control-lg" id="newbutton"  >'+cord.name+'</button>')



    for(i=0; i < hiddenEls.length; i++){
        hiddenEls[i].classList.remove('d-none')
    }



}

//helper function to store data to the local storage
function storeContent(forcastname, corname){
    // console.log(JSON.stringify(weathercast))
   localStorage.setItem(forcastname.toUpperCase(), JSON.stringify(weathercast))
   localStorage.setItem(corname.toUpperCase(), JSON.stringify(cord))
  
}


//helper function to read data from local storage
function retrieveContent(name){

    return JSON.parse(localStorage.getItem(name.toUpperCase()))


}


//event listener for searching
var SerchBtnEl = document.getElementById('searchBtn')
var SearchTB = document.getElementById('lblcity')
console.log(SearchTB.value)

function search(event) {

    eventBtn =event
    console.log(event)
    if(SearchTB.value !== ""){

        getWeather(SearchTB.value)
               
    }
    SearchTB.value = ""
     
}

//event listener for search button
SerchBtnEl.addEventListener('click', search)
//event listener for search textbox


SearchTB.addEventListener('keyup', function(event){
    if(event.keyCode === 13){search()}
})

// end
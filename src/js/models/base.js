

// National Park Service API Elements

export const nps = {
  baseUrl: 'https://developer.nps.gov/api/v1/',
  apiKey: 'LMCWhYBZ0nL2NEDRcXJGidsSEZRyzLxfu19EiQSE',
}

// National Park Camping Elements 

export const camps = {
  baseUrl: 'https://developer.nps.gov/api/v1/campgrounds?parkcode='
}

// Hiking Project API Elements

export const hikes = {
  baseUrl: 'https://www.hikingproject.com/data/get-trails?lat=',
  apiKey:'200425757-c325319a97193bd94e8a27064e2a1479'
}

// Mountain Project API Elements

export const mountain = {
  baseUrl: 'https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=',
  apiKey: '200425757-163d23741dd8f4d89d80ae4fe5d6f4a7'
}


// Open Weather API Elements 

export const weather = {
  baseUrl: 'http://api.openweathermap.org/data/2.5/weather?lat=',
  apiKey: '917d6a82c4105f35a2603057a2c9b4d1',
  unit: '&units=imperial'
}

// Google Map Link 
export const map = {
  baseUrl: 'https://www.google.com/maps/search/?api=1&query='
}

export const google = {
  // 'https://www.google.com/maps/embed/v1/MODE?key=YOUR_API_KEY&parameters'
  baseUrl: 'https://www.google.com/maps/embed/v1/view?key=',
  apiKey: 'AIzaSyCHhNj2rQKpG23qUDRVZCI0AuO_NJEwGPc', 
  zoom: 10
}

// shuffle array in place for random selection 
export const shuffle = (array) => {
  let i = 0;
  let j = 0;
  let temp = null;

  for (let i = array.length-1; i>0; i-- ){
    let j = Math.floor(Math.random()*(i+1))

    temp = array[i];
    array[i] = array[j];
    array[j] = temp
  }
  return array
}

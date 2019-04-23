

// National Park Service API Elements

export const nps = {
  baseUrl: 'https://developer.nps.gov/api/v1/',
  apiKey: 'LMCWhYBZ0nL2NEDRcXJGidsSEZRyzLxfu19EiQSE',
}

// Mountain Project API Elements

export const mountain = {
  baseUrl: 'https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=',
  apiKey: '200425757-163d23741dd8f4d89d80ae4fe5d6f4a7'
}

// https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=40.03&lon=-105.25&key=200425757-163d23741dd8f4d89d80ae4fe5d6f4a7
// https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=34.41461863&lon=-85.61734327&key=200425757-163d23741dd8f4d89d80ae4fe5d6f4a7


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

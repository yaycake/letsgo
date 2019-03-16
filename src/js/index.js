import Park from './models/Park';
import * as parkView from './views/parkView';
import axios from 'axios';
import parkCodes from '../data/parks.json'

// National Parks Service API Key:
// LMCWhYBZ0nL2NEDRcXJGidsSEZRyzLxfu19EiQSE

// Global state of the app
const state = {};




  window.addEventListener('load', ()=> {
    controlPark();
  })

// * * * * * * * * * *
// Parks Controller
// * * * * * * * * * *

const controlPark = async () => {

  console.log("hey! I'm in the Park controller")

   // 1. Select a random parkcode

  const randomParkQuery = () => {
    const randomPark = Math.floor(Math.random() * Math.floor(parkCodes.length))
    console.log(parkCodes[randomPark].parkCode)
    return parkCodes[randomPark].parkCode
  }

  // 2. Take park code and call park API
  state.park = new Park(randomParkQuery)

  try {
    await state.park.getPark();
    console.log(state.park)
  }catch (error) {
    console.log(error)
    alert('Error Getting A Park!')
  }

}










// async function getResult(query) {
//   const baseUrl = 'http://api.nps.gov/api/v1/'
//   const apiKey = 'LMCWhYBZ0nL2NEDRcXJGidsSEZRyzLxfu19EiQSE'
//   const res = await axios(`${baseUrl}parks?parkCode=${query}&api_key=${apiKey}`);

//   console.log(res)
// }

// console.log(getResult('ANTI'));


// park.selectRandom();


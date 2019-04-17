import Park from './models/Park';
import * as parkView from './views/parkView';
import axios from 'axios';
import parkCodes from '../data/parks.json'

// Global state of the app
const state = {};

// On Window Load, begin Park
window.addEventListener('load', ()=> {
  controlPark();
})

// * * * * * * * * * *
// Parks Controller
// * * * * * * * * * *

const controlPark = async () => {

  parkView.clearPark();
   // 1. Select a random parkcode
  const randomParkQuery = () => {
    const randomPark = Math.floor(Math.random() * Math.floor(parkCodes.length))

    //DEV View random value
    console.log(randomPark)

    return parkCodes[randomPark].parkCode
  }
  // 2. Take park code and call park API
  state.park = new Park(randomParkQuery())
  try {
    await state.park.getPark();


    console.log('heres a park:')
    console.log(state.park)
  }catch (error) {
    console.log(error)
    alert('Error Getting A Park!')
  }

  //DEV View
  console.log('calling for park alerts!')

  // Check for Park Alerts
  try {
      await state.park.getParkAlerts();
    } catch (error){
      console.log(error)
    }

    //Dev View Park alerts
    console.log("print park alerts")
    console.log(state.park.parkAlerts)

  // render park view on ui
  parkView.renderParkHeader(state.park);
  parkView.renderParkVisit(state.park);

  if (state.park.parkAlertsArr){
    console.log('should be rendering alerts')
    parkView.renderParkAlerts(state.park.parkAlertsArr)
  } else {
    parkView.renderNoParkAlerts()
  }
}



 // - - - - - Tab-able Activities Content

// console.log('before default click')
// document.getElementById('defaultActivity').click();
parkView.defaultTabOpen();

document.querySelector('.tab_menu').addEventListener('click', e => {
  console.log(e)

  if (e.target.matches('.hiking, .hiking *')){
    parkView.viewTabContent('hiking')
  } else if (e.target.matches('.climbing, .climbing *')){
    parkView.viewTabContent('climbing')
  } else if (e.target.matches('.camping, .camping *')){
    parkView.viewTabContent('camping')
  }

  // parkView.viewTabContent(openTab)
})




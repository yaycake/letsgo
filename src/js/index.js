import Park from './models/Park';
import Climb from './models/Climb';

import * as parkView from './views/parkView';
import axios from 'axios';

import parkCodes from '../data/parks.json';
import parkList from '../data/parksList.json';

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
    const randomPark = Math.floor(Math.random() * Math.floor(parkList.length))

    //DEV View random value
    console.log(randomPark)

    return parkList[randomPark]
  }

  // 2. Take park code and call park API
  let queryPark = randomParkQuery();

  state.park = new Park(queryPark.code, queryPark.image_url)

  try {
    await state.park.getPark();
    console.log('heres a park:')
    console.log(state.park)

  }catch (error) {
    console.log(error)
    alert('Error Getting A Park!')
  }

  // try to render climbs

  try {
    await state.park.getClimbs()
  }catch (error){
    console.log(error)
    console.log('problem with calling climbs in controlPark')
  }

  // try to render hikes
  try {
    await state.park.getHikes();
  }catch (error){
    console.log(error)
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

  // render park info
  parkView.renderParkImage(state.park);
  parkView.renderParkHeader(state.park);
  parkView.renderParkVisit(state.park);

  // render park mountain /climbs content
  parkView.renderMountainContent(state.park.climbsArray)

  parkView.renderHikesContent(state.park.hikesArray)

  // render any park alerts
  parkView.renderParkAlerts(state.park.parkAlertsArr)


  // render park weather 
  try {
    await state.park.getWeather();
  }catch(error) {
    console.log(error)
  }

  parkView.renderWeather(state.park.weather);
}

 // - - - - - Tab-able Activities Content

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
})




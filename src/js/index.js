import Park from './models/Park';
import Climb from './models/Climb';
import * as parkView from './views/parkView';
import axios from 'axios';
import parkCodes from '../data/parks.json';
import parkList from '../data/parksList.json';
import { fadeIn } from './models/base';
import { elements } from './views/parkView'

// Global state of the app
const state = {};

// On Window Load, begin Park
window.addEventListener('load', ()=> {
  controlPark();
  parkView.renderLoader();
})



// * * * * * * * * * *
// Parks Controller
// * * * * * * * * * *

const controlPark = async () => {

  parkView.clearPark();
   // Select a random parkcode
  const randomParkQuery = () => {
    const randomPark = Math.floor(Math.random() * Math.floor(parkList.length))
    return parkList[randomPark]
  }
  let queryPark = randomParkQuery();

  state.park = new Park(queryPark.code, queryPark.image_url)

  // GET A Park
  try {
    await state.park.getPark();
    console.log('heres a park:')
    console.log(state.park)
  }catch (error) {
    console.log(error)
    alert('Error Getting A Park!')
  }

  // GET Park Climbs
  try {
    await state.park.getClimbs()
  }catch (error){
    console.log(error)
    console.log('problem with calling climbs in controlPark')
  }

  // GET Park Camps
  try {
    await state.park.getCamps();
  }catch (error) {
    console.log(error)
    console.log("problem with calling camps in controlPark")
  }

  // GET park hikes
  try {
    await state.park.getHikes();
  }catch (error){
    console.log(error)
  }

  // GET Park Alerts
  try {
    await state.park.getParkAlerts();
  } catch (error){
    console.log(error)
  }

  // GET Park Weather
  try {
    await state.park.getWeather();
  }catch(error) {
    console.log(error)
  }

  // GET Park Map
  try {
    await state.park.getMapLink();
  } catch(error) {
    console.log(error)
  }
  
  

  //Render Park Map
  parkView.renderMapEmbed(state.park.mapLink)
  // fadeIn(elements.parkMapLink, 25);
  // Render Park Weather 
  parkView.renderWeather(state.park.weather);
  // fadeIn(elements.parkWeather, 25);
  // Render Park Alerts
  parkView.renderParkAlerts(state.park.parkAlertsArr)
  // Render Park Hikes
  parkView.renderHikesContent(state.park.hikesArray)
  fadeIn(elements.hikingContent, 25);
  parkView.activeTabButton('hiking')
  // Render Camping Content
  parkView.renderCampingContent(state.park.campsArray, state.park.parkCode)
  // Render Park Climbs
  parkView.renderMountainContent(state.park.climbsArray)


  // Render Park Image
  parkView.renderParkImage(state.park)
  fadeIn(elements.parkImage, 25);
  // Render Park Header
  parkView.renderParkHeader(state.park);
  fadeIn(elements.parkHeader, 25);
}

 // - - - - - Tab-able Activities Content

parkView.defaultTabOpen();


document.querySelector('.tab_menu').addEventListener('click', e => {
  console.log(e)
  if (e.target.matches('.hiking, .hiking *')){
    parkView.viewTabContent('hiking')
    parkView.activeTabButton('hiking')
  } else if (e.target.matches('.climbing, .climbing *')){
    parkView.viewTabContent('climbing')
    parkView.activeTabButton('climbing')
  } else if (e.target.matches('.camping, .camping *')){
    parkView.viewTabContent('camping')
    parkView.activeTabButton('camping')
  } else if (e.target.matches('.mapping, .mapping *')){
    parkView.viewTabContent('map')
    parkView.activeTabButton('mapping')
  }
})


// - - - - - - - - Lets Go Somewhere Else

document.getElementById('letsgo').addEventListener('click', e =>{
  console.log(e)
  window.location.reload(false)
})



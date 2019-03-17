import Park from './models/Park';
import ParkAlerts from './models/ParkAlerts';
import * as parkView from './views/parkView';
import * as parkalertsView from './views/parkalertsView';
import axios from 'axios';
import parkCodes from '../data/parks.json'

// National Parks Service API Key:
// LMCWhYBZ0nL2NEDRcXJGidsSEZRyzLxfu19EiQSE

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
  // Check for Park Alerts
  console.log('calling for park alerts!')

  try {
      await state.park.getParkAlerts();


    if (state.park.parkAlertsArr){
      console.log('should be rendering alerts')
      parkView.renderParkAlerts(state.park.parkAlertsArr)
    } else {
      parkView.renderNoParkAlerts()
    }


    } catch (error){
      console.log(error)
    }

    console.log("print park alerts")
    console.log(state.park.parkAlerts)





  // render park view on ui
  parkView.renderParkHeader(state.park);
  parkView.renderParkVisit(state.park)

}

// const controlParkAlerts = async () =>{

//     state.parkalerts = new ParkAlerts(state.park.parkcode);

//     try {
//       await state.park.getParkAlerts();

//       if (state.park.parkAlertsArr){
//       console.log('should be rendering alerts')
//       parkalertsView.renderParkAlerts(state.park.parkAlertsArr)
//     } else {
//       parkalertsView.renderNoParkAlerts();
//     }



//     } catch (error){
//       console.log(error)
//     }

//     console.log("print park alerts")
//     console.log(state.parkAlertsArr)




// }






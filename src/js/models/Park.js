import parkCodes from '../../data/parks.json';
import axios from 'axios';
import { nps } from './base';

export default class Park {
  constructor (parkCode){
    this.parkCode = parkCode;
    this.parkAlertsArr = [];
    this.latLong = {};
  }

  async getPark() {
    try {
      //DEV View Query Sent
      console.log("Query Sent:")
      console.log(this.parkCode)

      // Load API response into a variable
      const res = await axios(`${nps.baseUrl}parks?parkCode=${this.parkCode}&api_key=${nps.apiKey}`);

      // DEV View Results of API Call
      console.log('Here are results:')
      console.log(res)


      if (res.data.total == 1){
         // Create the selected park object
        this.name = res.data.data[0].fullname;
        this.summary = res.data.data[0].description;
        this.parkcode = res.data.data[0].parkCode;
        this.states = res.data.data[0].states;
        this.weather = res.data.data[0].weatherInfo;

        console.log(res.data.data[0].latLong)
        console.log("Building lat long:")

        // Build park.latLong
        const latLongArr = res.data.data[0].latlong.split(" ");
        this.latLong = {
          latitude: latLongArr[0].split(":")[1],
          longitude: latLongArr[1].split(":")[1]
        }
      } else if (res.data.total == 0) {
        // ReLoad API response into a variable
        const res = await axios(`${nps.baseUrl}parks?parkCode=${this.parkCode}&api_key=${nps.apiKey}`);
      }


    } catch (error) {
      console.log(error);
      alert('Something went wrong in getting park!')
    }
  }

  async getParkAlerts() {

    // Function Constructor for a singular alert
    const ParkAlert = function(title, description, url){
      this.title = title,
      this.description = description,
      this.url = url
    }

    try {
      const res = await axios(`${nps.baseUrl}/alerts?parkCode=${this.parkCode}&api_key=${nps.apiKey}`)


      // If there are park alerts:
      if (res.data.total > 0){

        let alertsArray = [];

        // 1. Iterate through each park alert
        res.data.data.forEach(function(parkAlert){

          const nextAlert = new ParkAlert(parkAlert.title, parkAlert.description, parkAlert.url)

          //DEV View Each Alert
          console.log(nextAlert)
          console.log('pushing to parkAlerts...')

          // 2. Push alert into parkAlerts array
          alertsArray.push(nextAlert)

          //DEV View Park Alerts
          console.log("this is alertArray:")
          console.log(alertsArray)

        })
        this.parkAlertsArr = alertsArray;

        //DEV View this.parkalertarr
        console.log("This is this.parkAlertsArr:")
        console.log(this.parkAlertsArr)

        // Otherwise, if there are no alerts
      } else {
        console.log("There are no alerts for this park!")
        // return an empty array
        return this.parkAlertsArr;
      }

    } catch (error){
      console.log(error)
      alert('Something wrong with getting Park Alerts!')
    }
  }
}





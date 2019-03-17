import parkCodes from '../../data/parks.json';
import axios from 'axios';
import { nps } from './base';

export default class Park {
  constructor (parkCode){
    this.parkCode = parkCode;
  }

  async getPark() {
    try {
      //DEV View Query Sent
      console.log("Query Sent:")
      console.log(this.parkCode)

      // const npsBaseUrl = 'http://api.nps.gov/api/v1/'
      // const apiKey = 'LMCWhYBZ0nL2NEDRcXJGidsSEZRyzLxfu19EiQSE'
      const res = await axios(`${nps.baseUrl}parks?parkCode=${this.parkCode}&api_key=${nps.apiKey}`);

      // DEV View Results of API Call
      console.log('Here are results:')
      console.log(res)

      // Create the selected park object
      this.name = res.data.data[0].fullName;
      this.summary = res.data.data[0].description;
      this.parkcode = res.data.data[0].parkCode;
      this.states = res.data.data[0].states;
      this.weather = res.data.data[0].weatherInfo;
      this.latlong = res.data.data[0].latLong;
    } catch (error) {
      console.log(error);
      alert('Something went wrong in getting park!')
    }
  }

  async getParkAlerts() {
    // hoist park alerts array
    this.parkAlertsArr = [];
    try {
      const res = await axios(`${nps.baseUrl}/alerts?parkCode=${this.parkCode}&api_key=${nps.apiKey}`)
      const alertsArr = res.data.data

      // If there are park alerts
      if (alertsArr){
        // Function Constructor for a singular alert
        const ParkAlert = function(title, description, url){
          this.title = title,
          this.description = description,
          this.url = url
        }

        // Iterate through each park alert
        alertsArr.forEach(function(parkAlert){
          const nextAlert = new ParkAlert(parkAlert.title, parkAlert.description, parkAlert.url)

          //DEV View Alert
          console.log(nextAlert)
          console.log('pushing to parkAlerts...')

          // Push alert into parkAlerts array
          this.parkAlertsArr.push(nextAlert)

          //DEV View Park Alerts
          console.log(this.parkAlertsArr)

          return this.parkAlertsArr;
        })
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





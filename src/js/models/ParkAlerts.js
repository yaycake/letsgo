import axios from 'axios';
import { nps } from './base';

export default class ParkAlerts {
  constructor(parkCode){
    this.parkCode = parkCode;
  }

  async getParkAlerts() {
    try {
      const res = await axios(`${nps.baseUrl}/alerts?parkCode=${this.parkCode}&api_key=${nps.apiKey}`)

      const alertsArr = res.data.data
      // hoist park alerts array
      let parkAlertsArr = [];

      if (alertsArr.length > 0){


        // Function Constructor for a singular alert
        const ParkAlert = function(title, description, url){
          this.title = title,
          this.description = description,
          this.url = url
        }

        alertsArr.forEach(function(alert){
          const nextAlert = new ParkAlert(alert.title, alert.description, alert.url)

          //DEV View Alert
          console.log(nextAlert)
          console.log('pushing to parkAlerts...')

          // Push alert into parkAlerts array
          parkAlertsArr.push(nextAlert)

          //DEV View Park Alerts
          console.log(parkAlertsArr)

          return parkAlertsArr;
        })

      } else {
        console.log("There are no alerts for this park!")
        return parkAlertsArr;
      }

    } catch (error){
      console.log(error)
      alert('Something wrong with getting Park Alerts!')
    }
  }
}

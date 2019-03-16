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
      alert('Something went wrong in getting your park!')
    }
  }
}

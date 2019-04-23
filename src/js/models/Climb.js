import axios from 'axios';
import { mountain } from './base';

export default class Climb {
  constructor (latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.climbsArray = [];
  }

  async getClimbs() {
    try {
      console.log("getting climbs")

      const res = await axios (`${mountain.baseUrl}${latitude}&Lon=${longitude}&key=${mountain.apiKey}`)

      console.log('Here are the climbs')
      console.log(res)



      // out of the total # of results, select 3 random (indexes)
      let randomClimbIndex = [];

      // Math.floor(Math.random() * Math.floor(res.data.))
      // create climb objects out of each

      // add the three objects into climbsArray

    } catch (error) {
      console.log(error);
      alert('Something Went Wrong In Getting Climbs')
    }
  }
}

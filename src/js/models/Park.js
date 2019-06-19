import parkCodes from '../../data/parks.json';
import axios from 'axios';
import { nps } from './base';
import { mountain } from './base';
import { shuffle } from './base';
import { hikes } from './base';
import { weather } from './base';
import { map } from './base';
import { camps } from './base';
import { google } from './base';

export default class Park {
  constructor (parkCode, imageUrl){
    this.parkCode = parkCode;
    this.parkAlertsArr = [];
    this.latLong = {};
    this.imageUrl = imageUrl
    this.climbsArray = [];
    this.hikesArray = [];
    this.weather = {};
    this.mapLink = ``;
    this.campsArray = [];
  }


  // splitParkTitle(parkTitle){
  //   const regex = new RegExp('/(national)/', 'i');
  //   const split = parkTitle.split('National')
  //   const title = {
  //     parkName: split[0],
  //     parkSubname: `National ${split[1]}`
  //   }
  //   return title
  // }

  async getPark() {
    try {
      //DEV View Query Sent
      // console.log("Query Sent:")
      // console.log(this.parkCode)

      // Load API response into a variable
      const res = await axios(`${nps.baseUrl}parks?parkCode=${this.parkCode}&api_key=${nps.apiKey}`);

      // DEV View Results of API Call
      // console.log('Here are results:')
      // console.log(res)


      if (res.data.total == 1){
         // Create the selected park object
        this.name = res.data.data[0].fullName.split('National')[0];
        
         if (res.data.data[0].fullName.split('National')[1]){
          this.parkType = res.data.data[0].fullName.split('National')[1]
        } else {
          this.parkType = "";
        };
        this.summary = res.data.data[0].description;
        // this.parkcode = res.data.data[0].parkCode;
        this.states = res.data.data[0].states;
        // this.weather = res.data.data[0].weatherInfo;

        // console.log(res.data.data[0].latLong)
        // console.log("Building lat long:")

        // Build park.latLong
        const latLongArr = res.data.data[0].latLong.split(" ");
        this.latLong = {
          latitude: latLongArr[0].split(":")[1].replace(/,\s*$/, ""),
          longitude: latLongArr[1].split(":")[1]
        }

      } else if (res.data.total == 0) {
        // ReLoad API response into a variable
        const res = await axios(`${nps.baseUrl}parks?parkCode=${this.parkCode}&api_key=${nps.apiKey}`);
      }
    } catch (error) {
      // console.log(error);
      // alert('Something went wrong in getting park!')
    }
  }

  async getCamps() {
    try {
      const res = await axios(`${camps.baseUrl}${this.parkCode}&api_key=${nps.apiKey}`)

      console.log(res)
      let campsites = res.data.data

      // console.log(`HERE R camps: ${campsites}`)
      // console.log(campsites.first)
      if (campsites.length > 0) {
        this.campsArray = shuffle(campsites).slice(0,5);
      } else {
        console.log("No Camps Near Here")
      }

    } catch (error) {
      // console.log(error)
      // console.log('trouble in getting camps!')
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
          // console.log(nextAlert)
          // console.log('pushing to parkAlerts...')

          // 2. Push alert into parkAlerts array
          alertsArray.push(nextAlert)

          //DEV View Park Alerts
          // console.log("this is alertArray:")
          // console.log(alertsArray)

        })
        this.parkAlertsArr = alertsArray;

        //DEV View this.parkalertarr
        console.log("This is this.parkAlertsArr:")
        // console.log(this.parkAlertsArr)

        // Otherwise, if there are no alerts
      } else {
        // console.log("There are no alerts for this park!")
        // return an empty array
        return this.parkAlertsArr;
      }

    } catch (error){
      console.log(error)
      // alert('Something wrong with getting Park Alerts!')
    }
  }

  async getHikes() {
    try {
      // console.log("Getting hikes")

      const res = await axios (`${hikes.baseUrl}${this.latLong.latitude}&lon=${this.latLong.longitude}&key=${hikes.apiKey}`)

      let trails = res.data.trails;

      if (trails.length > 0) {
        this.hikesArray = shuffle(trails).slice(0,5);
      } else {
        // console.log("No Hikes Near Here")
      }

      console.log(res)
    } catch (error){
      console.log(error)
    }
  }


  async getClimbs() {
    try {
      // console.log("getting climbs")
      // console.log(`Heres the latitude:${this.latLong.latitude}`)

      const res = await axios (`${mountain.baseUrl}${this.latLong.latitude}&lon=${this.latLong.longitude}&key=${mountain.apiKey}`)

      // console.log('Here are the climbs')
      // console.log(res)

      let routes = res.data.routes;
      if (routes.length > 0){
        this.climbsArray = shuffle(routes).slice(0,5);
        console.log(`HERE ARE RANDO CLIMBS: ${this.climbsArray}`)
      } else {
        // console.log('No Climbs Near Here!')
      }
    } catch (error) {
      console.log(error);
      // alert('Something Went Wrong In Getting Climbs')
    }
  }

  getMapLink(){
    console.log( `in getMapLink`)
    console.log(this.name)
    const locationName = this.name.replace(/\s+/g, '+').toLowerCase()

    // if location is more than one word

    // if (this.name.split("").length > 0){
    //   const locationName = this.name.replace(/\s+/g, '+').toLowerCase();

    //   console.log(`This is the location name: ${locationName}`)
    // } else {
    //   const locationName = this.name.toLowerCase();
    //   console.log(`This is the location name: ${locationName}`)
    // }
    

    this.mapLink = `${google.baseUrl}${google.apiKey}&center=${this.latLong.latitude},${this.latLong.longitude}&zoom=${google.zoom}&maptype=satellite`
    console.log(`this is the maplink: ${this.mapLink}`)
  }

  async getWeather() {
    try {
      console.log("getting weather")

      const res = await axios (`${weather.baseUrl}${this.latLong.latitude}&lon=${this.latLong.longitude}&appid=${weather.apiKey}${weather.unit}`)
      
      console.log(res)

      this.weather = {
        currentTemp: res.data["main"]["temp"],
        minTemp: res.data["main"]["temp_min"],
        maxTemp: res.data["main"]["temp_max"],
        description: res.data["weather"][0]["description"], 
        icon: `${res.data["weather"][0]["icon"]}.png`
      }

      console.log (this.weather)
    }catch (error){

    }
  }

}




